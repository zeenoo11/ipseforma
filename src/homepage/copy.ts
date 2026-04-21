export type Lang = "en" | "ko";

export interface HeroTitle {
  a: string;
  amp: string;
  b: string;
}

export interface Tenet {
  n: string;
  t: string;
  s: string;
}

export interface BlogPost {
  no: string;
  date: string;
  readMin: number;
  tag: string;
  title: string;
  dek: string;
  slug: string;
}

export interface NowItem {
  k: string;
  v: string;
}

export interface Copy {
  brand: string;
  nav: { philosophy: string; apps: string; blog: string; contact: string };
  heroEyebrow: string;
  heroTitles: HeroTitle[];
  heroLead: string;
  heroAside: string;
  scrollHint: string;

  philosophyEyebrow: string;
  philosophyTitle: string;
  philosophyTitleEm: string;
  philosophyBody: string[];
  tenets: Tenet[];

  appsEyebrow: string;
  appsTitle: string;
  appsTitleEm: string;
  appsIntro: string;

  blogEyebrow: string;
  blogTitle: string;
  blogTitleEm: string;
  blogBody: string;
  blogCta: string;
  blogDomain: string;
  blogRecentLabel: string;
  blogReadLabel: string;
  blogPosts: BlogPost[];

  contactEyebrow: string;
  contactTitle: string;
  contactTitleEm: string;
  contactBody: string;
  email: string;

  colophon: string;
  copyright: string;

  nowLabel: string;
  nowItems: NowItem[];
  localTime: string;
}

export const COPY: Record<Lang, Copy> = {
  en: {
    brand: "ipseforma",
    nav: { philosophy: "Philosophy", apps: "Apps", blog: "Blog", contact: "Contact" },
    heroEyebrow: "Vol. I — Portfolio of a self in formation",
    heroTitles: [
      { a: "Ipse", amp: " + ", b: "Forma" },
      { a: "A self,", amp: " ", b: "in formation." },
      { a: "To shape", amp: " ", b: "what I am." },
      { a: "Find", amp: " ", b: "yourself." },
    ],
    heroLead:
      "ipse (the self) + forma (to shape). A quiet room for the long work of becoming someone — a place to trace temperaments, values, pastimes, and the questions that won't leave.",
    heroAside: "Est. MMXXVI — Daegu, Republic of Korea",
    scrollHint: "Read on",

    philosophyEyebrow: "§01 — Philosophy",
    philosophyTitle: "A person is not a fixed thing,",
    philosophyTitleEm: "but a sentence still being written.",
    philosophyBody: [
      "I don't believe in fixed identity. I believe in rehearsal — in the small, daily work of choosing what to keep and what to put down. The self is not discovered; it is drafted, corrected, drafted again.",
      "This site is a desk for that drafting. Essays grow slowly. Small apps are built to answer specific questions. A reading list admits what I am paying attention to. Nothing is finished, and that is the point.",
    ],
    tenets: [
      { n: "i.", t: "Think in decades, act in hours.", s: "Long arcs deserve small, honest days." },
      { n: "ii.", t: "Make the thing you wish existed.", s: "A tool is a theory made specific." },
      { n: "iii.", t: "Beauty is a form of rigor.", s: "Clarity is a kindness to other people." },
      { n: "iv.", t: "Hold your conclusions lightly.", s: "Revise freely; certainty ages badly." },
    ],

    appsEyebrow: "§02 — Applications",
    appsTitle: "Small tools,",
    appsTitleEm: "thought in public.",
    appsIntro:
      "Each app is a private question made public — an experiment in whether a specific idea holds up when it has to run.",

    blogEyebrow: "§02 — Writing",
    blogTitle: "Essays,",
    blogTitleEm: "as they are written.",
    blogBody:
      "Longer pieces live on a separate imprint. Subjects come and go — philosophy of mind, the craft of tools, the strange economics of attention — usually late at night, always in prose.",
    blogCta: "All writing",
    blogDomain: "blog.ipseforma.com",
    blogRecentLabel: "Recent",
    blogReadLabel: "Read",
    blogPosts: [
      {
        no: "No. 07",
        date: "April 18, 2026",
        readMin: 9,
        tag: "Philosophy",
        title: "On being a draft",
        dek: "If the self is rehearsal, then failure is not the opposite of practice — it is practice's native tense.",
        slug: "on-being-a-draft",
      },
      {
        no: "No. 06",
        date: "April 02, 2026",
        readMin: 14,
        tag: "Tools",
        title: "Small tools as private theories",
        dek: "A tool is a guess about what a day should feel like. Build the guess. Live in it. Revise.",
        slug: "small-tools-private-theories",
      },
      {
        no: "No. 05",
        date: "March 21, 2026",
        readMin: 6,
        tag: "Attention",
        title: "The strange economics of notice",
        dek: "You do not spend attention — you place it, and it grows what it touches. The bill arrives later, in character.",
        slug: "economics-of-notice",
      },
    ],

    contactEyebrow: "§03 — Correspondence",
    contactTitle: "Write,",
    contactTitleEm: "if any of this lands.",
    contactBody:
      "I answer slowly and honestly. Unsolicited kindness, considered disagreement, or an odd question — all welcome.",
    email: "connect@ipseforma.com",

    colophon:
      "Set in Cormorant Garamond and Newsreader, with JetBrains Mono for marginalia. Handmade in HTML; revised often.",
    copyright: "© MMXXVI ipseforma. All words provisional.",

    nowLabel: "Now",
    nowItems: [
      { k: "Reading", v: "Marcus Aurelius, Meditations (rev.)" },
      { k: "Building", v: "ipseforma v0.3 — this page" },
      { k: "Listening", v: "Nils Frahm · All Melody" },
      { k: "Thinking", v: "How much of a self is a rehearsal?" },
    ],
    localTime: "Local time",
  },

  ko: {
    brand: "ipseforma",
    nav: { philosophy: "철학", apps: "앱", blog: "블로그", contact: "연락" },
    heroEyebrow: "Vol. I — 형성 중인 자아의 포트폴리오",
    heroTitles: [
      { a: "Ipse", amp: " + ", b: "Forma" },
      { a: "형성 중인", amp: " ", b: "자아." },
      { a: "나를", amp: " ", b: "빚는 일." },
      { a: "너 자신을", amp: " ", b: "찾을 것." },
    ],
    heroLead:
      "ipse(자아) + forma(형성). 무언가가 되어가는 긴 노동을 위한 조용한 방 — 기질과 가치관, 취미, 떠나지 않는 질문들을 따라가는 장소입니다.",
    heroAside: "MMXXVI 년 — 대한민국, 대구",
    scrollHint: "계속 읽기",

    philosophyEyebrow: "§01 — 철학",
    philosophyTitle: "사람은 고정된 것이 아니라,",
    philosophyTitleEm: "여전히 쓰여지고 있는 문장이다.",
    philosophyBody: [
      "나는 고정된 정체성을 믿지 않는다. 다만 매일의 연습을 믿는다 — 무엇을 남기고 무엇을 내려놓을지 매일 작게 고르는 일. 자아는 발견되는 것이 아니라, 초고가 쓰이고, 고쳐지고, 다시 쓰여진다.",
      "이 사이트는 그 초고를 위한 책상이다. 에세이는 천천히 자라고, 작은 앱은 특정한 질문에 답하려 만들어지고, 독서 목록은 지금 내 주의가 어디에 있는지 고백한다. 어느 것도 완성되지 않았고, 그게 요점이다.",
    ],
    tenets: [
      { n: "i.", t: "수십 년 단위로 생각하되, 시간 단위로 움직일 것.", s: "긴 호흡은 정직한 하루들에서 자란다." },
      { n: "ii.", t: "스스로 필요하다 여긴 것을 만들 것.", s: "도구는 구체화된 이론이다." },
      { n: "iii.", t: "아름다움은 엄밀함의 한 형태.", s: "명료함은 타인을 향한 친절이다." },
      { n: "iv.", t: "결론은 가볍게 쥘 것.", s: "자유롭게 고쳐 쓸 것. 확신은 잘 늙지 않는다." },
    ],

    appsEyebrow: "§02 — 앱",
    appsTitle: "작은 도구,",
    appsTitleEm: "공개된 사고.",
    appsIntro: "각 앱은 사적인 질문을 공개한 것이다 — 구체적인 아이디어가 실제로 굴릴 때 버티는지 시험한다.",

    blogEyebrow: "§02 — 글",
    blogTitle: "에세이,",
    blogTitleEm: "쓰여지는 그대로.",
    blogBody:
      "긴 글은 별도의 임프린트에 머문다. 주제는 오간다 — 정신의 철학, 도구의 기예, 주의의 이상한 경제학 — 대개 늦은 밤, 언제나 산문으로.",
    blogCta: "전체 글 보기",
    blogDomain: "blog.ipseforma.com",
    blogRecentLabel: "최근 글",
    blogReadLabel: "읽기",
    blogPosts: [
      {
        no: "No. 07",
        date: "2026년 4월 18일",
        readMin: 9,
        tag: "철학",
        title: "초고로 존재한다는 것",
        dek: "자아가 연습이라면, 실패는 연습의 반대가 아니라 연습의 모국어다.",
        slug: "on-being-a-draft",
      },
      {
        no: "No. 06",
        date: "2026년 4월 2일",
        readMin: 14,
        tag: "도구",
        title: "작은 도구, 사적인 이론",
        dek: "도구는 '하루가 어떤 감각이어야 하는가'에 대한 추측이다. 만들고, 살아보고, 고쳐라.",
        slug: "small-tools-private-theories",
      },
      {
        no: "No. 05",
        date: "2026년 3월 21일",
        readMin: 6,
        tag: "주의",
        title: "주목의 이상한 경제학",
        dek: "주의는 쓰는 것이 아니라 두는 것이다. 두면 그 자리가 자란다. 청구서는 나중에, 인격의 형태로 온다.",
        slug: "economics-of-notice",
      },
    ],

    contactEyebrow: "§03 — 서신",
    contactTitle: "닿는 것이 있다면,",
    contactTitleEm: "편지를 주세요.",
    contactBody: "느리고 정직하게 답합니다. 무심한 친절도, 신중한 이견도, 이상한 질문도 — 모두 환영.",
    email: "connect@ipseforma.com",

    colophon: "Cormorant Garamond와 Newsreader, 주석엔 JetBrains Mono. HTML로 손수 지음 — 자주 고쳐 씀.",
    copyright: "© MMXXVI ipseforma. 모든 단어는 잠정적.",

    nowLabel: "현재",
    nowItems: [
      { k: "읽는 중", v: "마르쿠스 아우렐리우스, 명상록 (재독)" },
      { k: "만드는 중", v: "ipseforma v0.3 — 이 페이지" },
      { k: "듣는 중", v: "Nils Frahm · All Melody" },
      { k: "생각 중", v: "자아의 얼마만큼이 연습일까?" },
    ],
    localTime: "현지 시각",
  },
};
