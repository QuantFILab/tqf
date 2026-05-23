import json
import re
import urllib.request
from html import unescape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS_DIR = ROOT / "assets"
OUTPUT_PATH = ASSETS_DIR / "site-data.js"

PAGES = {
    "home": "https://www.tqf.or.th/",
    "about": "https://www.tqf.or.th/about",
    "team": "https://www.tqf.or.th/team",
    "bylaws": "https://www.tqf.or.th/bylaws",
    "quantPathway": "https://www.tqf.or.th/quant-pathway",
}

BLOCK_RE = re.compile(r'<div class="sqs-html-content"[^>]*>(.*?)</div>', re.S)
TAG_RE = re.compile(r"<[^>]+>")
TITLE_RE = re.compile(r"<title>(.*?)</title>", re.S | re.I)
LOGO_RE = re.compile(r'"logoImageUrl":"([^"]+)"')
H2_RE = re.compile(r"<h2[^>]*>(.*?)</h2>", re.S | re.I)
ACCORDION_RE = re.compile(
    r'<span\s+class="accordion-item__title"[^>]*>(.*?)</span>.*?'
    r'<div\s+class="\s*accordion-item__description.*?"[^>]*>(.*?)</div>\s*</div>',
    re.S | re.I,
)


def fetch_html(url: str) -> str:
    with urllib.request.urlopen(url, timeout=30) as response:
        return response.read().decode("utf-8", errors="ignore")


def clean_html(fragment: str) -> str:
    fragment = re.sub(r"<br\s*/?>", "\n", fragment, flags=re.I)
    fragment = re.sub(
        r"</(p|h1|h2|h3|h4|h5|h6|li|ul|ol|div|section)>",
        "\n",
        fragment,
        flags=re.I,
    )
    fragment = TAG_RE.sub("", fragment)
    fragment = unescape(fragment).replace("\xa0", " ")
    lines = [" ".join(line.split()) for line in fragment.splitlines()]
    lines = [line for line in lines if line]
    return "\n".join(lines)


def split_block(block: str) -> tuple[str, list[str]]:
    lines = [line for line in block.splitlines() if line]
    if not lines:
        return "", []
    return lines[0], lines[1:]


def blocks_from_html(html: str) -> list[str]:
    return [block for block in (clean_html(item) for item in BLOCK_RE.findall(html)) if block]


def extract_home(blocks: list[str], html: str) -> dict:
    logo_match = LOGO_RE.search(html)
    logo_url = logo_match.group(1) if logo_match else ""
    if logo_url.startswith("//"):
        logo_url = f"https:{logo_url}"

    address_lines = blocks[3].splitlines()[1:]
    contact_lines = blocks[4].splitlines()[1:]

    return {
        "tagline": blocks[0],
        "titleTh": blocks[1],
        "titleEn": blocks[2],
        "addressLabel": blocks[3].splitlines()[0],
        "address": " ".join(address_lines),
        "contactLabel": blocks[4].splitlines()[0],
        "contactEmail": contact_lines[0] if contact_lines else "",
        "logoUrl": logo_url,
    }


def extract_about(blocks: list[str]) -> dict:
    return {
        "vision": blocks[1],
        "mission": blocks[3].splitlines(),
        "strategy": blocks[5].splitlines(),
    }


def extract_team(html: str) -> list[dict]:
    matches = list(H2_RE.finditer(html))
    members: list[dict] = []
    for index, match in enumerate(matches[:11]):
        name = clean_html(match.group(1))
        next_start = matches[index + 1].start() if index + 1 < len(matches) else len(html)
        segment = html[match.end() : next_start]
        text = clean_html(segment)
        lines = text.splitlines()
        role = lines[0] if lines else ""
        qualifications = ""
        for line in lines[1:]:
            if line.startswith("คุณวุฒิ:"):
                qualifications = line.replace("คุณวุฒิ:", "").strip()
                break
        initials = "".join(part[0] for part in re.split(r"[\s,]+", name) if part)
        members.append(
            {
                "name": name,
                "role": role,
                "qualifications": qualifications,
                "initials": initials[:3].upper(),
            }
        )
    return members


def extract_quant(blocks: list[str], html: str) -> dict:
    overview_sections = []
    for block in blocks[1:4]:
        title, body = split_block(block)
        overview_sections.append(
            {
                "title": title,
                "description": " ".join(body),
            }
        )

    modules = []
    for title_html, description_html in ACCORDION_RE.findall(html):
        title = clean_html(title_html)
        description = clean_html(description_html)
        modules.append(
            {
                "title": title,
                "items": description.splitlines(),
            }
        )

    return {
        "introTitle": split_block(blocks[0])[0],
        "introBody": " ".join(split_block(blocks[0])[1]),
        "overview": overview_sections,
        "foundational": modules[:3],
        "core": modules[3:8],
        "specialized": modules[8:],
    }


def extract_bylaws(blocks: list[str]) -> dict:
    heading_lines = blocks[0].splitlines()
    full_text = "\n".join([blocks[1], blocks[2]])
    parts = re.split(r"\n(?=หมวดที่ \d+ )", full_text)
    sections = []
    for part in parts:
        lines = [line for line in part.splitlines() if line]
        if not lines:
            continue
        sections.append(
            {
                "title": lines[0],
                "content": lines[1:],
            }
        )

    return {
        "title": heading_lines[0],
        "subtitle": heading_lines[1] if len(heading_lines) > 1 else "",
        "sections": sections,
    }


def main() -> None:
    html_pages = {key: fetch_html(url) for key, url in PAGES.items()}
    block_pages = {key: blocks_from_html(html) for key, html in html_pages.items()}

    site = extract_home(block_pages["home"], html_pages["home"])
    title_match = TITLE_RE.search(html_pages["home"])
    page_title = clean_html(title_match.group(1)) if title_match else "TQF"

    data = {
        "site": {
            "name": page_title,
            "sourceUrl": PAGES["home"],
            "titleTh": site["titleTh"],
            "titleEn": site["titleEn"],
            "tagline": site["tagline"],
            "address": site["address"],
            "email": site["contactEmail"],
            "logoUrl": site["logoUrl"],
        },
        "navigation": [
            {"slug": "home", "labelTh": "หน้าแรก", "labelEn": "Home", "href": "index.html", "source": PAGES["home"]},
            {"slug": "about", "labelTh": "เกี่ยวกับสมาคม", "labelEn": "About", "href": "about.html", "source": PAGES["about"]},
            {"slug": "team", "labelTh": "คณะกรรมการ", "labelEn": "Team", "href": "team.html", "source": PAGES["team"]},
            {"slug": "bylaws", "labelTh": "ข้อบังคับสมาคม", "labelEn": "Bylaws", "href": "bylaws.html", "source": PAGES["bylaws"]},
            {
                "slug": "quant-pathway",
                "labelTh": "Quant Pathway",
                "labelEn": "Quant Pathway",
                "href": "quant-pathway.html",
                "source": PAGES["quantPathway"],
            },
        ],
        "pages": {
            "home": {
                "hero": {
                    "eyebrow": "Thailand Association of Quantitative Analysts and Financial Engineers",
                    "headline": site["titleTh"],
                    "subheadline": site["titleEn"],
                    "body": site["tagline"],
                }
            },
            "about": extract_about(block_pages["about"]),
            "team": {
                "members": extract_team(html_pages["team"]),
            },
            "bylaws": extract_bylaws(block_pages["bylaws"]),
            "quantPathway": extract_quant(block_pages["quantPathway"], html_pages["quantPathway"]),
        },
    }

    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(
        "window.TQF_CONTENT = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    print(f"Wrote {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
