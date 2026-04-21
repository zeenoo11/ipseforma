export type Lang = "en" | "ko";

export interface HeroTitle {
  a: string;
  amp: string;
  b: string;
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

export interface Copy {
  brand: string;
  nav: { philosophy: string; blog: string; contact: string };
  heroEyebrow: string;
  heroTitles: HeroTitle[];
  heroLead: string;
  heroAside: string;
  scrollHint: string;

  philosophyEyebrow: string;
  philosophyTitle: string;
  philosophyTitleEm: string;
  philosophyBody: string[];

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

  localTime: string;
}

export const COPY: Record<Lang, Copy> = {
  en: {
    brand: "ipseforma",
    nav: { philosophy: "Philosophy", blog: "Blog", contact: "Contact" },
    heroEyebrow: "A space for shaping the self",
    heroTitles: [
      { a: "Ipse", amp: " + ", b: "Forma" },
      { a: "Find", amp: " ", b: "yourself." },
      { a: "A space", amp: " ", b: "for the self." },
      { a: "Shape", amp: " ", b: "yourself." },
    ],
    heroLead:
      "ipse (the self) + forma (to shape) — a space for shaping the self.",
    heroAside: "",
    scrollHint: "Read on",

    philosophyEyebrow: "§01 — About this space",
    philosophyTitle: "A place for finding",
    philosophyTitleEm: "what matters — slowly.",
    philosophyBody: [
      "ipseforma is a quiet room for noticing — the values that keep surfacing, the tastes that take shape over years, the small moments worth holding on to.",
      "Nothing here is a manifesto. It is a space where those discoveries can be written down, revisited, and revised.",
    ],

    blogEyebrow: "§02 — Writing",
    blogTitle: "Writing",
    blogTitleEm: "",
    blogBody: "",
    blogCta: "All writing",
    blogDomain: "blog.ipseforma.com",
    blogRecentLabel: "Recent",
    blogReadLabel: "Read",
    blogPosts: [],

    contactEyebrow: "§03 — Contact",
    contactTitle: "Contact",
    contactTitleEm: "",
    contactBody: "",
    email: "",

    colophon: "",
    copyright: "© MMXXVI ipseforma",

    localTime: "Local time",
  },

  ko: {
    brand: "ipseforma",
    nav: { philosophy: "철학", blog: "블로그", contact: "연락" },
    heroEyebrow: "자아를 형성하는 공간",
    heroTitles: [
      { a: "Ipse", amp: " + ", b: "Forma" },
      { a: "자아를", amp: " ", b: "형성하다." },
      { a: "스스로를", amp: " ", b: "빚는 공간." },
      { a: "나를", amp: " ", b: "찾다." },
    ],
    heroLead: "ipse(자아) + forma(형성) — 자아를 형성하는 공간입니다.",
    heroAside: "",
    scrollHint: "계속 읽기",

    philosophyEyebrow: "§01 — 이 공간에 대하여",
    philosophyTitle: "가치관과 취향을,",
    philosophyTitleEm: "중요한 순간들을 발견하는 곳.",
    philosophyBody: [
      "ipseforma는 알아차림을 위한 조용한 방입니다 — 반복해서 떠오르는 가치관, 해를 거듭하며 자리잡는 취향, 놓치고 싶지 않은 작은 순간들.",
      "선언이 아니라, 그런 발견들을 적어두고 다시 들여다보며 고쳐 쓸 수 있는 공간입니다.",
    ],

    blogEyebrow: "§02 — 글",
    blogTitle: "글",
    blogTitleEm: "",
    blogBody: "",
    blogCta: "전체 글 보기",
    blogDomain: "blog.ipseforma.com",
    blogRecentLabel: "최근 글",
    blogReadLabel: "읽기",
    blogPosts: [],

    contactEyebrow: "§03 — 연락",
    contactTitle: "연락",
    contactTitleEm: "",
    contactBody: "",
    email: "",

    colophon: "",
    copyright: "© MMXXVI ipseforma",

    localTime: "현지 시각",
  },
};
