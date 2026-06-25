(function () {
  const source = window.TQF_CONTENT;

  if (!source) {
    return;
  }

  const slug = document.body.dataset.page || "home";
  const pageKeyMap = {
    "quant-pathway": "quantPathway",
    "academic-committee-board": "academicCommitteeBoard",
    "academic-conference": "academicConference",
    "quant-jobs": "quantJobs",
    "book-series": "bookSeries",
    "articles": "articles",
  };
  const pageKey = pageKeyMap[slug] || slug;
  const state = {
    lang: localStorage.getItem("tqf-language") === "en" ? "en" : "th",
  };
  let closeDropdownListener = null;

  const root = document.getElementById("page-root");
  const headerRoot = document.getElementById("site-header");
  const footerRoot = document.getElementById("site-footer");
  const navItems = [
    ...source.navigation,
    {
      slug: "activities",
      labelTh: "กิจกรรม",
      labelEn: "Activities",
      href: "activities.html",
    },
    {
      slug: "collaborators",
      labelTh: "เครือข่ายความร่วมมือ",
      labelEn: "Collaborators",
      href: "collaborators.html",
    },
    {
      slug: "academic",
      labelTh: "วิชาการ",
      labelEn: "Academic",
      href: "academic.html",
    },
    {
      slug: "quant-jobs",
      labelTh: "งานด้าน Quant",
      labelEn: "Quant Jobs",
      href: "quant-jobs.html",
    },
    {
      slug: "training",
      labelTh: "การอบรม",
      labelEn: "Training",
      href: "training.html",
    },
  ];
  const quantModules = [
    ...source.pages.quantPathway.foundational,
    ...source.pages.quantPathway.core,
    ...source.pages.quantPathway.specialized,
  ];
  const totalTopics = quantModules.reduce((sum, module) => sum + module.items.length, 0);
  const bookSeriesCatalog = {
    th: [
      {
        kicker: "เล่มที่ 1",
        title: "TQF Quant Pathway Handbook",
        description:
          "คู่มือฉบับเต็มที่สรุปโครงสร้างองค์ความรู้จากหน้า Quant Pathway ของ TQF ครอบคลุมพื้นฐาน แก่นหลัก และหัวข้อเฉพาะทางสำหรับผู้สนใจสายควอนท์",
        coverSrc: "assets/book-quant-pathway-handbook-cover.svg",
        downloadHref: "assets/tqf-quant-pathway-handbook.pdf",
        onlineHref: "quant-pathway.html",
        sourceHref: "https://www.tqf.or.th/quant-pathway",
        format: "PDF",
      },
      {
        kicker: "เล่มที่ 2",
        title: "TQF Quant Pathway Study Checklist",
        description:
          "ฉบับสรุปสำหรับทบทวนหัวข้อการเรียนรู้แบบกระชับ ใช้เป็นรายการตรวจสอบการอ่านและการวางแผนพัฒนาทักษะจากกรอบ Quant Pathway",
        coverSrc: "assets/book-quant-pathway-checklist-cover.svg",
        downloadHref: "assets/tqf-quant-pathway-checklist.pdf",
        onlineHref: "quant-pathway.html",
        sourceHref: "https://www.tqf.or.th/quant-pathway",
        format: "PDF",
      },
    ],
    en: [
      {
        kicker: "Volume 1",
        title: "TQF Quant Pathway Handbook",
        description:
          "A full handbook version of the TQF Quant Pathway, covering foundational, core, and specialized knowledge areas for aspiring quant professionals.",
        coverSrc: "assets/book-quant-pathway-handbook-cover.svg",
        downloadHref: "assets/tqf-quant-pathway-handbook.pdf",
        onlineHref: "quant-pathway.html",
        sourceHref: "https://www.tqf.or.th/quant-pathway",
        format: "PDF",
      },
      {
        kicker: "Volume 2",
        title: "TQF Quant Pathway Study Checklist",
        description:
          "A concise study checklist edition for reviewing topic coverage and planning skill development from the TQF Quant Pathway framework.",
        coverSrc: "assets/book-quant-pathway-checklist-cover.svg",
        downloadHref: "assets/tqf-quant-pathway-checklist.pdf",
        onlineHref: "quant-pathway.html",
        sourceHref: "https://www.tqf.or.th/quant-pathway",
        format: "PDF",
      },
    ],
  };
  const articleCatalog = {
    th: [
      {
        id: "cqf-quant-history",
        kicker: "พันธมิตร 01",
        title: "Quantitative Finance: ความหมายและพัฒนาการ",
        summary:
          "เรียบเรียงจากบทความต้นฉบับของ CQF ที่อธิบายทั้งนิยามของ quantitative finance พัฒนาการทางประวัติศาสตร์ และบทบาทของเทคโนโลยีต่อสายงานควอนท์",
        imageSrc: "assets/partner-cqf.svg",
        sourceLabel: "CQF Blog",
        sourceHref: "https://www.cqf.com/blog/what-quantitative-finance-brief-history",
        paragraphs: [
          "บทความของ CQF อธิบายว่า quantitative finance เป็นสาขาหนึ่งของการลงทุนที่ใช้วิธีทางคณิตศาสตร์และสถิติเพื่อวิเคราะห์โอกาสการลงทุนในสินทรัพย์หลายประเภท ตั้งแต่หุ้น ตราสารหนี้ ไปจนถึงอนุพันธ์และการบริหารความเสี่ยง",
          "เนื้อหาส่วนประวัติศาสตร์วางรากย้อนกลับไปถึงแนวคิดอย่าง Brownian motion, random walk, งานของ Louis Bachelier และการพัฒนาต่อมาในศตวรรษที่ 20 เช่น Modern Portfolio Theory, Efficient Market Hypothesis และการเติบโตของแบบจำลองอนุพันธ์",
          "บทความยังชี้ให้เห็นว่าความเป็นควอนท์ยุคใหม่ไม่ได้จำกัดอยู่ที่แบบจำลองเชิงทฤษฎี แต่ผสานกับ electronic trading, machine learning และ alternative data ทำให้การศึกษาต่อเนื่องและทักษะเชิงเทคนิคยังเป็นแกนสำคัญของวิชาชีพนี้",
        ],
        bullets: [
          "นิยามของ quantitative finance และขอบเขตงานควอนท์",
          "ลำดับพัฒนาการตั้งแต่ Bachelier ถึงยุค machine learning",
          "บทบาทของเทคโนโลยีและการพัฒนาทักษะต่อเนื่อง",
        ],
      },
      {
        id: "cfa-model-risk",
        kicker: "พันธมิตร 02",
        title: "Backtests, Causality และ Model Risk ในการลงทุนเชิงปริมาณ",
        summary:
          "สรุปจากบทความต้นฉบับของ CFA Institute ที่เสนอว่าการประเมินกลยุทธ์เชิงควอนท์ไม่ควรหยุดที่ผล backtest แต่ต้องถามต่อว่ากลไกของโมเดลทำงานอย่างไรและมีความเสี่ยงเชิงโครงสร้างตรงไหน",
        imageSrc: "assets/partner-cfa.svg",
        sourceLabel: "CFA Institute Enterprising Investor",
        sourceHref:
          "https://rpc.cfainstitute.org/blogs/enterprising-investor/2026/backtests-causality-and-model-risk-in-quantitative-investing",
        paragraphs: [
          "บทความของ CFA Institute ตั้งต้นจากคำถามสำคัญของนักลงทุนเชิงระบบว่า เราควรให้น้ำหนักกับผล backtest มากเพียงใด ผู้เขียนเสนอว่าการดูแค่ความสัมพันธ์ในอดีตยังไม่เพียงพอ หากไม่เข้าใจเหตุผลเชิงกลไกของโมเดล",
          "ใจความหลักคือการแยกความต่างระหว่าง association กับ explanation โดยยอมรับว่าสัญญาณเชิงความสัมพันธ์ยังมีคุณค่าในโลกจริง แต่ไม่ควรกลายเป็นจุดหยุดของกระบวนการวิจัย โดยเฉพาะเมื่อมีความรู้เชิงโครงสร้างที่สามารถนำมา model ได้ดีกว่า",
          "บทความใช้แนวคิดจากการระบาดวิทยาเป็นภาพเปรียบเทียบว่า หากระบบมีโครงสร้างที่เข้าใจได้ เช่น leverage, forced selling, default channel หรือ network transmission ความรู้เหล่านี้ควรถูกทำให้ explicit ในโมเดล ไม่ใช่ถูกลดทอนเหลือเพียงสถิติสหสัมพันธ์",
        ],
        bullets: [
          "backtest ไม่ใช่คำตอบสุดท้ายของ model validation",
          "ต้องแยก association ออกจาก causal mechanism",
          "model risk ลดลงได้เมื่อเข้าใจโครงสร้างตลาดมากขึ้น",
        ],
      },
      {
        id: "wqu-student-spotlight",
        kicker: "พันธมิตร 03",
        title: "เส้นทางนักศึกษา Financial Engineering สู่การทำงานระดับนานาชาติ",
        summary:
          "เรียบเรียงจากบทความ Student Spotlight ของ WorldQuant University ที่เล่าการพัฒนาทักษะด้าน finance, data science และ quantitative analysis ผ่านหลักสูตร MSc in Financial Engineering",
        imageSrc: "assets/partner-wqu.svg",
        sourceLabel: "WorldQuant University News",
        sourceHref: "https://www.wqu.edu/student-spotlight-delara",
        paragraphs: [
          "บทความจาก WorldQuant University เล่าเรื่องของ Josephine de Lara ซึ่งย้ายจากฟิลิปปินส์ไปทำงานที่จีนและเลือกเรียนต่อใน MSc in Financial Engineering เพื่อเสริมเส้นทางอาชีพในโลกการเงินและงานข้อมูล",
          "จุดเด่นของบทความไม่ใช่เพียงการแนะนำหลักสูตร แต่สะท้อนว่าโปรแกรมด้าน financial engineering แบบออนไลน์สามารถช่วยคนทำงานพัฒนาทักษะด้าน finance, data science และ quantitative analysis ไปพร้อมกับงานประจำได้",
          "สำหรับผู้อ่านของสมาคม บทความนี้มีคุณค่าในฐานะตัวอย่างเส้นทางการพัฒนาคนรุ่นใหม่ในสายควอนท์ โดยเชื่อมเรื่อง career mobility, global exposure และการเรียนรู้เชิงเทคนิคเข้าด้วยกันอย่างเป็นรูปธรรม",
        ],
        bullets: [
          "บทบาทของการศึกษา FE ต่อ career transition",
          "การผสาน finance, data science และ quantitative analysis",
          "ตัวอย่างการเติบโตในสายอาชีพควอนท์ระดับนานาชาติ",
        ],
      },
    ],
    en: [
      {
        id: "cqf-quant-history",
        kicker: "Partner Article 01",
        title: "Quantitative Finance: Definition and History",
        summary:
          "A CQF original article explaining what quantitative finance is, how the field developed historically, and why modern quant work now depends heavily on technology and continued learning.",
        imageSrc: "assets/partner-cqf.svg",
        sourceLabel: "CQF Blog",
        sourceHref: "https://www.cqf.com/blog/what-quantitative-finance-brief-history",
        paragraphs: [
          "CQF’s article defines quantitative finance as the use of mathematical and statistical methods to analyze investment opportunities across asset classes, including equities, fixed income, structured products, commodities, foreign exchange, and derivatives.",
          "The piece traces the field from early ideas such as Brownian motion and random walk theory through Bachelier’s option work, Modern Portfolio Theory, the Efficient Market Hypothesis, and the growth of derivatives modeling in the late twentieth century.",
          "It also argues that modern quant practice is inseparable from technology, highlighting the rise of electronic trading, machine learning, and alternative data. That framing makes the article useful as both an introduction and a professional orientation piece.",
        ],
        bullets: [
          "Defines the scope of quantitative finance",
          "Connects key historical milestones across the field",
          "Shows why modern quant work is deeply technology-driven",
        ],
      },
      {
        id: "cfa-model-risk",
        kicker: "Partner Article 02",
        title: "Backtests, Causality, and Model Risk in Quantitative Investing",
        summary:
          "A CFA Institute original article arguing that quantitative investing should move beyond simple backtest acceptance and ask whether the model’s mechanism is actually understood.",
        imageSrc: "assets/partner-cfa.svg",
        sourceLabel: "CFA Institute Enterprising Investor",
        sourceHref:
          "https://rpc.cfainstitute.org/blogs/enterprising-investor/2026/backtests-causality-and-model-risk-in-quantitative-investing",
        paragraphs: [
          "The CFA Institute article starts from a central question in systematic investing: how much confidence should investors place in historical backtests. It argues that past fit alone is not enough if the structure behind a model is poorly understood.",
          "Its core distinction is between association and explanation. Associational signals can still be useful under uncertainty, but they should not become the end point of research when stronger structural knowledge is available.",
          "The article uses epidemiology as an analogy for structured reasoning: when there are identifiable mechanisms, they should be modeled explicitly. In finance, that includes channels such as leverage, forced selling, refinancing pressure, passive flows, and network transmission.",
        ],
        bullets: [
          "Backtests are not enough on their own",
          "Causal reasoning matters in model design and validation",
          "Structural market mechanisms should be represented explicitly",
        ],
      },
      {
        id: "wqu-student-spotlight",
        kicker: "Partner Article 03",
        title: "A Financial Engineering Student’s International Career Path",
        summary:
          "A WorldQuant University original spotlight article showing how a student uses the MSc in Financial Engineering to build finance, data science, and quantitative analysis capability while working internationally.",
        imageSrc: "assets/partner-wqu.svg",
        sourceLabel: "WorldQuant University News",
        sourceHref: "https://www.wqu.edu/student-spotlight-delara",
        paragraphs: [
          "WorldQuant University’s student spotlight follows Josephine de Lara, who moved from the Philippines to China and chose the MSc in Financial Engineering as a way to support long-term career development in finance and data-driven work.",
          "The article emphasizes that flexible program design can help working professionals build finance, data science, and quantitative analysis skills without stepping away from employment. That makes the piece useful as a career-development example rather than only a student profile.",
          "For readers of the association website, the article shows a practical pathway into the quant field through structured education, international exposure, and technical upskilling. It is especially relevant for younger professionals considering applied postgraduate training.",
        ],
        bullets: [
          "Shows education as a bridge into quant careers",
          "Combines finance, data science, and quantitative analysis",
          "Highlights global mobility and professional development",
        ],
      },
    ],
  };
  const journalShowcase = {
    th: [
      {
        kicker: "ฉบับแนะนำ",
        title: "บทสรุปกรอบ Quant Pathway",
        description:
          "บทสรุปเชิงวารสารที่เรียบเรียงจากโครงสร้าง Quant Pathway เพื่อใช้เป็นมุมมองเชิงกรอบวิชาการสำหรับการพัฒนาทักษะสายควอนท์",
        coverSrc: "assets/journal-quant-pathway-cover.svg",
        primaryHref: "articles.html#quant-pathway-framework",
        primaryLabel: "อ่านบทความ",
        secondaryHref: "assets/tqf-quant-pathway-handbook.pdf",
        secondaryLabel: "เปิดคู่มือ PDF",
        sourceHref: "https://www.tqf.or.th/quant-pathway",
        sourceLabel: "TQF Quant Pathway",
      },
      {
        kicker: "ฉบับวิเคราะห์",
        title: "บทวิเคราะห์มาตรฐานวิชาชีพของ TQF",
        description:
          "บทวิเคราะห์ด้านมาตรฐานวิชาชีพและคุณค่าของสมาชิก เรียบเรียงจากข้อบังคับสมาคมและสิทธิประโยชน์ของสมาชิก",
        coverSrc: "assets/journal-standards-cover.svg",
        primaryHref: "articles.html#professional-standards",
        primaryLabel: "อ่านบทความ",
        secondaryHref: "bylaws.html",
        secondaryLabel: "ดูข้อบังคับ",
        sourceHref: "https://www.tqf.or.th/bylaws",
        sourceLabel: "TQF Bylaws",
      },
    ],
    en: [
      {
        kicker: "Featured Issue",
        title: "Journal Brief: Quant Pathway Framework",
        description:
          "A journal-style brief derived from the Quant Pathway structure, presented as an academic framework for quant skill development.",
        coverSrc: "assets/journal-quant-pathway-cover.svg",
        primaryHref: "articles.html#quant-pathway-framework",
        primaryLabel: "Read article",
        secondaryHref: "assets/tqf-quant-pathway-handbook.pdf",
        secondaryLabel: "Open PDF handbook",
        sourceHref: "https://www.tqf.or.th/quant-pathway",
        sourceLabel: "TQF Quant Pathway",
      },
      {
        kicker: "Analytical Note",
        title: "Journal Brief: Professional Standards in TQF",
        description:
          "An analytical note on professional standards and member value, based on the association bylaws and member benefits.",
        coverSrc: "assets/journal-standards-cover.svg",
        primaryHref: "articles.html#professional-standards",
        primaryLabel: "Read article",
        secondaryHref: "bylaws.html",
        secondaryLabel: "View bylaws",
        sourceHref: "https://www.tqf.or.th/bylaws",
        sourceLabel: "TQF Bylaws",
      },
    ],
  };
  const magazineShowcase = {
    th: [
      {
        kicker: "ฉบับกิจกรรม",
        title: "เรื่องเด่นกิจกรรมของสมาคม",
        description:
          "สรุปข่าวสารและกิจกรรมเด่นของสมาคมในรูปแบบแมกกาซีนที่อ่านง่าย เชื่อมโยงกับรายการกิจกรรมบนเว็บไซต์",
        coverSrc: "assets/magazine-activity-cover.svg",
        primaryHref: "activities.html",
        primaryLabel: "ดูกิจกรรม",
        secondaryHref: "index.html",
        secondaryLabel: "กลับหน้าหลัก",
        sourceHref: "https://www.facebook.com/quantcornerthailand",
        sourceLabel: "Quant Corner Thailand",
      },
      {
        kicker: "ฉบับความรู้",
        title: "เส้นทางอาชีพและการเรียนรู้สายควอนท์",
        description:
          "เนื้อหาสรุปสายอาชีพ ทักษะ และการเรียนรู้สำหรับผู้สนใจสายควอนท์ในรูปแบบที่เข้าถึงง่ายกว่าวารสาร",
        coverSrc: "assets/magazine-career-cover.svg",
        primaryHref: "quant-pathway.html",
        primaryLabel: "ดู Quant Pathway",
        secondaryHref: "quant-jobs.html",
        secondaryLabel: "ดูงานด้าน Quant",
        sourceHref: "https://www.tqf.or.th/quant-pathway",
        sourceLabel: "TQF Quant Pathway",
      },
    ],
    en: [
      {
        kicker: "Activity Issue",
        title: "Magazine Feature: Activity Highlights",
        description:
          "An accessible magazine-style highlight of association news and public activities, linked to the site’s activity archive.",
        coverSrc: "assets/magazine-activity-cover.svg",
        primaryHref: "activities.html",
        primaryLabel: "View activities",
        secondaryHref: "index.html",
        secondaryLabel: "Back to home",
        sourceHref: "https://www.facebook.com/quantcornerthailand",
        sourceLabel: "Quant Corner Thailand",
      },
      {
        kicker: "Knowledge Issue",
        title: "Magazine Feature: Quant Career and Learning",
        description:
          "A reader-friendly issue focused on career paths, skills, and learning directions for people entering the quant field.",
        coverSrc: "assets/magazine-career-cover.svg",
        primaryHref: "quant-pathway.html",
        primaryLabel: "View Quant Pathway",
        secondaryHref: "quant-jobs.html",
        secondaryLabel: "View Quant Jobs",
        sourceHref: "https://www.tqf.or.th/quant-pathway",
        sourceLabel: "TQF Quant Pathway",
      },
    ],
  };
  const heroImagePlaceholder = "assets/hero.jpg";

  const ui = {
    th: {
      labels: {
        home: "หน้าแรก",
        about: "เกี่ยวกับสมาคม",
        team: "คณะกรรมการ",
        bylaws: "ข้อบังคับสมาคม",
        activities: "กิจกรรม",
        collaborators: "เครือข่ายความร่วมมือ",
        academic: "วิชาการ",
        quant: "เส้นทาง Quant",
      },
      headerTag: "สมาคมวิชาชีพ",
      language: "ภาษา",
      source: "ข้อมูลสมาคม",
      openOfficial: "เปิดหน้าต้นฉบับ",
      siteMap: "โครงสร้างเว็บไซต์",
      siteMapTitle: "ข้อมูลสำคัญของสมาคม",
      siteMapCopy:
        "เข้าถึงข้อมูลสำคัญของสมาคมได้อย่างชัดเจน ทั้งข้อมูลทั่วไป คณะกรรมการ ข้อบังคับ กิจกรรม เครือข่ายความร่วมมือ วิชาการ และเส้นทางทักษะ",
      sectionIndex: "สารบัญ",
      openPage: "เปิดหน้า",
      leadership: "คณะผู้บริหาร",
      leadershipTitle: "นายกและอุปนายก",
      leadershipCopy:
        "ตำแหน่งและคุณวุฒิที่แสดงด้านล่างอ้างอิงตามหน้าคณะกรรมการของสมาคม",
      committee: "คณะกรรมการ",
      committeeTitle: "กรรมการและตำแหน่งสนับสนุน",
      committeeCopy:
        "หากหน้าต้นทางไม่ได้ระบุคุณวุฒิ ระบบจะแสดงเฉพาะตำแหน่งโดยไม่เพิ่มเติมข้อมูลใหม่",
      qualificationsMissing: "ไม่ได้ระบุคุณวุฒิ",
      levels: "3 ระดับ",
      modules: "13 หมวด",
      topics: "หัวข้อ",
      bylawNote:
        "สำหรับการอ้างอิงเชิงกฎหมายหรือการใช้งานทางการ โปรดตรวจสอบกับหน้าต้นฉบับของสมาคมโดยตรง",
      bylawOriginal: "ข้อความข้อบังคับภาษาไทย",
      footerTitle: "สมาคมนักวิเคราะห์เชิงปริมาณและวิศวกรการเงินไทย",
      footerCopy:
        "Thai Association of Quantitative Analysts and Financial Engineers (TQF)",
      footerOriginal: "",
      sourcePage: "ข้อมูล",
      missionPoint: "พันธกิจ",
      priority: "ยุทธศาสตร์",
      boardSnapshot: "ภาพรวมคณะกรรมการ",
      curriculumSnapshot: "ภาพรวมเส้นทางทักษะ",
      institutionalNote: "หมายเหตุเชิงสถาบัน",
      readingNote: "หมายเหตุการอ่าน",
      vision: "วิสัยทัศน์",
      mission: "พันธกิจ",
      strategy: "ยุทธศาสตร์",
      threeLevels: "สามระดับ",
      legalSummaries: "สรุปภาษาอังกฤษ",
      legalSummariesCopy:
        "เมื่อสลับเป็นภาษาอังกฤษ หน้านี้จะแสดงสรุปสาระสำคัญของแต่ละหมวด พร้อมข้อความข้อบังคับภาษาไทย",
    },
    en: {
      labels: {
        home: "Home",
        about: "About",
        team: "Team",
        bylaws: "Bylaws",
        activities: "Activities",
        collaborators: "Collaborators",
        academic: "Academic",
        quant: "Quant Pathway",
      },
      headerTag: "Professional Association",
      language: "Language",
      source: "Overview",
      openOfficial: "Open official page",
      siteMap: "Site Map",
      siteMapTitle: "Association Information",
      siteMapCopy:
        "Access the main association information, committee details, bylaws, activities, collaborators, academic resources, and quant pathway from a single official website.",
      sectionIndex: "Section Index",
      openPage: "Open page",
      leadership: "Leadership",
      leadershipTitle: "President and Vice Presidents",
      leadershipCopy:
        "Roles and listed qualifications below come directly from the official TQF team page.",
      committee: "Committee",
      committeeTitle: "Committee and Supporting Roles",
      committeeCopy:
        "Where qualifications are not listed, the role is shown without additional detail.",
      qualificationsMissing: "Qualifications not listed.",
      levels: "3 levels",
      modules: "13 modules",
      topics: "topics",
      bylawNote:
        "For formal use, please refer to the Thai bylaw text shown on this page.",
      bylawOriginal: "Thai Bylaw Text",
      footerTitle: "Thai Association of Quantitative Analysts and Financial Engineers",
      footerCopy:
        "TQF",
      footerOriginal: "",
      sourcePage: "Information",
      missionPoint: "Mission",
      priority: "Priority",
      boardSnapshot: "Board snapshot",
      curriculumSnapshot: "Curriculum snapshot",
      institutionalNote: "Institutional note",
      readingNote: "Reading note",
      vision: "Vision",
      mission: "Mission",
      strategy: "Strategy",
      threeLevels: "Three Levels",
      legalSummaries: "English summaries",
      legalSummariesCopy:
        "In English mode, this page provides key summaries of each bylaw section together with the Thai bylaw text.",
    },
  };

  const content = buildContent();
  render();

  function buildContent() {
    const teamRoleEn = {
      นายก: "President",
      อุปนายก: "Vice President",
      สมาชิก: "Member",
      "สมาชิกและเหรัญญิก": "Committee Member and Treasurer",
      "สมาชิกและนายทะเบียน": "Committee Member and Registrar",
    };
    const teamMemberImagesByIndex = {
      0: "assets/team-pat.jpg",
      2: "assets/team-anan.jpg",
      3: "assets/team-ronnawat.jpg",
      4: "assets/team-pasin.jpg",
      5: "assets/team-theerasit.jpg",
      10: "assets/team-foosin-tight.jpg",
    };

    const missionEn = [
      "Serve as a central network for quantitative analysts, financial engineers, and interested participants to exchange knowledge and experience.",
      "Build a network of quantitative analysts and financial engineers both within Thailand and internationally.",
      "Promote, develop, and strengthen professional standards for quantitative analysts and financial engineers in Thailand so they are respected locally and internationally.",
      "Create a correct understanding of careers in quantitative analysis and financial engineering.",
      "Encourage and support interested people to join activities that develop their capabilities and allow them to demonstrate their potential fully.",
    ];

    const strategyEn = [
      "Develop and strengthen the capability of quantitative analysts, financial engineers, and interested participants in the related disciplines.",
      "Organize activities for knowledge exchange and network-building among quantitative analysts and financial engineers.",
      "Contribute to shaping the direction of the financial industry.",
    ];

    const quantOverviewEn = [
      "Foundations that everyone entering the quant field should learn, regardless of specialization, because they are the base for analysis, reasoning, and future development.",
      "Core knowledge that every quant should study, not only for their own role but to understand the wider financial industry and communicate effectively with adjacent specialists.",
      "Specialized knowledge that quants can pursue based on their interests or intended expertise, helping both personal differentiation and industry capability-building.",
    ];

    const quantIntroEn =
      "The TQF team developed a skills pathway for people interested in quant careers, gathering the knowledge areas worth studying and organizing them into three main levels.";

    const quantTitlesEn = [
      "Finance",
      "Mathematics",
      "Programming",
      "Advanced Mathematical Methods",
      "Asset Behavior & Modeling",
      "Fixed Income and Credit",
      "Risk Management",
      "Machine Learning & Data Science",
      "Portfolio Management",
      "Trading & Execution",
      "Derivatives and Advanced Products",
      "Credit Risk Management",
      "Regulation & Implementation",
    ];

    const quantTitlesTh = [
      "การเงิน",
      "คณิตศาสตร์",
      "การเขียนโปรแกรม",
      "วิธีการทางคณิตศาสตร์ขั้นสูง",
      "พฤติกรรมและแบบจำลองสินทรัพย์",
      "ตราสารหนี้และเครดิต",
      "การบริหารความเสี่ยง",
      "การเรียนรู้ของเครื่องและวิทยาการข้อมูล",
      "การจัดการพอร์ตการลงทุน",
      "การซื้อขายและการดำเนินการซื้อขาย",
      "อนุพันธ์และผลิตภัณฑ์ขั้นสูง",
      "การบริหารความเสี่ยงเครดิต",
      "กฎระเบียบและการนำไปใช้",
    ];

    const sectionTitlesEn = [
      "Section 1 General Provisions",
      "Section 3 Association Administration",
      "Section 4 General Meetings",
      "Section 5 Finance and Assets",
      "Section 6 Amendments and Dissolution",
      "Section 7 Miscellaneous",
      "Section 8 Transitional Provisions",
    ];

    const sectionSummariesEn = [
      [
        "Defines the association’s Thai and English names and the TQF abbreviation.",
        "States the official head office in Chatuchak, Bangkok, and the core non-political objectives of the association.",
        "Sets out membership categories, eligibility criteria, and annual fee levels for ordinary, associate, student, expert, and honorary members.",
      ],
      [
        "Covers member rights, duties, resignation, termination, and the consequences of unpaid dues or misconduct.",
        "Defines board composition, officer roles, term length, powers, and the rules for board meetings and resolutions.",
      ],
      [
        "Establishes ordinary and extraordinary general meetings, including when they must be called and who can request them.",
        "Requires annual general meetings to be held within March and meeting notices to be sent by email at least seven days in advance.",
        "Specifies quorum and voting rules for general meetings.",
      ],
      [
        "Places finances and assets under the responsibility of the board and requires funds to be kept with a stable bank in the association’s name.",
        "Defines signature rules for checks, cash disbursement limits, bookkeeping requirements, and the role of the auditor.",
      ],
      [
        "States that amendments require a two-thirds vote at a duly convened general meeting.",
        "States that dissolution requires a three-quarters vote and that remaining assets must go to a Thai charitable-purpose juristic person.",
      ],
      [
        "Provides that the general meeting resolves interpretation questions by majority vote.",
        "Applies the Civil and Commercial Code on associations where the bylaws are silent.",
        "Confirms that the association cannot distribute profits to individuals.",
      ],
      [
        "Confirms that the bylaws take effect once the association is registered as a juristic person.",
        "Provides that the founders become ordinary members and the initial committee starts from the registration date.",
      ],
    ];

    const bylawSections = source.pages.bylaws.sections.map((section, index) => ({
      thTitle: section.title,
      enTitle: sectionTitlesEn[index] || section.title,
      thLines: section.content,
      enSummary: sectionSummariesEn[index] || [],
    }));

    const modulesEn = quantModules.map((module, index) => ({
      title: quantTitlesEn[index] || module.title,
      items: module.items,
    }));

    const modulesTh = quantModules.map((module, index) => ({
      title: quantTitlesTh[index] || module.title,
      items: module.items,
    }));

    const activities = [
      {
        date: "2026-06-13",
        href: "https://www.facebook.com/quantcornerthailand/posts/pfbid02doX219ecQiKE7ytU143ogfstQ11eiHJzfYHJNok3cSpEb2JvVxBCvuM2n3Xi5d2Bl",
        imageSrc: "assets/hero-activities-quant.png",
        categoryTh: "กิจกรรม",
        categoryEn: "Event",
        titleTh: "Weekend Vibe (Code): มาสร้าง Backtest ของตัวเองด้วย AI",
        titleEn: "Weekend Vibe (Code): Build Your Own AI Backtest",
        copyTh:
          "เวิร์กช็อป 3 ชั่วโมง สำหรับใช้ AI ช่วยสร้าง backtest จากไอเดียการลงทุน จัดวันที่ 13 มิถุนายน 2026 เวลา 9:00 - 12:00 น. ที่ Starbucks ม.มหิดล พญาไท โดยลงทะเบียนผ่าน LINE OA.",
        copyEn:
          "A three-hour workshop on using AI to turn investment ideas into working backtests, scheduled for June 13, 2026 from 9:00 AM to 12:00 PM at Starbucks, Mahidol University Phayathai, with registration via LINE OA.",
        timeTh: "9:00 - 12:00 น.",
        timeEn: "9:00 AM - 12:00 PM",
        locationTh: "Starbucks ม.มหิดล พญาไท",
        locationEn: "Starbucks, Mahidol University Phayathai",
      },
    ];

    const collaboratorGroups = {
      th: [
        {
          key: "facebook",
          title: "เพจเฟซบุ๊ก",
          description: "ช่องทางสาธารณะสำหรับติดตามข่าวสาร กิจกรรม และการสื่อสารของหน่วยงานที่เกี่ยวข้องกับสายงานควอนท์และการเงินเชิงวิชาชีพ",
          items: [
            {
              name: "CFA Institute Facebook",
              href: "https://www.facebook.com/CFAInstitute/",
              logoSrc: "assets/partner-cfa.svg",
              copy: "ติดตามข่าวสารด้านการศึกษา การสอบ และกิจกรรมของ CFA Institute ผ่านช่องทาง Facebook ทางการ",
            },
            {
              name: "WorldQuant University Facebook",
              href: "https://www.facebook.com/worldquantuniversity/",
              logoSrc: "assets/partner-wqu.svg",
              copy: "ติดตามข้อมูลหลักสูตร ข่าวประชาสัมพันธ์ และกิจกรรมจาก WorldQuant University",
            },
            {
              name: "Bloomberg Facebook",
              href: "https://www.facebook.com/bloomberg/",
              logoSrc: "assets/partner-bloomberg.svg",
              copy: "ติดตามข่าวสารด้านตลาดการเงิน เทคโนโลยี และข้อมูลเศรษฐกิจจาก Bloomberg",
            },
          ],
        },
        {
          key: "institute",
          title: "สถาบัน",
          description: "สถาบันวิชาชีพและองค์กรด้านการรับรองความรู้ที่มีบทบาทต่อสายงาน quantitative finance และสาขาที่เกี่ยวข้อง",
          items: [
            {
              name: "CQF",
              href: "https://www.cqf.com/",
              logoSrc: "assets/partner-cqf.svg",
              copy: "Certificate in Quantitative Finance เป็นหลักสูตรวิชาชีพด้าน quantitative finance ระดับสากล",
            },
            {
              name: "CFA Institute",
              href: "https://www.cfainstitute.org/",
              logoSrc: "assets/partner-cfa.svg",
              copy: "องค์กรวิชาชีพด้านการลงทุน การเงิน และจริยธรรมวิชาชีพที่ได้รับการยอมรับในระดับนานาชาติ",
            },
            {
              name: "Society of Actuaries",
              href: "https://www.soa.org/",
              logoSrc: "assets/partner-soa.svg",
              copy: "องค์กรวิชาชีพด้าน actuarial science ที่เกี่ยวข้องกับการวิเคราะห์ความเสี่ยงและแบบจำลองเชิงปริมาณ",
            },
          ],
        },
        {
          key: "university",
          title: "มหาวิทยาลัย",
          description: "มหาวิทยาลัยและโครงการการศึกษาที่เกี่ยวข้องกับ financial engineering, quantitative finance และชุมชนวิชาการสายควอนท์",
          items: [
            {
              name: "KMITL-NIDA Financial Engineering",
              href: "https://nida.kmitl.ac.th/fe/",
              logoSrc: "assets/partner-kmitl-nida.svg",
              copy: "โครงการ Double Degree ด้านวิศวกรรมการเงินของ KMITL และ NIDA",
            },
            {
              name: "WorldQuant University",
              href: "https://www.wqu.edu/",
              logoSrc: "assets/partner-wqu.svg",
              copy: "มหาวิทยาลัยออนไลน์ที่มีหลักสูตรด้าน data science และ financial engineering",
            },
            {
              name: "Quant CU",
              href: "https://quant-cu.github.io/",
              logoSrc: "assets/partner-quant-cu.svg",
              copy: "ชุมชนด้าน quantitative computational finance ของนักศึกษาจุฬาลงกรณ์มหาวิทยาลัย",
            },
          ],
        },
        {
          key: "company",
          title: "บริษัท",
          description: "องค์กรและผู้ให้บริการด้านข้อมูล เทคโนโลยี และการวิเคราะห์ที่มีบทบาทในระบบนิเวศของ quantitative finance",
          items: [
            {
              name: "Bloomberg Professional Services",
              href: "https://www.bloomberg.com/professional",
              logoSrc: "assets/partner-bloomberg.svg",
              copy: "บริการข้อมูล ข่าวสาร และเครื่องมือวิเคราะห์สำหรับผู้ปฏิบัติงานในตลาดการเงิน",
            },
            {
              name: "LSEG Data & Analytics",
              href: "https://www.lseg.com/content/lseg/en_us/data-analytics.html",
              logoSrc: "assets/partner-lseg.svg",
              copy: "แพลตฟอร์มข้อมูลและการวิเคราะห์ตลาดการเงินของ London Stock Exchange Group",
            },
            {
              name: "WorldQuant",
              href: "https://www.worldquant.com/",
              logoSrc: "assets/partner-worldquant.svg",
              copy: "บริษัทด้าน quantitative research และการลงทุนเชิงระบบในระดับสากล",
            },
          ],
        },
      ],
      en: [
        {
          key: "facebook",
          title: "Facebook Pages",
          description: "Public social channels for following updates, events, and announcements from organizations relevant to quantitative finance and professional development.",
          items: [
            {
              name: "CFA Institute Facebook",
              href: "https://www.facebook.com/CFAInstitute/",
              logoSrc: "assets/partner-cfa.svg",
              copy: "Official Facebook page for CFA Institute updates on education, exams, and professional events.",
            },
            {
              name: "WorldQuant University Facebook",
              href: "https://www.facebook.com/worldquantuniversity/",
              logoSrc: "assets/partner-wqu.svg",
              copy: "Public updates on programs, admissions, and academic activity from WorldQuant University.",
            },
            {
              name: "Bloomberg Facebook",
              href: "https://www.facebook.com/bloomberg/",
              logoSrc: "assets/partner-bloomberg.svg",
              copy: "Financial market, business, and economic coverage distributed through Bloomberg’s public Facebook page.",
            },
          ],
        },
        {
          key: "institute",
          title: "Institute",
          description: "Professional institutes and credentialing bodies relevant to quantitative finance, investment analysis, and adjacent technical disciplines.",
          items: [
            {
              name: "CQF",
              href: "https://www.cqf.com/",
              logoSrc: "assets/partner-cqf.svg",
              copy: "The Certificate in Quantitative Finance is a professional qualification focused on quant finance and financial engineering.",
            },
            {
              name: "CFA Institute",
              href: "https://www.cfainstitute.org/",
              logoSrc: "assets/partner-cfa.svg",
              copy: "A global professional body for investment practitioners, ethics, and finance education.",
            },
            {
              name: "Society of Actuaries",
              href: "https://www.soa.org/",
              logoSrc: "assets/partner-soa.svg",
              copy: "A leading actuarial professional organization covering risk, modeling, and quantitative decision frameworks.",
            },
          ],
        },
        {
          key: "university",
          title: "University",
          description: "Academic programs and university-linked communities relevant to financial engineering, quantitative finance, and applied computational finance.",
          items: [
            {
              name: "KMITL-NIDA Financial Engineering",
              href: "https://nida.kmitl.ac.th/fe/",
              logoSrc: "assets/partner-kmitl-nida.svg",
              copy: "A Thai double-degree program in financial engineering jointly offered by KMITL and NIDA.",
            },
            {
              name: "WorldQuant University",
              href: "https://www.wqu.edu/",
              logoSrc: "assets/partner-wqu.svg",
              copy: "An online university offering quantitative programs including financial engineering and data science.",
            },
            {
              name: "Quant CU",
              href: "https://quant-cu.github.io/",
              logoSrc: "assets/partner-quant-cu.svg",
              copy: "A Chulalongkorn University student community focused on quantitative computational finance.",
            },
          ],
        },
        {
          key: "company",
          title: "Company",
          description: "Companies and platforms active in market data, analytics, quantitative research, and financial technology.",
          items: [
            {
              name: "Bloomberg Professional Services",
              href: "https://www.bloomberg.com/professional",
              logoSrc: "assets/partner-bloomberg.svg",
              copy: "Market data, news, and analytical infrastructure used across global financial institutions.",
            },
            {
              name: "LSEG Data & Analytics",
              href: "https://www.lseg.com/content/lseg/en_us/data-analytics.html",
              logoSrc: "assets/partner-lseg.svg",
              copy: "Financial markets data and analytics services from London Stock Exchange Group.",
            },
            {
              name: "WorldQuant",
              href: "https://www.worldquant.com/",
              logoSrc: "assets/partner-worldquant.svg",
              copy: "A quantitative research and systematic investment firm with a global presence.",
            },
          ],
        },
      ],
    };

    return {
      site: {
        th: {
          name: source.site.titleTh,
          subtitle: source.site.titleTh,
          tagline: source.site.tagline,
          address: source.site.address,
          email: source.site.email,
        },
        en: {
          name: source.site.titleEn,
          subtitle: "Thai Quantitative Finance Association",
          tagline:
            "TQF is committed to serving as a central network for quantitative analysts, financial engineers, and interested participants to exchange knowledge and professional experience.",
          address:
            "Building B, 5th Floor, 2547 Phaholyothin Road, Lat Yao, Chatuchak, Bangkok 10900",
          email: source.site.email,
        },
      },
      home: {
        th: {
          eyebrow: "สมาคมนักวิเคราะห์เชิงปริมาณและวิศวกรการเงินไทย",
          title: source.pages.home.hero.headline,
          subtitle: source.site.titleTh,
          body: source.pages.home.hero.body,
          panelTitle: "ภาพรวมเว็บไซต์",
          panelBody:
            "แนวทางการออกแบบใหม่นี้อ้างอิงความเป็นทางการของเว็บไซต์สมาคมระดับสากล และยังคงข้อมูลหลักจากเว็บไซต์ทางการของ TQF ครบทุกหน้า",
          snapshotTitle: "ภาพรวมเชิงสถาบัน",
          snapshotBody:
            "เว็บไซต์ฉบับใหม่นี้จัดข้อมูลสำคัญของสมาคมให้อยู่ในรูปแบบที่อ่านง่าย เป็นทางการ และรองรับสองภาษา",
          imageAlt: "ภาพประกอบเว็บไซต์สมาคม TQF",
          recentTitle: "กิจกรรมล่าสุด",
          recentCopy:
            "รวมความเคลื่อนไหวล่าสุดของสมาคมจากข้อมูลสาธารณะที่เผยแพร่บนเว็บไซต์",
          cards: [
            {
              href: "about.html",
              kicker: "สถาบัน",
              title: "เกี่ยวกับสมาคม",
              copy: source.pages.about.vision,
            },
            {
              href: "team.html",
              kicker: "คณะกรรมการ",
              title: "โครงสร้างผู้บริหาร",
              copy: `คณะกรรมการที่เผยแพร่บนเว็บไซต์ทางการจำนวน ${source.pages.team.members.length} คน`,
            },
            {
              href: "bylaws.html",
              kicker: "ข้อบังคับ",
              title: "กฎระเบียบและธรรมาภิบาล",
              copy: "สรุปโครงสร้างข้อบังคับสมาชิก การประชุม และการกำกับดูแลทางการเงินในรูปแบบอ่านง่าย",
            },
            {
              href: "activities.html",
              kicker: "กิจกรรม",
              title: "กิจกรรมและความเคลื่อนไหว",
              copy: "ติดตามกิจกรรมล่าสุดของสมาคมและการอัปเดตข้อมูลสำคัญที่เผยแพร่ต่อสาธารณะ",
            },
            {
              href: "collaborators.html",
              kicker: "เครือข่าย",
              title: "เครือข่ายความร่วมมือ",
              copy: "รวบรวมหน่วยงาน ชุมชนวิชาชีพ มหาวิทยาลัย และบริษัทที่เกี่ยวข้องกับระบบนิเวศของ quantitative finance",
            },
            {
              href: "academic.html",
              kicker: "วิชาการ",
              title: "องค์ความรู้และวิชาการ",
              copy: "รวมเส้นทางการเรียนรู้ เนื้อหาทักษะ และประเด็นวิชาการที่เกี่ยวข้องกับ quantitative finance",
            },
            {
              href: "quant-pathway.html",
              kicker: "เส้นทางทักษะ",
              title: "เส้นทาง Quant",
              copy: `${quantModules.length} หมวดความรู้ ครอบคลุมตั้งแต่พื้นฐานจนถึงความเชี่ยวชาญเฉพาะทาง`,
            },
          ],
        },
        en: {
          eyebrow: "Thai Association of Quantitative Analysts and Financial Engineers",
          title: "TQF",
          subtitle: source.site.titleEn,
          body:
            "The official website of the Thai Association of Quantitative Analysts and Financial Engineers.",
          panelTitle: "Association Overview",
          panelBody:
            "TQF serves as a professional association for knowledge exchange, network development, and capability building in quantitative finance.",
          snapshotTitle: "Association Overview",
          snapshotBody:
            "The website presents the association profile, committee, bylaws, and quant pathway in Thai and English.",
          imageAlt: "TQF association website visual",
          recentTitle: "Recent Activity",
          recentCopy:
            "Latest association activity and public website updates presented in one place.",
          cards: [
            {
              href: "about.html",
              kicker: "Institution",
              title: "About the Association",
              copy:
                "Vision, mission, and strategic direction of TQF.",
            },
            {
              href: "team.html",
              kicker: "Committee",
              title: "Board and Committee",
              copy: `${source.pages.team.members.length} committee members are presented on this website.`,
            },
            {
              href: "bylaws.html",
              kicker: "Governance",
              title: "Association Bylaws",
              copy:
                "Membership structure, meeting rules, amendment thresholds, and financial controls, arranged for easier review.",
            },
            {
              href: "activities.html",
              kicker: "Activities",
              title: "Recent Activities",
              copy:
                "Follow the latest association activity and public updates collected from the official TQF website.",
            },
            {
              href: "collaborators.html",
              kicker: "Network",
              title: "Collaborators",
              copy:
                "A directory of relevant institutes, universities, companies, and public channels across the quantitative finance ecosystem.",
            },
            {
              href: "academic.html",
              kicker: "Academic",
              title: "Academic Resources",
              copy:
                "Learning structure, skill topics, and academic directions relevant to quantitative finance and financial engineering.",
            },
            {
              href: "quant-pathway.html",
              kicker: "Capability",
              title: "Quant Pathway",
              copy: `${quantModules.length} modules and ${totalTopics} learning topics across foundational, core, and specialized tracks.`,
            },
          ],
        },
      },
      activities: {
        th: {
          eyebrow: "กิจกรรม",
          title: "กิจกรรม",
          subtitle: source.site.titleTh,
          body:
            "รวบรวมโพสต์กิจกรรมสาธารณะจาก Facebook ของ QuantCorner โดยคัดเฉพาะรายการที่เป็นอีเวนต์หรือเวิร์กช็อป",
          panelTitle: "ภาพรวมกิจกรรมล่าสุด",
          panelBody:
            "แสดงเฉพาะกิจกรรมที่เป็นอีเวนต์จากโพสต์สาธารณะของ QuantCorner บน Facebook",
          imageAlt: "ภาพประกอบกิจกรรมของสมาคม TQF",
          items: activities.map((item) => ({
            date: item.date,
            href: item.href,
            imageSrc: item.imageSrc,
            category: item.categoryTh,
            title: item.titleTh,
            copy: item.copyTh,
            time: item.timeTh,
            location: item.locationTh,
          })),
        },
        en: {
          eyebrow: "Activities",
          title: "Activities",
          subtitle: source.site.titleEn,
          body:
            "A curated list of public event posts shared through the QuantCorner Facebook page.",
          panelTitle: "Latest activity overview",
          panelBody:
            "This page highlights public event announcements shared through the QuantCorner Facebook page.",
          imageAlt: "TQF association activities visual",
          items: activities.map((item) => ({
            date: item.date,
            href: item.href,
            imageSrc: item.imageSrc,
            category: item.categoryEn,
            title: item.titleEn,
            copy: item.copyEn,
            time: item.timeEn,
            location: item.locationEn,
          })),
        },
      },
      collaborators: {
        th: {
          eyebrow: "เครือข่ายความร่วมมือ",
          title: "เครือข่ายความร่วมมือ",
          subtitle: source.site.titleTh,
          body:
            "รวบรวมหน่วยงานและชุมชนที่เกี่ยวข้องกับระบบนิเวศของ quantitative finance เพื่อใช้เป็นจุดเชื่อมโยงด้านการเรียนรู้ วิชาชีพ และอุตสาหกรรม",
          panelTitle: "โครงสร้างเครือข่าย",
          panelBody:
            "หน้าเว็บนี้จัดกลุ่มเครือข่ายออกเป็นเพจเฟซบุ๊ก สถาบัน มหาวิทยาลัย และบริษัท เพื่อให้ค้นหาได้สะดวก",
          imageAlt: "ภาพประกอบเครือข่ายความร่วมมือของสมาคม",
          groups: collaboratorGroups.th,
        },
        en: {
          eyebrow: "Collaborators",
          title: "Collaborators",
          subtitle: source.site.titleEn,
          body:
            "A structured directory of public organizations and communities relevant to the quantitative finance ecosystem.",
          panelTitle: "Network structure",
          panelBody:
            "This page groups the network into Facebook Pages, Institute, University, and Company sections for easier access.",
          imageAlt: "Collaborator network visual",
          groups: collaboratorGroups.en,
        },
      },
      academic: {
        th: {
          eyebrow: "วิชาการ",
          title: "วิชาการ",
          subtitle: source.site.titleTh,
          body:
            "ศูนย์รวมองค์ความรู้และแนวทางการพัฒนาทักษะสำหรับผู้สนใจสาย quantitative finance, financial engineering และการวิเคราะห์เชิงปริมาณ",
          panelTitle: "โครงสร้างด้านวิชาการ",
          panelBody:
            "หน้าเว็บนี้รวบรวมกรอบการเรียนรู้ ประเด็นองค์ความรู้หลัก และเครือข่ายด้านวิชาการที่เกี่ยวข้องกับภารกิจของสมาคม",
          imageAlt: "ภาพประกอบด้านวิชาการของสมาคม",
          highlights: [
            {
              href: "academic-committee-board.html",
              kicker: "คณะกรรมการ",
              title: "คณะกรรมการวิชาการ",
              copy: "โครงสร้างคณะกรรมการวิชาการสำหรับกำกับทิศทางองค์ความรู้ มาตรฐาน และการพัฒนากิจกรรมด้านวิชาการของสมาคม",
            },
            {
              href: "journal.html",
              kicker: "วารสาร",
              title: "วารสาร",
              copy: "พื้นที่สำหรับบทความ งานวิเคราะห์ และองค์ความรู้เชิงลึกที่เกี่ยวข้องกับ quantitative finance และ financial engineering",
            },
            {
              href: "magazine.html",
              kicker: "สื่อเผยแพร่",
              title: "แมกกาซีน",
              copy: "ช่องทางนำเสนอข่าวสาร บทสรุปประเด็นวิชาการ และเนื้อหาที่เข้าถึงได้ง่ายสำหรับสมาชิกและผู้สนใจ",
            },
            {
              href: "articles.html",
              kicker: "บทความ",
              title: "บทความ",
              copy: "รวมบทความเรียบเรียงเชิงวิชาการจากเนื้อหาของสมาคมในรูปแบบอ่านต่อได้บนเว็บไซต์",
            },
            {
              href: "book-series.html",
              kicker: "สิ่งพิมพ์",
              title: "ชุดหนังสือ",
              copy: "คลังหนังสือและคู่มือดาวน์โหลดที่พัฒนาจากเนื้อหาวิชาการของสมาคมในรูปแบบอ่านสะดวกและพร้อมใช้งาน",
            },
            {
              href: "academic-conference.html",
              kicker: "งานประชุม",
              title: "งานประชุมวิชาการ",
              copy: "พื้นที่สำหรับประกาศกำหนดการประชุมวิชาการ หัวข้อการนำเสนอ การลงทะเบียน และข้อมูลวิทยากรของสมาคม",
            },
          ],
          pillars: [
            "พื้นฐานด้านการเงิน คณิตศาสตร์ และการเขียนโปรแกรม",
            "องค์ความรู้หลักด้านการวิเคราะห์สินทรัพย์ ความเสี่ยง และตราสารการเงิน",
            "หัวข้อเฉพาะทางด้าน machine learning, portfolio management, trading และ regulation",
          ],
        },
        en: {
          eyebrow: "Academic",
          title: "Academic",
          subtitle: source.site.titleEn,
          body:
            "A knowledge hub for people interested in quantitative finance, financial engineering, and applied quantitative analysis.",
          panelTitle: "Academic structure",
          panelBody:
            "This page brings together learning pathways, core knowledge areas, and academic network references aligned with the association’s mission.",
          imageAlt: "Academic visual",
          highlights: [
            {
              href: "academic-committee-board.html",
              kicker: "Committee",
              title: "Academic Committee Board",
              copy: "A dedicated academic committee structure for knowledge direction, standards, and the development of association-led academic work.",
            },
            {
              href: "journal.html",
              kicker: "Journal",
              title: "Journal",
              copy: "A publication space for articles, analysis, and in-depth knowledge relevant to quantitative finance and financial engineering.",
            },
            {
              href: "magazine.html",
              kicker: "Magazine",
              title: "Magazine",
              copy: "An accessible publication format for news, summaries, interviews, and academic communication for members and the wider community.",
            },
            {
              href: "articles.html",
              kicker: "Articles",
              title: "Articles",
              copy: "Long-form article pages developed from the association’s published academic and institutional content.",
            },
            {
              href: "book-series.html",
              kicker: "Publications",
              title: "Book Series",
              copy: "A downloadable library of books and handbooks developed from the association’s academic content.",
            },
            {
              href: "academic-conference.html",
              kicker: "Conference",
              title: "Academic Conference",
              copy: "A formal page for conference schedules, registration details, speaker information, and academic event announcements.",
            },
          ],
          pillars: [
            "Foundations in finance, mathematics, and programming",
            "Core knowledge in asset behavior, risk, and financial instruments",
            "Specialized topics including machine learning, portfolio management, trading, and regulation",
          ],
        },
      },
      academicConference: {
        th: {
          eyebrow: "วิชาการ",
          title: "งานประชุมวิชาการ",
          subtitle: source.site.titleTh,
          body:
            "พื้นที่สำหรับประกาศงานประชุมวิชาการของสมาคม เช่น กำหนดการ หัวข้อบรรยาย การลงทะเบียน และรายละเอียดสำหรับผู้เข้าร่วม",
          overview:
            "หน้านี้จัดไว้เป็นพื้นที่ทางการสำหรับการสื่อสารงานประชุมวิชาการของสมาคม โดยสอดคล้องกับข้อบังคับที่กล่าวถึงสิทธิประโยชน์ด้านส่วนลดการลงทะเบียนและบทบาทของวิทยากรผู้เชี่ยวชาญ",
          bullets: [
            "กำหนดการประชุม สถานที่จัดงาน และหัวข้อสำคัญของแต่ละงาน",
            "ข้อมูลการลงทะเบียน สิทธิประโยชน์ของสมาชิก และรูปแบบการเข้าร่วม",
            "รายละเอียดวิทยากร ผู้ทรงคุณวุฒิ และกิจกรรมทางวิชาการที่เกี่ยวข้อง",
          ],
        },
        en: {
          eyebrow: "Academic",
          title: "Academic Conference",
          subtitle: source.site.titleEn,
          body:
            "A formal page for association-led academic conference announcements, including schedules, presentation themes, registration details, and participation information.",
          overview:
            "This page serves as the official location for the association’s academic conference communication, aligned with the bylaws that reference member registration discounts and expert speaker participation.",
          bullets: [
            "Conference schedules, venues, and major session themes",
            "Registration details, member benefits, and attendance format",
            "Speaker, expert, and related academic activity information",
          ],
        },
      },
      academicCommitteeBoard: {
        th: {
          eyebrow: "วิชาการ",
          title: "คณะกรรมการวิชาการ",
          subtitle: source.site.titleTh,
          body:
            "หน้าสำหรับโครงสร้างคณะกรรมการวิชาการของสมาคม โดยใช้เผยแพร่บทบาท หน้าที่ และองค์ประกอบของคณะกรรมการเมื่อสมาคมกำหนดรายละเอียดอย่างเป็นทางการ",
          imageAlt: "ภาพประกอบคณะกรรมการวิชาการ",
          overview:
            "ส่วนนี้ใช้เป็นพื้นที่อย่างเป็นทางการสำหรับแสดงโครงสร้างการกำกับดูแลงานวิชาการของสมาคม",
          bullets: [
            "บทบาทในการกำหนดทิศทางด้านวิชาการและมาตรฐานองค์ความรู้",
            "การสนับสนุนหลักสูตร กิจกรรมวิชาการ และการพัฒนาเนื้อหาสำหรับสมาชิก",
            "การประสานเครือข่ายผู้เชี่ยวชาญ มหาวิทยาลัย และภาคอุตสาหกรรมในประเด็นวิชาการ",
          ],
        },
        en: {
          eyebrow: "Academic",
          title: "Academic Committee Board",
          subtitle: source.site.titleEn,
          body:
            "A dedicated page for the association’s academic committee structure, intended to publish formal roles, responsibilities, and appointments when officially available.",
          imageAlt: "Academic committee board visual",
          overview:
            "This page serves as the formal location for presenting the governance structure of the association’s academic work.",
          bullets: [
            "Guide academic direction and knowledge standards",
            "Support curricula, academic events, and member-facing learning content",
            "Coordinate expert, university, and industry networks around academic initiatives",
          ],
        },
      },
      journal: {
        th: {
          eyebrow: "วิชาการ",
          title: "วารสาร",
          subtitle: source.site.titleTh,
          body:
            "หน้าวารสารสำหรับเผยแพร่บทความเชิงวิชาการ งานวิเคราะห์ และองค์ความรู้ที่เกี่ยวข้องกับ quantitative finance และ financial engineering",
          overview:
            "ส่วนนี้ใช้เป็นพื้นที่เผยแพร่งานเขียนเชิงวิชาการและบทวิเคราะห์เชิงลึกของสมาคม",
          recentTitle: "อัปเดตล่าสุด",
          recentHeadline: "เพิ่มบทวิเคราะห์จากกรอบ Quant Pathway และมาตรฐานวิชาชีพ",
          recentCopy:
            "หน้าวารสารจัดแสดงบทความเชิงวิเคราะห์ในรูปแบบ publication showcase เพื่อให้ผู้อ่านเข้าถึงหัวข้อความรู้หลักของสมาคมได้ง่ายขึ้น",
          recentMeta: [
            ["สถานะ", "เผยแพร่บนเว็บไซต์"],
            ["จำนวนเรื่องแนะนำ", pad(journalShowcase.th.length)],
            ["อ้างอิงหลัก", "Quant Pathway / Bylaws"],
          ],
          bullets: [
            "บทความเชิงวิชาการและบทวิเคราะห์เชิงลึก",
            "สรุปแนวโน้มวิจัยและประเด็นสำคัญทางวิชาชีพ",
            "พื้นที่เผยแพร่องค์ความรู้จากผู้เชี่ยวชาญและเครือข่ายวิชาการ",
          ],
          showcase: journalShowcase.th,
        },
        en: {
          eyebrow: "Academic",
          title: "Journal",
          subtitle: source.site.titleEn,
          body:
            "A journal page for academic articles, analytical papers, and knowledge publications related to quantitative finance and financial engineering.",
          overview:
            "This section is intended as the association’s formal publication space for academic and analytical writing.",
          recentTitle: "Recent Update",
          recentHeadline: "New analytical briefs added from Quant Pathway and professional standards material",
          recentCopy:
            "The journal page now uses a publication-style showcase to present core analytical themes from the association in a more formal reading format.",
          recentMeta: [
            ["Status", "Published on site"],
            ["Featured items", pad(journalShowcase.en.length)],
            ["Primary sources", "Quant Pathway / Bylaws"],
          ],
          bullets: [
            "Academic articles and in-depth analytical writing",
            "Research trend summaries and professional knowledge updates",
            "A publication space for expert and academic network contributions",
          ],
          showcase: journalShowcase.en,
        },
      },
      magazine: {
        th: {
          eyebrow: "วิชาการ",
          title: "แมกกาซีน",
          subtitle: source.site.titleTh,
          body:
            "หน้าแมกกาซีนสำหรับเนื้อหาสื่อสารในรูปแบบที่เข้าถึงง่าย เช่น ข่าวสาร บทสัมภาษณ์ สรุปประเด็นวิชาการ และเรื่องเด่นจากกิจกรรมของสมาคม",
          overview:
            "ส่วนนี้ใช้สำหรับสื่อสารองค์ความรู้และประเด็นจากภาควิชาชีพในรูปแบบที่เหมาะกับผู้อ่านวงกว้าง",
          recentTitle: "อัปเดตล่าสุด",
          recentHeadline: "เพิ่มเลย์เอาต์แบบแมกกาซีนสำหรับข่าวสาร กิจกรรม และเส้นทางการเรียนรู้",
          recentCopy:
            "หน้าแมกกาซีนเน้นการนำเสนอเนื้อหาให้อ่านง่ายและเชื่อมโยงกับกิจกรรมจริงของสมาคม รวมถึงประเด็นแนะนำสำหรับผู้เริ่มต้นสายควอนท์",
          recentMeta: [
            ["สถานะ", "เผยแพร่บนเว็บไซต์"],
            ["จำนวนเรื่องแนะนำ", pad(magazineShowcase.th.length)],
            ["อ้างอิงหลัก", "Activities / Quant Pathway"],
          ],
          bullets: [
            "ข่าวสารและเรื่องเด่นจากกิจกรรมของสมาคม",
            "บทสัมภาษณ์และมุมมองจากผู้ปฏิบัติงานในสายงาน",
            "บทสรุปประเด็นความรู้ที่อ่านง่ายสำหรับผู้สนใจทั่วไป",
          ],
          showcase: magazineShowcase.th,
        },
        en: {
          eyebrow: "Academic",
          title: "Magazine",
          subtitle: source.site.titleEn,
          body:
            "A magazine page for accessible communication formats such as news, interviews, academic summaries, and highlights from association activities.",
          overview:
            "This section is intended for broader, more accessible communication of knowledge and professional themes.",
          recentTitle: "Recent Update",
          recentHeadline: "New magazine-style highlights added for activities, careers, and learning pathways",
          recentCopy:
            "The magazine page is designed for broader audiences, with an accessible showcase of activity highlights and learning-oriented features.",
          recentMeta: [
            ["Status", "Published on site"],
            ["Featured items", pad(magazineShowcase.en.length)],
            ["Primary sources", "Activities / Quant Pathway"],
          ],
          bullets: [
            "Association news and featured activity coverage",
            "Interviews and viewpoints from practitioners",
            "Readable knowledge summaries for broader audiences",
          ],
          showcase: magazineShowcase.en,
        },
      },
      articles: {
        th: {
          eyebrow: "วิชาการ",
          title: "บทความ",
          subtitle: source.site.titleTh,
          body:
            "หน้าบทความสำหรับคัดเลือกบทความต้นฉบับจากองค์กรพันธมิตรของสมาคม โดยแสดงเฉพาะเนื้อหาที่เผยแพร่โดยเจ้าของแหล่งโดยตรง ไม่ใช้โพสต์แชร์จากเพจอื่น",
          overview:
            "ส่วนนี้ใช้เป็นคลังบทความจากเว็บไซต์ทางการของพันธมิตร เช่น CQF, CFA Institute และ WorldQuant University พร้อมลิงก์กลับไปยังบทความต้นฉบับ",
          items: articleCatalog.th,
        },
        en: {
          eyebrow: "Academic",
          title: "Articles",
          subtitle: source.site.titleEn,
          body:
            "A page that curates original articles from partner organizations only, excluding reposts and shared content from other pages.",
          overview:
            "This section serves as an on-site reading archive built from official partner websites such as CQF, CFA Institute, and WorldQuant University.",
          items: articleCatalog.en,
        },
      },
      bookSeries: {
        th: {
          eyebrow: "วิชาการ",
          title: "ชุดหนังสือ",
          subtitle: source.site.titleTh,
          body:
            "หน้ารวมสิ่งพิมพ์และคู่มือดาวน์โหลดของสมาคมในหมวดวิชาการ โดยเริ่มต้นจากชุดเอกสารที่พัฒนาจากเนื้อหา Quant Pathway ของ TQF",
          overview:
            "ส่วนนี้ใช้แสดงชุดหนังสือและคู่มือเชิงวิชาการที่สมาชิกและผู้สนใจสามารถดาวน์โหลดไปใช้อ่านต่อได้",
          publications: bookSeriesCatalog.th,
        },
        en: {
          eyebrow: "Academic",
          title: "Book Series",
          subtitle: source.site.titleEn,
          body:
            "A publication shelf for downloadable academic books and handbooks, starting with materials developed from the TQF Quant Pathway.",
          overview:
            "This section presents downloadable academic booklets and reference documents for members and interested readers.",
          publications: bookSeriesCatalog.en,
        },
      },
      quantJobs: {
        th: {
          eyebrow: "วิชาชีพ",
          title: "งานสายควอนท์",
          subtitle: source.site.titleTh,
          body:
            "หน้าสำหรับรวบรวมข้อมูลตำแหน่งงาน สายอาชีพ และบทบาทการทำงานที่เกี่ยวข้องกับ quantitative finance, financial engineering และงานวิเคราะห์เชิงปริมาณ",
          imageAlt: "ภาพประกอบงานด้าน Quant",
          overview:
            "ส่วนนี้ใช้เป็นพื้นที่ของสมาคมสำหรับนำเสนอแนวทางสายอาชีพ บทบาทงาน และโอกาสการพัฒนาวิชาชีพในสายงานควอนท์",
          bullets: [
            "แนวทางสายอาชีพและบทบาทงานที่เกี่ยวข้องกับ quantitative finance",
            "ขอบเขตทักษะที่ผู้สมัครควรเตรียมสำหรับตำแหน่งงานด้าน Quant",
            "พื้นที่สำหรับเผยแพร่โอกาสงานหรือข้อมูลที่เป็นประโยชน์ต่อสมาชิกในอนาคต",
          ],
        },
        en: {
          eyebrow: "Career",
          title: "Quant Jobs",
          subtitle: source.site.titleEn,
          body:
            "A page for career roles, job functions, and professional pathways related to quantitative finance, financial engineering, and applied quantitative analysis.",
          imageAlt: "Quant jobs visual",
          overview:
            "This section serves as the association’s formal space for presenting career directions, job functions, and professional development pathways in quant-related work.",
          bullets: [
            "Career tracks and job functions related to quantitative finance",
            "Core skill expectations for applicants targeting quant roles",
            "A future space for job opportunities and member-relevant career information",
          ],
        },
      },
      training: {
        th: {
          eyebrow: "วิชาชีพ",
          title: "การอบรม",
          subtitle: source.site.titleTh,
          body:
            "หน้าสำหรับการอบรมและการพัฒนาทักษะวิชาชีพของสมาคม เพื่อสนับสนุนการเสริมศักยภาพของสมาชิกและผู้สนใจในสายงาน quantitative finance",
          imageAlt: "ภาพประกอบการอบรม",
          overview:
            "ข้อบังคับของสมาคมระบุถึงสิทธิประโยชน์ด้านส่วนลดในการลงทะเบียนอบรมที่สมาคมจัด จึงหน้านี้ถูกจัดไว้เป็นพื้นที่อย่างเป็นทางการสำหรับการอบรมและการพัฒนาทักษะ",
          bullets: [
            "พื้นที่สำหรับประกาศหลักสูตรอบรมและกิจกรรมพัฒนาทักษะของสมาคม",
            "รองรับการสื่อสารรายละเอียดหัวข้อ วิทยากร และกลุ่มเป้าหมายของการอบรม",
            "เชื่อมโยงกับภารกิจของสมาคมในการพัฒนาและเสริมศักยภาพด้านวิชาชีพ",
          ],
        },
        en: {
          eyebrow: "Career",
          title: "Training",
          subtitle: source.site.titleEn,
          body:
            "A page for professional training and capability development organized to support members and interested participants in quantitative finance.",
          imageAlt: "Training visual",
          overview:
            "The association bylaws refer to registration discounts for training programs organized by the association, so this page is positioned as the formal location for future training activity and skills development.",
          bullets: [
            "A formal space for training programs and capability-building activities",
            "Supports course information such as topics, speakers, and intended audience",
            "Aligned with the association mission of strengthening professional capability",
          ],
        },
      },
      about: {
        th: {
          eyebrow: "เกี่ยวกับสมาคม",
          title: "เกี่ยวกับสมาคม",
          subtitle: source.site.titleTh,
          body: source.pages.about.vision,
          panelTitle: "ข้อมูลจากหน้าต้นทาง",
          panelBody:
            "หน้าทางการของ TQF แสดงข้อมูลใน 3 ส่วนหลัก ได้แก่ วิสัยทัศน์ พันธกิจ และยุทธศาสตร์ ซึ่งหน้านี้นำมาจัดเรียงใหม่ให้อ่านง่ายและชัดเจนขึ้น",
          vision: source.pages.about.vision,
          mission: source.pages.about.mission,
          strategy: source.pages.about.strategy,
        },
        en: {
          eyebrow: "About",
          title: "About the Association",
          subtitle: source.site.titleEn,
          body:
            "The official TQF about page defines the association through one vision statement, five mission commitments, and three strategic directions.",
          panelTitle: "Association Structure",
          panelBody:
            "This page presents the association vision, mission, and strategy in Thai and English.",
          vision:
            "To serve as a central network for quantitative analysts, financial engineers, and interested participants to exchange knowledge and experience.",
          mission: missionEn,
          strategy: strategyEn,
        },
      },
      team: {
        th: {
          eyebrow: "คณะกรรมการ",
          title: "คณะกรรมการ",
          subtitle: source.site.titleTh,
          body:
            "หน้าคณะกรรมการของ TQF แสดงรายชื่อคณะผู้บริหารและกรรมการสมาคม พร้อมตำแหน่งและคุณวุฒิที่ระบุไว้ในเว็บไซต์ทางการ",
          panelTitle: "โครงสร้างคณะกรรมการ",
          panelBody:
            "ข้อมูลรายชื่อ ตำแหน่ง และคุณวุฒิด้านล่างอ้างอิงจากหน้าคณะกรรมการของเว็บไซต์ TQF โดยตรง",
          members: source.pages.team.members.map((member, index) => ({
            name: member.name,
            role: member.role,
            qualifications: member.qualifications,
            initials: member.initials,
            imageSrc: teamMemberImagesByIndex[index] || "",
          })),
        },
        en: {
          eyebrow: "Committee",
          title: "Board and Committee",
          subtitle: source.site.titleEn,
          body:
            "This page presents the association leadership and committee members.",
          panelTitle: "Committee Structure",
          panelBody:
            "The committee directory is available in both Thai and English.",
          members: source.pages.team.members.map((member, index) => ({
            name: member.name,
            role: teamRoleEn[member.role] || member.role,
            qualifications: member.qualifications,
            initials: member.initials,
            imageSrc: teamMemberImagesByIndex[index] || "",
          })),
        },
      },
      quant: {
        th: {
          eyebrow: "เส้นทาง Quant",
          title: "เส้นทาง Quant ของ TQF",
          subtitle: "เส้นทางการเรียนรู้สายควอนท์",
          body: source.pages.quantPathway.introBody,
          panelTitle: "ภาพรวมหลักสูตร",
          panelBody:
            "ข้อมูลด้านล่างอ้างอิงจากหน้าเส้นทาง Quant ของ TQF และจัดใหม่ให้อยู่ในรูปแบบสามระดับที่สำรวจได้ง่ายขึ้น",
          overview: [
            {
              title: "พื้นฐาน",
              description: source.pages.quantPathway.overview[0].description,
            },
            {
              title: "แกนหลัก",
              description: source.pages.quantPathway.overview[1].description,
            },
            {
              title: "เฉพาะทาง",
              description: source.pages.quantPathway.overview[2].description,
            },
          ],
          groups: [
            {
              label: "พื้นฐาน",
              title: "พื้นฐาน",
              description: source.pages.quantPathway.overview[0].description,
              modules: modulesTh.slice(0, 3),
            },
            {
              label: "แกนหลัก",
              title: "แกนหลัก",
              description: source.pages.quantPathway.overview[1].description,
              modules: modulesTh.slice(3, 8),
            },
            {
              label: "เฉพาะทาง",
              title: "เฉพาะทาง",
              description: source.pages.quantPathway.overview[2].description,
              modules: modulesTh.slice(8),
            },
          ],
        },
        en: {
          eyebrow: "Quant Pathway",
          title: "TQF Quant Pathway",
          subtitle: "A structured learning map",
          body: quantIntroEn,
          panelTitle: "Curriculum structure",
          panelBody:
            "The pathway is organized into foundational, core, and specialized layers, each supported by topic modules from the official TQF page.",
          overview: [
            {
              title: "Foundational",
              description: quantOverviewEn[0],
            },
            {
              title: "Core",
              description: quantOverviewEn[1],
            },
            {
              title: "Specialized",
              description: quantOverviewEn[2],
            },
          ],
          groups: [
            {
              label: "Foundational",
              title: "Foundational",
              description: quantOverviewEn[0],
              modules: modulesEn.slice(0, 3),
            },
            {
              label: "Core",
              title: "Core",
              description: quantOverviewEn[1],
              modules: modulesEn.slice(3, 8),
            },
            {
              label: "Specialized",
              title: "Specialized",
              description: quantOverviewEn[2],
              modules: modulesEn.slice(8),
            },
          ],
        },
      },
      bylaws: {
        th: {
          eyebrow: "ข้อบังคับสมาคม",
          title: source.pages.bylaws.title,
          subtitle: source.pages.bylaws.subtitle,
          body:
            "หน้าข้อบังคับฉบับนี้จัดเรียงข้อมูลจากเว็บไซต์ทางการใหม่ให้อ่านง่ายขึ้น โดยคงข้อความภาษาไทยต้นฉบับไว้ครบตามหมวดที่เผยแพร่",
          panelTitle: "ข้อสังเกตการใช้งาน",
          panelBody:
            "หากต้องใช้อ้างอิงทางกฎหมายหรือการใช้งานทางการของสมาคม โปรดตรวจสอบกับหน้าต้นฉบับโดยตรง",
          sections: bylawSections,
        },
        en: {
          eyebrow: "Association Bylaws",
          title: "Association Bylaws",
          subtitle: "English summaries with Thai bylaw text",
          body:
            "This page presents English summaries of each bylaw section together with the Thai bylaw text.",
          panelTitle: "Reading note",
          panelBody:
            "English mode provides section summaries together with the Thai bylaw text.",
          sections: bylawSections,
        },
      },
    };
  }

  function render() {
    document.documentElement.lang = state.lang === "th" ? "th" : "en";
    document.body.classList.remove("menu-open");
    renderHeader();
    renderPage();
    renderFooter();
    bindInteractions();
    revealOnScroll();
  }

  function renderHeader() {
    const langUi = ui[state.lang];
    const currentSite = content.site[state.lang];
    const navBySlug = Object.fromEntries(navItems.map((item) => [item.slug, item]));
    const homeNav = navBySlug.home;
    const activitiesNav = navBySlug.activities;
    const collaboratorsNav = navBySlug.collaborators;
    const academicNav = navBySlug.academic;
    const quantNav = navBySlug["quant-pathway"];
    const quantJobsNav = navBySlug["quant-jobs"];
    const trainingNav = navBySlug.training;
    const associationNav = [navBySlug.about, navBySlug.team, navBySlug.bylaws].filter(Boolean);
    const associationActive = associationNav.some((item) => item.slug === slug);
    const academicActive = ["academic", "academic-committee-board", "academic-conference", "journal", "magazine", "articles", "book-series"].includes(slug);
    const careerActive = ["quant-pathway", "quant-jobs", "training"].includes(slug);
    const collaboratorChildren =
      state.lang === "th"
        ? [
            { href: "collaborators.html#facebook", label: "เพจเฟซบุ๊ก" },
            { href: "collaborators.html#institute", label: "สถาบัน" },
            { href: "collaborators.html#university", label: "มหาวิทยาลัย" },
            { href: "collaborators.html#company", label: "บริษัท" },
          ]
        : [
            { href: "collaborators.html#facebook", label: "Facebook Pages" },
            { href: "collaborators.html#institute", label: "Institute" },
            { href: "collaborators.html#university", label: "University" },
            { href: "collaborators.html#company", label: "Company" },
          ];
    const academicChildren =
      state.lang === "th"
        ? [
            { href: "academic-committee-board.html", label: "คณะกรรมการวิชาการ" },
            { href: "academic-conference.html", label: "งานประชุมวิชาการ" },
            { href: "journal.html", label: "วารสาร" },
            { href: "magazine.html", label: "แมกกาซีน" },
            { href: "articles.html", label: "บทความ" },
            { href: "book-series.html", label: "ชุดหนังสือ" },
          ]
        : [
            { href: "academic-committee-board.html", label: "Academic Committee Board" },
            { href: "academic-conference.html", label: "Academic Conference" },
            { href: "journal.html", label: "Journal" },
            { href: "magazine.html", label: "Magazine" },
            { href: "articles.html", label: "Articles" },
            { href: "book-series.html", label: "Book Series" },
          ];
    const careerChildren =
      state.lang === "th"
        ? [
            { href: quantNav ? quantNav.href : "quant-pathway.html", label: "เส้นทาง Quant", active: slug === "quant-pathway" },
            { href: quantJobsNav ? quantJobsNav.href : "quant-jobs.html", label: "งานด้าน Quant", active: slug === "quant-jobs" },
            { href: trainingNav ? trainingNav.href : "training.html", label: "การอบรม", active: slug === "training" },
          ]
        : [
            { href: quantNav ? quantNav.href : "quant-pathway.html", label: "Quant Pathway", active: slug === "quant-pathway" },
            { href: quantJobsNav ? quantJobsNav.href : "quant-jobs.html", label: "Quant Jobs", active: slug === "quant-jobs" },
            { href: trainingNav ? trainingNav.href : "training.html", label: "Training", active: slug === "training" },
          ];

    headerRoot.innerHTML = `
      <div class="header-inner">
        <a class="brand" href="index.html" aria-label="TQF home">
          <span class="brand-mark">
            <img src="assets/logo.png" alt="TQF logo">
          </span>
        </a>
        <nav class="site-nav" id="site-nav" aria-label="Primary">
          ${homeNav ? `<a class="nav-link ${homeNav.slug === slug ? "is-active" : ""}" href="${homeNav.href}">${escapeHtml(state.lang === "th" ? homeNav.labelTh : homeNav.labelEn)}</a>` : ""}
          <div class="nav-dropdown">
            <details class="nav-dropdown-panel">
              <summary class="nav-link nav-summary ${associationActive ? "is-active" : ""}">
                <span>${escapeHtml(langUi.labels.about)}</span>
                <span class="nav-caret" aria-hidden="true"></span>
              </summary>
              <div class="dropdown-menu">
                ${associationNav
                  .map((item) => {
                    const label = state.lang === "th" ? item.labelTh : item.labelEn;
                    return `
                      <a class="dropdown-link ${item.slug === slug ? "is-active" : ""}" href="${item.href}">
                        ${escapeHtml(label)}
                      </a>
                    `;
                  })
                  .join("")}
              </div>
            </details>
          </div>
          ${activitiesNav ? `<a class="nav-link ${activitiesNav.slug === slug ? "is-active" : ""}" href="${activitiesNav.href}">${escapeHtml(state.lang === "th" ? activitiesNav.labelTh : activitiesNav.labelEn)}</a>` : ""}
          ${
            collaboratorsNav
              ? `
                <div class="nav-dropdown">
                  <details class="nav-dropdown-panel">
                    <summary class="nav-link nav-summary ${collaboratorsNav.slug === slug ? "is-active" : ""}">
                      <span>${escapeHtml(state.lang === "th" ? collaboratorsNav.labelTh : collaboratorsNav.labelEn)}</span>
                      <span class="nav-caret" aria-hidden="true"></span>
                    </summary>
                    <div class="dropdown-menu">
                      ${collaboratorChildren
                        .map(
                          (item) => `
                            <a class="dropdown-link" href="${item.href}">
                              ${escapeHtml(item.label)}
                            </a>
                          `,
                        )
                        .join("")}
                    </div>
                  </details>
                </div>
              `
              : ""
          }
          ${
            academicNav
              ? `
                <div class="nav-dropdown">
                  <details class="nav-dropdown-panel">
                    <summary class="nav-link nav-summary ${academicActive ? "is-active" : ""}">
                      <span>${escapeHtml(state.lang === "th" ? academicNav.labelTh : academicNav.labelEn)}</span>
                      <span class="nav-caret" aria-hidden="true"></span>
                    </summary>
                    <div class="dropdown-menu">
                      ${academicChildren
                        .map(
                          (item) => `
                            <a class="dropdown-link" href="${item.href}">
                              ${escapeHtml(item.label)}
                            </a>
                          `,
                        )
                        .join("")}
                    </div>
                  </details>
                </div>
              `
              : ""
          }
          <div class="nav-dropdown">
            <details class="nav-dropdown-panel">
              <summary class="nav-link nav-summary ${careerActive ? "is-active" : ""}">
                <span>${escapeHtml(state.lang === "th" ? "วิชาชีพ" : "Career")}</span>
                <span class="nav-caret" aria-hidden="true"></span>
              </summary>
              <div class="dropdown-menu">
                ${careerChildren
                  .map(
                    (item) => `
                      <a class="dropdown-link ${item.active ? "is-active" : ""}" href="${item.href}">
                        ${escapeHtml(item.label)}
                      </a>
                    `,
                  )
                  .join("")}
              </div>
            </details>
          </div>
          <div class="nav-language language-switcher" aria-label="${escapeHtml(langUi.language)}">
            <button class="lang-button ${state.lang === "th" ? "is-active" : ""}" type="button" data-lang="th">TH</button>
            <button class="lang-button ${state.lang === "en" ? "is-active" : ""}" type="button" data-lang="en">EN</button>
          </div>
        </nav>
        <div class="header-cta-group">
          <button class="menu-toggle" id="menu-toggle-control" aria-expanded="false" aria-controls="site-nav" aria-label="Toggle navigation">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  function renderPage() {
    const pageTitle = {
      home: state.lang === "th" ? "TQF | หน้าแรก" : "TQF | Home",
      about: state.lang === "th" ? "TQF | เกี่ยวกับสมาคม" : "TQF | About",
      team: state.lang === "th" ? "TQF | คณะกรรมการ" : "TQF | Team",
      bylaws: state.lang === "th" ? "TQF | ข้อบังคับสมาคม" : "TQF | Bylaws",
      activities: state.lang === "th" ? "TQF | กิจกรรม" : "TQF | Activities",
      collaborators: state.lang === "th" ? "TQF | เครือข่ายความร่วมมือ" : "TQF | Collaborators",
      academic: state.lang === "th" ? "TQF | วิชาการ" : "TQF | Academic",
      academicCommitteeBoard: state.lang === "th" ? "TQF | คณะกรรมการวิชาการ" : "TQF | Academic Committee Board",
      academicConference: state.lang === "th" ? "TQF | งานประชุมวิชาการ" : "TQF | Academic Conference",
      journal: state.lang === "th" ? "TQF | วารสาร" : "TQF | Journal",
      magazine: state.lang === "th" ? "TQF | แมกกาซีน" : "TQF | Magazine",
      articles: state.lang === "th" ? "TQF | บทความ" : "TQF | Articles",
      bookSeries: state.lang === "th" ? "TQF | ชุดหนังสือ" : "TQF | Book Series",
      quantJobs: state.lang === "th" ? "TQF | งานด้าน Quant" : "TQF | Quant Jobs",
      training: state.lang === "th" ? "TQF | การอบรม" : "TQF | Training",
      quantPathway: state.lang === "th" ? "TQF | Quant Pathway" : "TQF | Quant Pathway",
    }[pageKey];

    document.title = pageTitle;

    const html = {
      home: renderHome(),
      about: renderAbout(),
      team: renderTeam(),
      bylaws: renderBylaws(),
      activities: renderActivities(),
      collaborators: renderCollaborators(),
      academic: renderAcademic(),
      academicCommitteeBoard: renderAcademicSubpage(content.academicCommitteeBoard[state.lang]),
      academicConference: renderAcademicSubpage(content.academicConference[state.lang]),
      journal: renderPublicationPage(content.journal[state.lang]),
      magazine: renderPublicationPage(content.magazine[state.lang]),
      articles: renderArticles(),
      bookSeries: renderBookSeries(),
      quantJobs: renderCareerSubpage(content.quantJobs[state.lang]),
      training: renderCareerSubpage(content.training[state.lang]),
      quantPathway: renderQuantPathway(),
    }[pageKey];

    root.innerHTML = `<div class="page-shell">${html}</div>`;
  }

  function renderFooter() {
    const langUi = ui[state.lang];
    const site = content.site[state.lang];

    footerRoot.innerHTML = `
      <div class="footer-panel">
        <div class="footer-brand" data-reveal>
          <span class="footer-logo">
            <img src="assets/logo.png" alt="TQF logo">
          </span>
          <div>
            <p class="panel-label">${escapeHtml(langUi.footerTitle)}</p>
            <h2 class="footer-title">${escapeHtml(site.name)}</h2>
            <p class="footer-copy">${escapeHtml(langUi.footerCopy)}</p>
          </div>
        </div>
        <div class="footer-links" data-reveal style="--delay: 100ms">
          <div class="meta-item">
            <span class="meta-label">${escapeHtml(state.lang === "th" ? "ที่อยู่" : "Address")}</span>
            <span class="meta-value">${escapeHtml(site.address)}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">${escapeHtml(state.lang === "th" ? "ติดต่อ" : "Contact")}</span>
            <a class="inline-link" href="mailto:${escapeHtml(site.email)}">${escapeHtml(site.email)}</a>
          </div>
        </div>
      </div>
    `;
  }

  function renderHome() {
    const page = content.home[state.lang];
    const langUi = ui[state.lang];
    const site = content.site[state.lang];

    return `
      ${renderHero({
        eyebrow: page.eyebrow,
        title: page.title,
        subtitle: page.subtitle,
        body: page.body,
        panelTitle: page.panelTitle,
        panelBody: page.panelBody,
        meta: [
          [state.lang === "th" ? "ที่อยู่" : "Address", site.address],
          [state.lang === "th" ? "ติดต่อ" : "Contact", site.email],
          [state.lang === "th" ? "ภาษา" : "Language", state.lang === "th" ? "ไทย / English" : "Thai / English"],
        ],
      })}

      <section class="section">
        ${renderSectionHeading(page.recentTitle, page.recentTitle, page.recentCopy)}
        <div class="activity-grid activity-grid-featured">
          ${content.activities[state.lang].items
            .slice(0, 3)
            .map((item, index) => renderFeaturedActivityCard(item, index))
            .join("")}
        </div>
      </section>

      <section class="section">
        ${renderSectionHeading(langUi.siteMap, langUi.siteMapTitle, langUi.siteMapCopy)}
        <div class="site-map-list">
          ${page.cards
            .map(
              (card, index) => `
                <a class="site-map-item" href="${card.href}" data-reveal style="--delay: ${index * 70}ms">
                  <span class="site-map-index">${pad(index + 1)}</span>
                  <div class="site-map-body">
                    <span class="card-kicker">${escapeHtml(card.kicker)}</span>
                    <h3 class="card-title">${escapeHtml(card.title)}</h3>
                    <p class="card-copy">${escapeHtml(card.copy)}</p>
                  </div>
                  <div class="site-map-action">
                    <span>${escapeHtml(langUi.openPage)}</span>
                    <span>→</span>
                  </div>
                </a>
              `,
            )
            .join("")}
        </div>
      </section>

      <section class="section">
        <div class="overview-grid">
          <figure class="image-panel" data-reveal>
            <img src="assets/hero.jpg" alt="${escapeHtml(state.lang === "th" ? "ภาพประกอบเว็บไซต์สมาคม TQF" : "TQF association website visual")}" class="section-image">
            <figcaption class="image-caption">${escapeHtml(state.lang === "th" ? "ภาพประกอบเว็บไซต์ของสมาคม" : "Association website visual")}</figcaption>
          </figure>
          <div class="content-card" data-reveal style="--delay: 110ms">
            <span class="card-kicker">${escapeHtml(langUi.headerTag)}</span>
            <h3 class="card-title">${escapeHtml(page.snapshotTitle)}</h3>
            <p class="card-copy">${escapeHtml(page.snapshotBody)}</p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="overview-grid">
          <div class="content-card inverse" data-reveal>
            <span class="card-kicker">${escapeHtml(langUi.headerTag)}</span>
            <h3 class="card-title">${escapeHtml(state.lang === "th" ? "บทบาทของสมาคม" : "Association role")}</h3>
            <p class="card-copy">${escapeHtml(state.lang === "th" ? "สมาคมมุ่งเน้นการเชื่อมโยงองค์ความรู้ เครือข่ายวิชาชีพ และการพัฒนาทักษะด้านการวิเคราะห์เชิงปริมาณและวิศวกรรมการเงิน" : "The association focuses on professional networking, knowledge exchange, and capability development in quantitative analysis and financial engineering.")}</p>
          </div>
          <div class="content-card" data-reveal style="--delay: 110ms">
            <span class="card-kicker">${escapeHtml(langUi.institutionalNote)}</span>
            <ul class="list-clean">
              <li>${escapeHtml(content.about[state.lang].vision)}</li>
              <li>${escapeHtml(state.lang === "th" ? "รองรับสองภาษาไทยและอังกฤษ" : "Supports both Thai and English site presentation.")}</li>
              <li>${escapeHtml(state.lang === "th" ? "ครอบคลุมข้อมูลสำคัญของสมาคม" : "Covers the main association information.")}</li>
            </ul>
          </div>
        </div>
      </section>
    `;
  }

  function renderActivities() {
    const page = content.activities[state.lang];
    const upcomingItems = page.items.filter((item) => isUpcomingActivity(item.date));
    const archiveItems = page.items.filter((item) => !isUpcomingActivity(item.date));

    return `
      ${renderHero({
        eyebrow: page.eyebrow,
        title: page.title,
        subtitle: page.subtitle,
        body: page.body,
        panelTitle: page.panelTitle,
        panelBody: page.panelBody,
        imageSrc: "assets/hero-activities-quant.png",
        meta: [
          [state.lang === "th" ? "รายการกิจกรรม" : "Activity items", pad(page.items.length)],
          [state.lang === "th" ? "กิจกรรมล่าสุด" : "Latest activity", formatDate(page.items[0].date)],
          [state.lang === "th" ? "เผยแพร่สองภาษา" : "Bilingual display", state.lang === "th" ? "ไทย / English" : "Thai / English"],
        ],
      })}

      <section class="section">
        ${renderSectionHeading(
          state.lang === "th" ? "กิจกรรมที่กำลังจะมาถึง" : "Upcoming Events",
          state.lang === "th" ? "รายการอีเวนต์ที่เปิดรับหรือกำหนดจัดในลำดับถัดไป" : "Events scheduled or announced for the next period",
          state.lang === "th"
            ? "ส่วนนี้ใช้แสดงกิจกรรมที่ยังไม่ถึงวันจัดงาน เพื่อให้ติดตามกำหนดการ เวลา และสถานที่ได้จากหน้าเดียว"
            : "This section highlights announced events that are still upcoming so visitors can review schedule, time, and venue in one place.",
        )}
        ${
          upcomingItems.length
            ? `
              <div class="activity-grid activity-grid-featured">
                ${upcomingItems.map((item, index) => renderFeaturedActivityCard(item, index)).join("")}
              </div>
            `
            : `
              <article class="content-card" data-reveal>
                <span class="card-kicker">${escapeHtml(state.lang === "th" ? "สถานะ" : "Status")}</span>
                <h3 class="card-title">${escapeHtml(
                  state.lang === "th" ? "ยังไม่มีประกาศกิจกรรมที่กำลังจะมาถึง" : "No upcoming events announced",
                )}</h3>
                <p class="card-copy">${escapeHtml(
                  state.lang === "th"
                    ? "ขณะนี้ยังไม่มีรายการอีเวนต์ในอนาคตจากข้อมูลกิจกรรมสาธารณะที่แสดงบนเว็บไซต์ เมื่อมีประกาศใหม่ รายการจะถูกแสดงในส่วนนี้"
                    : "There are currently no future event items in the public activity list shown on this website. New announcements will appear in this section when available.",
                )}</p>
              </article>
            `
        }
      </section>

      <section class="section">
        ${renderSectionHeading(
          state.lang === "th" ? "รายการกิจกรรม" : "Event Archive",
          state.lang === "th" ? "กิจกรรมที่ผ่านมาและรายการอีเวนต์" : "Past events and published event items",
          state.lang === "th"
            ? "หน้ากิจกรรมรวบรวมรายการอีเวนต์ในรูปแบบลิสต์ เพื่อให้ค้นหาวันที่ เวลา และสถานที่ได้สะดวก"
            : "This page keeps event items in a clean list format so date, time, and location can be reviewed quickly.",
        )}
        <div class="activity-list">
          ${archiveItems.map((item, index) => renderActivityArchiveItem(item, index)).join("")}
        </div>
      </section>
    `;
  }

  function renderCollaborators() {
    const page = content.collaborators[state.lang];

    return `
      ${renderHero({
        eyebrow: page.eyebrow,
        title: page.title,
        subtitle: page.subtitle,
        body: page.body,
        panelTitle: page.panelTitle,
        panelBody: page.panelBody,
        meta: [
          [state.lang === "th" ? "หมวดเครือข่าย" : "Network categories", pad(page.groups.length)],
          [state.lang === "th" ? "รายการทั้งหมด" : "Listed entries", pad(page.groups.reduce((sum, group) => sum + group.items.length, 0))],
          [state.lang === "th" ? "การจัดหมวด" : "Sections", state.lang === "th" ? "เพจเฟซบุ๊ก / สถาบัน / มหาวิทยาลัย / บริษัท" : "Facebook / Institute / University / Company"],
        ],
      })}

      ${page.groups
        .map(
          (group) => `
            <section class="section" id="${group.key}">
              ${renderSectionHeading(group.title, group.title, group.description)}
              <div class="card-grid">
                ${group.items
                  .map(
                    (item, index) => `
                    <a class="link-card" href="${item.href}" target="_blank" rel="noreferrer noopener" data-reveal style="--delay: ${index * 70}ms">
                      ${
                        item.logoSrc
                          ? `
                            <div class="partner-logo-wrap">
                              <img src="${item.logoSrc}" alt="${escapeHtml(item.name)} logo" class="partner-logo-image">
                            </div>
                          `
                          : ""
                      }
                      <div>
                        <span class="card-kicker">${escapeHtml(group.title)}</span>
                        <h3 class="card-title">${escapeHtml(item.name)}</h3>
                          <p class="card-copy">${escapeHtml(item.copy)}</p>
                        </div>
                        <div class="link-card-footer">
                          <span>${escapeHtml(state.lang === "th" ? "เปิดเว็บไซต์" : "Open site")}</span>
                          <span>→</span>
                        </div>
                      </a>
                    `,
                  )
                  .join("")}
              </div>
            </section>
          `,
        )
        .join("")}
    `;
  }

  function renderAcademic() {
    const page = content.academic[state.lang];

    return `
      ${renderHero({
        eyebrow: page.eyebrow,
        title: page.title,
        subtitle: page.subtitle,
        body: page.body,
        panelTitle: page.panelTitle,
        panelBody: page.panelBody,
        meta: [
          [state.lang === "th" ? "หมวดความรู้" : "Knowledge modules", pad(quantModules.length)],
          [state.lang === "th" ? "หัวข้อการเรียนรู้" : "Learning topics", pad(totalTopics)],
          [state.lang === "th" ? "ประเด็นหลัก" : "Core pillars", pad(page.pillars.length)],
        ],
      })}

      <section class="section">
        ${renderSectionHeading(
          state.lang === "th" ? "ภาพรวมวิชาการ" : "Academic Overview",
          state.lang === "th" ? "โครงสร้างองค์ความรู้ของสมาคม" : "The association knowledge structure",
          state.lang === "th"
            ? "จัดวางประเด็นวิชาการที่เกี่ยวข้องกับภารกิจของสมาคมให้อยู่ในโครงสร้างที่ใช้งานง่าย"
            : "Presents the main academic directions of the association in a structured and accessible format.",
        )}
        <div class="card-grid">
          ${page.highlights
            .map(
              (item, index) => `
                <a class="link-card" href="${item.href}" data-reveal style="--delay: ${index * 70}ms">
                  <div>
                    <span class="card-kicker">${escapeHtml(item.kicker)}</span>
                    <h3 class="card-title">${escapeHtml(item.title)}</h3>
                    <p class="card-copy">${escapeHtml(item.copy)}</p>
                  </div>
                  <div class="link-card-footer">
                    <span>${escapeHtml(ui[state.lang].openPage)}</span>
                    <span>→</span>
                  </div>
                </a>
              `,
            )
            .join("")}
        </div>
      </section>

      <section class="section">
        ${renderSectionHeading(
          state.lang === "th" ? "ประเด็นวิชาการหลัก" : "Core Academic Areas",
          state.lang === "th" ? "สามแกนหลักของการพัฒนาความรู้" : "Three central knowledge areas",
          state.lang === "th"
            ? "สรุปประเด็นสำคัญที่เป็นแกนกลางของการพัฒนาศักยภาพด้าน quantitative finance"
            : "A concise view of the knowledge areas that underpin capability development in quantitative finance.",
        )}
        <div class="pillars-grid">
          ${page.pillars
            .map(
              (item, index) => `
                <article class="content-card" data-reveal style="--delay: ${index * 80}ms">
                  <span class="card-kicker">${escapeHtml(state.lang === "th" ? "วิชาการ" : "Academic")} ${index + 1}</span>
                  <p class="card-copy">${escapeHtml(item)}</p>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>

    `;
  }

  function renderAcademicSubpage(page) {
    return `
      ${renderHero({
        eyebrow: page.eyebrow,
        title: page.title,
        subtitle: page.subtitle,
        body: page.body,
        panelTitle: state.lang === "th" ? "สรุปหน้า" : "Page Summary",
        panelBody: page.overview,
        meta: [
          [state.lang === "th" ? "หมวด" : "Section", page.title],
          [state.lang === "th" ? "ประเด็นหลัก" : "Key points", pad(page.bullets.length)],
          [state.lang === "th" ? "ภาษา" : "Language", state.lang === "th" ? "ไทย / English" : "Thai / English"],
        ],
      })}

      <section class="section">
        ${renderSectionHeading(
          state.lang === "th" ? "ภาพรวม" : "Overview",
          page.title,
          page.overview,
        )}
        <div class="overview-grid">
          <article class="content-card" data-reveal>
            <span class="card-kicker">${escapeHtml(state.lang === "th" ? "รายละเอียด" : "Details")}</span>
            <h3 class="card-title">${escapeHtml(page.title)}</h3>
            <p class="card-copy">${escapeHtml(page.overview)}</p>
          </article>
          <article class="content-card inverse" data-reveal style="--delay: 90ms">
            <span class="card-kicker">${escapeHtml(state.lang === "th" ? "ขอบเขตเนื้อหา" : "Content Scope")}</span>
            <ul class="list-clean">
              ${page.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </article>
        </div>
      </section>
    `;
  }

  function renderCareerSubpage(page) {
    return `
      ${renderHero({
        eyebrow: page.eyebrow,
        title: page.title,
        subtitle: page.subtitle,
        body: page.body,
        panelTitle: state.lang === "th" ? "สรุปหน้า" : "Page Summary",
        panelBody: page.overview,
        meta: [
          [state.lang === "th" ? "หมวด" : "Section", page.title],
          [state.lang === "th" ? "ประเด็นหลัก" : "Key points", pad(page.bullets.length)],
          [state.lang === "th" ? "ภาษา" : "Language", state.lang === "th" ? "ไทย / English" : "Thai / English"],
        ],
      })}

      <section class="section">
        ${renderSectionHeading(
          state.lang === "th" ? "ภาพรวมวิชาชีพ" : "Career Overview",
          page.title,
          page.overview,
        )}
        <div class="overview-grid">
          <article class="content-card" data-reveal>
            <span class="card-kicker">${escapeHtml(state.lang === "th" ? "ภาพรวม" : "Overview")}</span>
            <h3 class="card-title">${escapeHtml(page.title)}</h3>
            <p class="card-copy">${escapeHtml(page.overview)}</p>
          </article>
          <article class="content-card inverse" data-reveal style="--delay: 90ms">
            <span class="card-kicker">${escapeHtml(state.lang === "th" ? "ขอบเขตเนื้อหา" : "Content Scope")}</span>
            <ul class="list-clean">
              ${page.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </article>
        </div>
      </section>
    `;
  }

  function renderAbout() {
    const page = content.about[state.lang];
    const langUi = ui[state.lang];

    return `
      ${renderHero({
        eyebrow: page.eyebrow,
        title: page.title,
        subtitle: page.subtitle,
        body: page.body,
        panelTitle: page.panelTitle,
        panelBody: page.panelBody,
        meta: [
          [langUi.mission, pad(page.mission.length)],
          [langUi.strategy, pad(page.strategy.length)],
          [langUi.sourcePage, "about"],
        ],
      })}

      <section class="section">
        <div class="overview-grid">
          <figure class="image-panel emblem-panel" data-reveal>
            <img src="assets/emblem.png" alt="${escapeHtml(state.lang === "th" ? "ตราสัญลักษณ์สมาคม TQF" : "TQF association emblem")}" class="section-image emblem-image">
            <figcaption class="image-caption">${escapeHtml(state.lang === "th" ? "ตราสัญลักษณ์ของสมาคม" : "Association emblem")}</figcaption>
          </figure>
          <div class="content-card" data-reveal style="--delay: 110ms">
            <span class="card-kicker">${escapeHtml(langUi.institutionalNote)}</span>
            <h3 class="card-title">${escapeHtml(state.lang === "th" ? "อัตลักษณ์ของสมาคม" : "Association identity")}</h3>
            <p class="card-copy">${escapeHtml(state.lang === "th" ? "สมาคมนำเสนออัตลักษณ์ผ่านวิสัยทัศน์ พันธกิจ และยุทธศาสตร์ขององค์กร" : "The association identity is presented through its vision, mission, and strategic direction.")}</p>
          </div>
        </div>
      </section>

      <section class="section">
        ${renderSectionHeading(langUi.vision, page.title, state.lang === "th" ? "วิสัยทัศน์ของสมาคมถูกนำเสนอเป็นข้อความหลักที่สะท้อนบทบาทการเป็นศูนย์กลางเครือข่ายของสายงานควอนท์" : "The official vision frames TQF as a central network for knowledge exchange among quantitative finance professionals and interested participants.")}
        <div class="content-card inverse" data-reveal>
          <h3 class="section-title">${escapeHtml(page.vision)}</h3>
        </div>
      </section>

      <section class="section">
        ${renderSectionHeading(langUi.mission, state.lang === "th" ? "พันธกิจ 5 ด้านของสมาคม" : "Five mission commitments", state.lang === "th" ? "แต่ละข้อด้านล่างสะท้อนพันธกิจหลักของสมาคม" : "Each item below reflects a core mission of the association.")}
        <div class="card-grid">
          ${page.mission
            .map(
              (item, index) => `
                <article class="content-card" data-reveal style="--delay: ${index * 65}ms">
                  <span class="card-kicker">${escapeHtml(langUi.missionPoint)} ${index + 1}</span>
                  <p class="card-copy">${escapeHtml(item)}</p>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>

      <section class="section">
        ${renderSectionHeading(langUi.strategy, state.lang === "th" ? "ยุทธศาสตร์หลัก 3 ด้าน" : "Three strategic directions", state.lang === "th" ? "ข้อมูลชุดนี้สะท้อนแนวทางการพัฒนาศักยภาพ การสร้างเครือข่าย และบทบาทต่ออุตสาหกรรมการเงิน" : "These priorities focus on capability building, knowledge exchange, and a role in shaping the wider financial industry.")}
        <div class="pillars-grid">
          ${page.strategy
            .map(
              (item, index) => `
                <article class="content-card" data-reveal style="--delay: ${index * 85}ms">
                  <span class="card-kicker">${escapeHtml(langUi.priority)} ${index + 1}</span>
                  <p class="card-copy">${escapeHtml(item)}</p>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function renderTeam() {
    const page = content.team[state.lang];
    const langUi = ui[state.lang];
    const leadership = page.members.filter((member) =>
      state.lang === "th"
        ? member.role === "นายก" || member.role === "อุปนายก"
        : member.role === "President" || member.role === "Vice President",
    );
    const committee = page.members.filter((member) => !leadership.includes(member));

    return `
      ${renderHero({
        eyebrow: page.eyebrow,
        title: page.title,
        subtitle: page.subtitle,
        body: page.body,
        panelTitle: page.panelTitle,
        panelBody: page.panelBody,
        meta: [
          [langUi.committeeMembers, pad(page.members.length)],
          [langUi.leadership, pad(leadership.length)],
          [langUi.committee, pad(committee.length)],
        ],
      })}

      <section class="section">
        ${renderSectionHeading(langUi.leadership, langUi.leadershipTitle, langUi.leadershipCopy)}
        <div class="members-grid">
          ${leadership.map((member, index) => renderMemberCard(member, index)).join("")}
        </div>
      </section>

      <section class="section">
        ${renderSectionHeading(langUi.committee, langUi.committeeTitle, langUi.committeeCopy)}
        <div class="members-grid">
          ${committee
            .map((member, index) => renderMemberCard(member, leadership.length + index))
            .join("")}
        </div>
      </section>
    `;
  }

  function renderQuantPathway() {
    const page = content.quant[state.lang];
    const langUi = ui[state.lang];

    return `
      ${renderHero({
        eyebrow: page.eyebrow,
        title: page.title,
        subtitle: page.subtitle,
        body: page.body,
        panelTitle: page.panelTitle,
        panelBody: page.panelBody,
        meta: [
          [langUi.levels, pad(page.groups.length)],
          [langUi.modules, pad(quantModules.length)],
          [langUi.topics, pad(totalTopics)],
        ],
      })}

      <section class="section">
        ${renderSectionHeading(
          state.lang === "th" ? "แผนภาพเส้นทางการเรียนรู้" : "Learning Path Diagram",
          state.lang === "th" ? "ภาพรวมเส้นทาง Quant" : "Quant pathway overview",
          state.lang === "th"
            ? "แผนภาพนี้สรุปเส้นทางการเรียนรู้จากพื้นฐาน แกนหลัก ไปจนถึงความรู้เฉพาะทาง โดยใช้หัวข้อเดียวกับที่แสดงในรายการด้านล่าง"
            : "This visual summarizes the progression from foundational topics to core and specialized areas using the same subject structure shown below.",
        )}
        <figure class="image-panel pathway-diagram-panel" data-reveal>
          <img
            src="assets/quant-pathway-map.png"
            alt="${escapeHtml(
              state.lang === "th"
                ? "แผนภาพเส้นทางการเรียนรู้ด้าน Quant ของ TQF"
                : "TQF quantitative finance learning path diagram",
            )}"
            class="section-image pathway-diagram-image"
          >
          <figcaption class="image-caption">
            ${escapeHtml(
              state.lang === "th"
                ? "ภาพแผนผังสรุปลำดับการเรียนรู้จากพื้นฐาน แกนหลัก และความรู้เฉพาะทาง"
                : "A structured visual map of the pathway across foundational, core, and specialized stages.",
            )}
          </figcaption>
        </figure>
        <div class="pillars-grid pathway-stage-grid">
          ${page.groups
            .map(
              (group, index) => `
                <article class="content-card inverse pathway-stage-card" data-reveal style="--delay: ${index * 75}ms">
                  <span class="card-kicker">${escapeHtml(group.label)}</span>
                  <h3 class="card-title">${escapeHtml(group.title)}</h3>
                  <ul class="list-clean pathway-stage-list">
                    ${group.modules.map((module) => `<li>${escapeHtml(module.title)}</li>`).join("")}
                  </ul>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>

      <section class="section">
        ${renderSectionHeading(langUi.threeLevels, state.lang === "th" ? "สามระดับของเส้นทางทักษะ" : "Three layers of the pathway", state.lang === "th" ? "เส้นทางทักษะแบ่งออกเป็นพื้นฐาน แก่นหลัก และความรู้เฉพาะทาง" : "The pathway is organized into foundational, core, and specialized levels.")}
        <div class="pillars-grid">
          ${page.overview
            .map(
              (item, index) => `
                <article class="content-card" data-reveal style="--delay: ${index * 80}ms">
                  <span class="card-kicker">${escapeHtml(page.groups[index].label)}</span>
                  <h3 class="card-title">${escapeHtml(item.title)}</h3>
                  <p class="card-copy">${escapeHtml(item.description)}</p>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>

      ${page.groups
        .map(
          (group, groupIndex) => `
            <section class="section">
              <div class="group-panel">
                <div class="content-card group-heading" data-reveal>
                  <span class="card-kicker">${escapeHtml(group.label)}</span>
                  <h2 class="group-title">${escapeHtml(group.title)}</h2>
                  <p class="group-subtitle">${escapeHtml(group.description)}</p>
                </div>
                <div class="group-grid">
                  ${group.modules
                    .map(
                      (module, index) => `
                        <details class="module-card" ${groupIndex === 0 && index === 0 ? "open" : ""} data-reveal style="--delay: ${index * 70}ms">
                          <summary>
                            <h3 class="module-title">${escapeHtml(module.title)}</h3>
                            <span class="module-count">${pad(module.items.length)}</span>
                          </summary>
                          <div class="module-body">
                            <ul>
                              ${module.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                            </ul>
                          </div>
                        </details>
                      `,
                    )
                    .join("")}
                </div>
              </div>
            </section>
          `,
        )
        .join("")}
    `;
  }

  function renderBylaws() {
    const page = content.bylaws[state.lang];
    const langUi = ui[state.lang];

    return `
      ${renderHero({
        eyebrow: page.eyebrow,
        title: page.title,
        subtitle: page.subtitle,
        body: page.body,
        panelTitle: page.panelTitle,
        panelBody: page.panelBody,
        meta: [
          [langUi.bylawSections, pad(page.sections.length)],
          [state.lang === "th" ? "ประชุมใหญ่สามัญ" : "Annual meeting", state.lang === "th" ? "มีนาคม" : "March"],
          [state.lang === "th" ? "เกณฑ์แก้ไขข้อบังคับ" : "Amendment threshold", "2/3"],
        ],
      })}

      <section class="section">
        <div class="legal-highlights">
          ${[
            [
              state.lang === "th" ? "ประเภทสมาชิก" : "Membership types",
              "03",
              state.lang === "th" ? "สามัญ, วิสามัญ, กิตติมศักดิ์" : "Ordinary, associate, honorary",
            ],
            [
              state.lang === "th" ? "ประชุมใหญ่สามัญ" : "Annual general meeting",
              state.lang === "th" ? "มี.ค." : "Mar",
              state.lang === "th" ? "ต้องจัดภายในเดือนมีนาคมของทุกปี" : "Must be held within March each year",
            ],
            [
              state.lang === "th" ? "แก้ไขข้อบังคับ" : "Amendments",
              "2/3",
              state.lang === "th" ? "คะแนนเสียงไม่น้อยกว่าสองในสาม" : "Requires a two-thirds vote",
            ],
            [
              state.lang === "th" ? "เลิกสมาคม" : "Dissolution",
              "3/4",
              state.lang === "th" ? "คะแนนเสียงไม่น้อยกว่าสามในสี่" : "Requires a three-quarters vote",
            ],
          ]
            .map(
              ([label, value, copy], index) => `
                <article class="stat-card" data-reveal style="--delay: ${index * 70}ms">
                  <span class="stat-label">${escapeHtml(label)}</span>
                  <strong class="stat-value">${escapeHtml(value)}</strong>
                  <p class="card-copy">${escapeHtml(copy)}</p>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>

      <section class="section">
        <div class="legal-layout">
          <aside class="legal-card sticky" data-reveal>
            <figure class="image-panel emblem-panel compact-emblem">
              <img src="assets/emblem.png" alt="${escapeHtml(state.lang === "th" ? "ตราสัญลักษณ์สมาคม TQF" : "TQF association emblem")}" class="section-image emblem-image">
            </figure>
            <span class="card-kicker">${escapeHtml(langUi.sectionIndex)}</span>
            <h2 class="legal-title">${escapeHtml(langUi.sectionIndex)}</h2>
            <p class="legal-note">${escapeHtml(state.lang === "th" ? "เลือกดูแต่ละหมวดจากข้อบังคับที่เผยแพร่บนเว็บไซต์ TQF" : "Jump through the bylaw sections published on the official TQF website.")}</p>
            <ul class="toc-list">
              ${page.sections
                .map(
                  (section, index) => `
                    <li>
                      <a href="#${sectionId(index)}">${escapeHtml(state.lang === "th" ? section.thTitle : section.enTitle)}</a>
                    </li>
                  `,
                )
                .join("")}
            </ul>
          </aside>
          <div class="legal-stack">
            ${page.sections
              .map(
                (section, index) => `
                  <article class="legal-card" id="${sectionId(index)}" data-reveal style="--delay: ${index * 45}ms">
                    <h3 class="legal-section-title">${escapeHtml(state.lang === "th" ? section.thTitle : section.enTitle)}</h3>
                    ${
                      state.lang === "th"
                        ? `
                          <div class="legal-lines">
                            ${section.thLines.map((line) => renderLegalLine(line)).join("")}
                          </div>
                        `
                        : `
                          <div class="legal-summary">
                            <span class="card-kicker">${escapeHtml(langUi.legalSummaries)}</span>
                            <p class="card-copy">${escapeHtml(langUi.legalSummariesCopy)}</p>
                            <ul class="list-clean">
                              ${section.enSummary.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                            </ul>
                          </div>
                          <details class="module-card legal-original">
                            <summary>
                              <h4 class="module-title">${escapeHtml(langUi.bylawOriginal)}</h4>
                              <span class="module-count">TH</span>
                            </summary>
                            <div class="module-body">
                              <div class="legal-lines">
                                ${section.thLines.map((line) => renderLegalLine(line)).join("")}
                              </div>
                            </div>
                          </details>
                        `
                    }
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderHero({ eyebrow, title, subtitle, body, panelTitle = "", panelBody = "", meta = [] }) {
    return `
      <section class="hero">
        <article class="hero-panel" data-reveal>
          <span class="hero-watermark">TQF</span>
          <div class="hero-layout">
            <div class="hero-copy">
              <span class="eyebrow">${escapeHtml(eyebrow)}</span>
              <h1 class="display-title">${escapeHtml(title)}</h1>
              <p class="display-subtitle">${escapeHtml(subtitle)}</p>
              <p class="lead">${escapeHtml(body)}</p>
              <div class="hero-actions">
                <a class="primary-button" href="mailto:${escapeHtml(content.site[state.lang].email)}">
                  ${escapeHtml(state.lang === "th" ? "อีเมลติดต่อ" : "Email contact")}
                </a>
                <a class="secondary-button" href="team.html">
                  ${escapeHtml(state.lang === "th" ? "ดูคณะกรรมการ" : "View committee")}
                </a>
              </div>
            </div>
            ${
              panelTitle || meta.length
                ? `
                  <aside class="side-panel hero-summary" data-reveal style="--delay: 90ms">
                    <span class="panel-label">${escapeHtml(state.lang === "th" ? "ข้อมูลสรุป" : "Summary")}</span>
                    ${panelTitle ? `<h2 class="panel-title">${escapeHtml(panelTitle)}</h2>` : ""}
                    ${
                      meta.length
                        ? `
                          <div class="meta-list hero-meta-list">
                            ${meta
                              .map(
                                ([label, value]) => `
                                  <div class="meta-item">
                                    <span class="meta-label">${escapeHtml(label)}</span>
                                    <span class="meta-value">${escapeHtml(value)}</span>
                                  </div>
                                `,
                              )
                              .join("")}
                          </div>
                        `
                        : ""
                    }
                  </aside>
                `
                : ""
            }
          </div>
        </article>
      </section>
    `;
  }

  function renderArticles() {
    const page = content.articles[state.lang];

    return `
      ${renderHero({
        eyebrow: page.eyebrow,
        title: page.title,
        subtitle: page.subtitle,
        body: page.body,
        panelTitle: state.lang === "th" ? "สรุปหน้า" : "Page Summary",
        panelBody: page.overview,
        meta: [
          [state.lang === "th" ? "จำนวนบทความ" : "Articles", pad(page.items.length)],
          [state.lang === "th" ? "รูปแบบ" : "Format", state.lang === "th" ? "บทความบนเว็บไซต์" : "On-site articles"],
          [state.lang === "th" ? "ภาษา" : "Language", state.lang === "th" ? "ไทย / English" : "Thai / English"],
        ],
      })}

      <section class="section">
        ${renderSectionHeading(
          state.lang === "th" ? "สารบัญบทความ" : "Article Index",
          page.title,
          page.overview,
        )}
        <div class="article-index-grid">
          ${page.items
            .map(
              (item, index) => `
                <a class="link-card" href="#${item.id}" data-reveal style="--delay: ${index * 80}ms">
                  ${
                    item.imageSrc
                      ? `
                        <div class="article-index-image-frame">
                          <img src="${item.imageSrc}" alt="${escapeHtml(item.title)}" class="article-index-image">
                        </div>
                      `
                      : ""
                  }
                  <div>
                    <span class="card-kicker">${escapeHtml(item.kicker)}</span>
                    <h3 class="card-title">${escapeHtml(item.title)}</h3>
                    <p class="card-copy">${escapeHtml(item.summary)}</p>
                  </div>
                  <div class="link-card-footer">
                    <span>${escapeHtml(state.lang === "th" ? "อ่านบทความ" : "Read article")}</span>
                    <span>→</span>
                  </div>
                </a>
              `,
            )
            .join("")}
        </div>
      </section>

      ${page.items
        .map(
          (item, index) => `
            <section class="section" id="${item.id}">
              ${renderSectionHeading(item.kicker, item.title, item.summary)}
              <div class="article-layout">
                <article class="content-card article-card" data-reveal style="--delay: ${index * 70}ms">
                  ${
                    item.imageSrc
                      ? `
                        <div class="article-cover-frame">
                          <img src="${item.imageSrc}" alt="${escapeHtml(item.title)}" class="article-cover-image">
                        </div>
                      `
                      : ""
                  }
                  <span class="card-kicker">${escapeHtml(state.lang === "th" ? "เนื้อหาบทความ" : "Article")}</span>
                  ${item.paragraphs
                    .map((paragraph) => `<p class="article-paragraph">${escapeHtml(paragraph)}</p>`)
                    .join("")}
                </article>
                <aside class="content-card inverse article-sidebar" data-reveal style="--delay: ${index * 70 + 90}ms">
                  <span class="card-kicker">${escapeHtml(state.lang === "th" ? "ประเด็นสำคัญ" : "Key Points")}</span>
                  <ul class="list-clean">
                    ${item.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}
                  </ul>
                  <a class="article-source-link" href="${item.sourceHref}" target="_blank" rel="noreferrer noopener">
                    ${escapeHtml(state.lang === "th" ? `แหล่งที่มา: ${item.sourceLabel}` : `Source: ${item.sourceLabel}`)}
                  </a>
                </aside>
              </div>
            </section>
          `,
        )
        .join("")}
    `;
  }

  function renderBookSeries() {
    const page = content.bookSeries[state.lang];

    return `
      ${renderHero({
        eyebrow: page.eyebrow,
        title: page.title,
        subtitle: page.subtitle,
        body: page.body,
        panelTitle: state.lang === "th" ? "สรุปหน้า" : "Page Summary",
        panelBody: page.overview,
        meta: [
          [state.lang === "th" ? "จำนวนเล่ม" : "Volumes", pad(page.publications.length)],
          [state.lang === "th" ? "แหล่งอ้างอิง" : "Source", "Quant Pathway"],
          [state.lang === "th" ? "รูปแบบ" : "Format", "PDF download"],
        ],
      })}

      <section class="section">
        ${renderSectionHeading(
          state.lang === "th" ? "ชุดหนังสือดาวน์โหลด" : "Downloadable Series",
          page.title,
          page.overview,
        )}
        <div class="publication-grid">
          ${page.publications
            .map(
              (item, index) => `
                <article class="publication-card" data-reveal style="--delay: ${index * 90}ms">
                  <img src="${item.coverSrc}" alt="${escapeHtml(item.title)} cover" class="publication-cover">
                  <div class="publication-body">
                    <span class="card-kicker">${escapeHtml(item.kicker)}</span>
                    <h3 class="card-title">${escapeHtml(item.title)}</h3>
                    <p class="card-copy">${escapeHtml(item.description)}</p>
                    <div class="publication-meta">
                      <span>${escapeHtml(item.format)}</span>
                      <span>${escapeHtml(state.lang === "th" ? "อ้างอิงจาก TQF Quant Pathway" : "Based on TQF Quant Pathway")}</span>
                    </div>
                    <div class="publication-actions">
                      <a class="primary-button" href="${item.downloadHref}" download>
                        ${escapeHtml(state.lang === "th" ? "ดาวน์โหลด PDF" : "Download PDF")}
                      </a>
                      <a class="secondary-button" href="${item.onlineHref}">
                        ${escapeHtml(state.lang === "th" ? "อ่านหน้าเนื้อหา" : "Read source page")}
                      </a>
                    </div>
                    <a class="publication-source" href="${item.sourceHref}" target="_blank" rel="noreferrer noopener">
                      ${escapeHtml(state.lang === "th" ? "แหล่งที่มา: TQF Quant Pathway" : "Source: TQF Quant Pathway")}
                    </a>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function renderPublicationPage(page) {
    return `
      ${renderHero({
        eyebrow: page.eyebrow,
        title: page.title,
        subtitle: page.subtitle,
        body: page.body,
        panelTitle: state.lang === "th" ? "สรุปหน้า" : "Page Summary",
        panelBody: page.overview,
        meta: [
          [state.lang === "th" ? "อัปเดตล่าสุด" : "Recent update", page.recentMeta[0][1]],
          [state.lang === "th" ? "รายการแนะนำ" : "Featured items", pad(page.showcase.length)],
          [state.lang === "th" ? "ภาษา" : "Language", state.lang === "th" ? "ไทย / English" : "Thai / English"],
        ],
      })}

      <section class="section">
        ${renderSectionHeading(page.recentTitle, page.recentHeadline, page.recentCopy)}
        <div class="overview-grid">
          <article class="content-card" data-reveal>
            <span class="card-kicker">${escapeHtml(state.lang === "th" ? "อัปเดต" : "Update")}</span>
            <h3 class="card-title">${escapeHtml(page.recentHeadline)}</h3>
            <p class="card-copy">${escapeHtml(page.recentCopy)}</p>
          </article>
          <aside class="content-card inverse" data-reveal style="--delay: 90ms">
            <span class="card-kicker">${escapeHtml(state.lang === "th" ? "ข้อมูลกำกับ" : "Details")}</span>
            <div class="meta-list">
              ${page.recentMeta
                .map(
                  ([label, value]) => `
                    <div class="meta-item">
                      <span class="meta-label">${escapeHtml(label)}</span>
                      <span class="meta-value">${escapeHtml(value)}</span>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </aside>
        </div>
      </section>

      <section class="section">
        ${renderSectionHeading(
          state.lang === "th" ? "ฉบับแนะนำ" : "Featured Showcase",
          page.title,
          page.overview,
        )}
        <div class="publication-grid">
          ${page.showcase
            .map(
              (item, index) => `
                <article class="publication-card" data-reveal style="--delay: ${index * 90}ms">
                  <img src="${item.coverSrc}" alt="${escapeHtml(item.title)} cover" class="publication-cover">
                  <div class="publication-body">
                    <span class="card-kicker">${escapeHtml(item.kicker)}</span>
                    <h3 class="card-title">${escapeHtml(item.title)}</h3>
                    <p class="card-copy">${escapeHtml(item.description)}</p>
                    <div class="publication-meta">
                      <span>${escapeHtml(item.sourceLabel)}</span>
                      <span>${escapeHtml(state.lang === "th" ? "อัปเดตบนเว็บไซต์" : "Published on site")}</span>
                    </div>
                    <div class="publication-actions">
                      <a class="primary-button" href="${item.primaryHref}">
                        ${escapeHtml(item.primaryLabel)}
                      </a>
                      <a class="secondary-button" href="${item.secondaryHref}">
                        ${escapeHtml(item.secondaryLabel)}
                      </a>
                    </div>
                    <a class="publication-source" href="${item.sourceHref}" target="_blank" rel="noreferrer noopener">
                      ${escapeHtml(state.lang === "th" ? `แหล่งที่มา: ${item.sourceLabel}` : `Source: ${item.sourceLabel}`)}
                    </a>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function renderSectionHeading(eyebrow, title, copy) {
    return `
      <div class="section-heading" data-reveal>
        <span class="eyebrow">${escapeHtml(eyebrow)}</span>
        <h2 class="section-title">${escapeHtml(title)}</h2>
        <p class="section-copy">${escapeHtml(copy)}</p>
      </div>
    `;
  }

  function renderFeaturedActivityCard(item, index) {
    return `
      <a class="activity-card activity-card-featured" href="${item.href}" data-reveal style="--delay: ${index * 70}ms">
        <div class="activity-image-frame">
          <img src="${item.imageSrc || heroImagePlaceholder}" alt="${escapeHtml(item.title)}" class="activity-image">
        </div>
        <div class="activity-meta">
          <span class="card-kicker">${escapeHtml(item.category)}</span>
          <span class="activity-date">${escapeHtml(formatDate(item.date))}</span>
        </div>
        <div class="activity-body">
          <h3 class="card-title">${escapeHtml(item.title)}</h3>
          <p class="card-copy">${escapeHtml(item.copy)}</p>
        </div>
        <div class="activity-footer">
          ${renderActivityMetaPill("time", item.time)}
          ${renderActivityMetaPill("map", item.location)}
        </div>
      </a>
    `;
  }

  function renderActivityArchiveItem(item, index) {
    return `
      <a class="activity-card activity-card-archive" href="${item.href}" data-reveal style="--delay: ${index * 70}ms">
        <div class="activity-archive-main">
          <div class="activity-meta">
            <span class="card-kicker">${escapeHtml(item.category)}</span>
            <span class="activity-date">${escapeHtml(formatDate(item.date))}</span>
          </div>
          <div class="activity-body">
            <h3 class="card-title">${escapeHtml(item.title)}</h3>
            <p class="card-copy">${escapeHtml(item.copy)}</p>
          </div>
        </div>
        <div class="activity-archive-side">
          <div class="activity-footer">
            ${renderActivityMetaPill("time", item.time)}
            ${renderActivityMetaPill("map", item.location)}
          </div>
          <div class="link-card-footer">
            <span>${escapeHtml(ui[state.lang].openPage)}</span>
            <span>→</span>
          </div>
        </div>
      </a>
    `;
  }

  function renderActivityMetaPill(type, value) {
    if (!value) {
      return "";
    }

    return `
      <span class="activity-info-pill">
        <span class="activity-info-icon" aria-hidden="true">${type === "time" ? timeIcon() : mapPinIcon()}</span>
        <span>${escapeHtml(value)}</span>
      </span>
    `;
  }

  function isUpcomingActivity(dateValue) {
    return new Date(`${dateValue}T23:59:59`).getTime() >= Date.now();
  }

  function timeIcon() {
    return `
      <svg viewBox="0 0 24 24" focusable="false">
        <circle cx="12" cy="12" r="8.5"></circle>
        <path d="M12 7.5v5l3.2 2"></path>
      </svg>
    `;
  }

  function mapPinIcon() {
    return `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M12 20c3.7-4.4 5.5-7.3 5.5-10a5.5 5.5 0 1 0-11 0c0 2.7 1.8 5.6 5.5 10Z"></path>
        <circle cx="12" cy="10" r="2.1"></circle>
      </svg>
    `;
  }

  function renderMemberCard(member, index) {
    const visual = member.imageSrc
      ? `<img src="${member.imageSrc}" alt="${escapeHtml(member.name)}" class="member-photo">`
      : member.initials
        ? `<div class="member-avatar-placeholder">${escapeHtml(member.initials)}</div>`
        : `
            <div class="member-avatar-placeholder" aria-hidden="true">
              <svg viewBox="0 0 24 24" class="member-avatar-icon" focusable="false">
                <circle cx="12" cy="8" r="4.2"></circle>
                <path d="M5.2 19.4c1.4-3.3 4-4.9 6.8-4.9s5.4 1.6 6.8 4.9"></path>
              </svg>
            </div>
          `;

    return `
      <article class="member-card" data-reveal style="--delay: ${(index % 3) * 70}ms">
        <div class="member-media">
          ${visual}
        </div>
        <div class="member-role">${escapeHtml(member.role)}</div>
        <h3 class="member-name">${escapeHtml(member.name)}</h3>
        <p class="member-meta">
          ${member.qualifications ? `${escapeHtml(state.lang === "th" ? "คุณวุฒิ" : "Qualifications")}: ${escapeHtml(member.qualifications)}` : escapeHtml(ui[state.lang].qualificationsMissing)}
        </p>
      </article>
    `;
  }

  function renderLegalLine(line) {
    const cssClass = [
      "legal-line",
      line.startsWith("ข้อ ") ? "legal-article" : "",
      /^\d+\.\d+/.test(line) ? "legal-subpoint" : "",
      /^ลงชื่อ|^นาย/.test(line) ? "legal-signature" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return `<p class="${cssClass}">${escapeHtml(line)}</p>`;
  }

  function bindInteractions() {
    const toggle = document.getElementById("menu-toggle-control");
    const nav = document.getElementById("site-nav");
    const dropdowns = Array.from(document.querySelectorAll(".nav-dropdown-panel"));

    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const isOpen = document.body.classList.toggle("menu-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
        if (!isOpen) {
          dropdowns.forEach((dropdown) => {
            dropdown.removeAttribute("open");
          });
        }
      });

      nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          document.body.classList.remove("menu-open");
          toggle.setAttribute("aria-expanded", "false");
          dropdowns.forEach((dropdown) => {
            dropdown.removeAttribute("open");
          });
        });
      });
    }

    if (closeDropdownListener) {
      document.removeEventListener("click", closeDropdownListener);
    }

    if (dropdowns.length) {
      closeDropdownListener = (event) => {
        dropdowns.forEach((dropdown) => {
          if (!dropdown.contains(event.target)) {
            dropdown.removeAttribute("open");
          }
        });
      };

      document.addEventListener("click", closeDropdownListener);
    } else {
      closeDropdownListener = null;
    }

    document.querySelectorAll("[data-lang]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextLang = button.getAttribute("data-lang");
        if (nextLang && nextLang !== state.lang) {
          state.lang = nextLang;
          localStorage.setItem("tqf-language", nextLang);
          render();
        }
      });
    });

    window.onresize = handleResize;
  }

  function handleResize() {
    if (window.innerWidth > 900) {
      document.body.classList.remove("menu-open");
      document.querySelectorAll(".nav-dropdown-panel").forEach((dropdown) => {
        dropdown.removeAttribute("open");
      });
    }
  }

  function revealOnScroll() {
    const items = document.querySelectorAll("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );

    items.forEach((item) => observer.observe(item));
  }

  function sectionId(index) {
    return `section-${index + 1}`;
  }

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function formatDate(value) {
    const locale = state.lang === "th" ? "th-TH-u-ca-gregory" : "en-US";
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(`${value}T12:00:00`));
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
})();
