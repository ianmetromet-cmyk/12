import { FormEvent, useEffect, useMemo, useState } from "react";

type Language = "en" | "es";

type Campaign = {
  id: string;
  title: string;
  category: string[];
  sector: string;
  role: string[];
  scope: string[];
  outcome: string[];
  summary: string;
  image: string;
  accent: string;
};

type MediaItem = {
  id: string;
  title: string;
  outlet: string;
  type: string;
  summary: string;
  image: string;
  details: string[];
  href?: string;
};

type OpEd = {
  id: string;
  title: string;
  outlet: string;
  year: string;
  category: string;
  byline: string;
  excerpt: string;
  thesis: string;
  whyItMattered: string[];
};

type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  image: string;
};

type ModalItem = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  bullets: string[];
  href?: string;
  hrefLabel?: string;
};

const copy = {
  en: {
    navCampaigns: "Campaigns",
    navMedia: "Media",
    navOpEds: "Op-eds",
    navProfile: "Profile",
    navContact: "Contact",
    role: "Senior Communications Strategist",
    heroTop: "Labor, racial justice, and public-interest communications",
    heroLine1: "Driving",
    heroLine2: "Narratives.",
    heroLine3: "Winning",
    heroLine4: "Campaigns.",
    heroBody:
      "A senior strategist shaping earned media, documentary storytelling, bilingual communications, and public-policy narratives for high-stakes labor and justice campaigns.",
    heroPrimary: "Get in touch",
    heroSecondary: "View strategy",
    heroCardLabel: "Current focus",
    heroCardTitle: "Frontline stories that move public opinion and decision-makers.",
    heroCardBody:
      "From city halls and county chambers to clinics, libraries, and work sites, the work centers the people most affected—and gives campaigns a narrative architecture strong enough to win.",
    impactTitle: "Impact at a glance",
    campaignTitle: "Strategic campaigns",
    campaignSearch: "Search campaigns…",
    mediaTitle: "Media coverage",
    mediaSearch: "Search media coverage…",
    opEdTitle: "Op-eds",
    opEdSearch: "Search op-eds…",
    opEdPanelTitle: "Editorial preview",
    galleryTitle: "Field documentation",
    galleryBody:
      "A swipeable gallery of documentary-style imagery that reflects the editorial tone, urgency, and human-centered framing behind the work.",
    profileTitle: "Profile",
    competenciesTitle: "Competencies",
    contactTitle: "Let's build your narrative.",
    contactBody:
      "Available for strategic communications consulting, campaign messaging, earned media architecture, documentary production, and bilingual public affairs work.",
    contactPrimary: "Send message",
    contactSecondary: "Email directly",
    contactFormName: "Name",
    contactFormEmail: "Email",
    contactFormOrg: "Organization",
    contactFormMessage: "Tell me about the campaign, timeline, and what you need.",
    contactNote: "This form opens your email client with a pre-filled draft.",
    statLabels: [
      "Verified audience reach",
      "Strike authorization success",
      "Engagement & conversion",
      "Impacted workforce members",
    ],
    sectionCampaigns: "01",
    sectionMedia: "02",
    sectionOpEds: "03",
    sectionProfile: "04",
    all: "All",
    healthcare: "Healthcare",
    publicServices: "Public services",
    labor: "Labor",
    article: "Article",
    broadcast: "Broadcast",
    audio: "Audio",
    video: "Video",
    analysis: "Analysis",
    investigation: "Investigation",
    policy: "Policy",
    editorial: "Editorial",
    openPreview: "Open preview",
    readMore: "Read more",
    viewDetails: "View details",
    notablePlacements: "Notable placements",
    linkedin: "Connect on LinkedIn",
    backToTop: "Top",
    languageLabel: "[ES]",
    close: "Close",
  },
  es: {
    navCampaigns: "Campañas",
    navMedia: "Prensa",
    navOpEds: "Análisis",
    navProfile: "Perfil",
    navContact: "Contacto",
    role: "Estratega Senior de Comunicaciones",
    heroTop: "Comunicaciones laborales, justicia racial e interés público",
    heroLine1: "Impulsando",
    heroLine2: "Narrativas.",
    heroLine3: "Ganando",
    heroLine4: "Campañas.",
    heroBody:
      "Un estratega senior que diseña prensa ganada, narrativa documental, comunicaciones bilingües y marcos de política pública para campañas laborales y de justicia de alta presión.",
    heroPrimary: "Contactar",
    heroSecondary: "Ver estrategia",
    heroCardLabel: "Enfoque actual",
    heroCardTitle: "Historias de primera línea que mueven la opinión pública y a quienes toman decisiones.",
    heroCardBody:
      "Desde ayuntamientos y cámaras del condado hasta clínicas, bibliotecas y centros de trabajo, el trabajo centra a las personas más afectadas y construye una arquitectura narrativa capaz de ganar.",
    impactTitle: "Impacto general",
    campaignTitle: "Campañas estratégicas",
    campaignSearch: "Buscar campañas…",
    mediaTitle: "Cobertura mediática",
    mediaSearch: "Buscar cobertura…",
    opEdTitle: "Artículos de opinión",
    opEdSearch: "Buscar artículos…",
    opEdPanelTitle: "Vista editorial",
    galleryTitle: "Documentación de campo",
    galleryBody:
      "Una galería desplazable con imágenes de estilo documental que reflejan el tono editorial, la urgencia y el enfoque humano del trabajo.",
    profileTitle: "Perfil",
    competenciesTitle: "Competencias",
    contactTitle: "Construyamos tu narrativa.",
    contactBody:
      "Disponible para consultoría en comunicaciones estratégicas, mensajes de campaña, arquitectura de prensa ganada, producción documental y asuntos públicos bilingües.",
    contactPrimary: "Enviar mensaje",
    contactSecondary: "Escribir por correo",
    contactFormName: "Nombre",
    contactFormEmail: "Correo",
    contactFormOrg: "Organización",
    contactFormMessage: "Cuéntame sobre la campaña, el calendario y lo que necesitas.",
    contactNote: "Este formulario abre tu cliente de correo con un borrador listo.",
    statLabels: [
      "Alcance verificado",
      "Éxito en autorización de huelga",
      "Participación y conversión",
      "Trabajadores impactados",
    ],
    sectionCampaigns: "01",
    sectionMedia: "02",
    sectionOpEds: "03",
    sectionProfile: "04",
    all: "Todo",
    healthcare: "Salud",
    publicServices: "Servicios públicos",
    labor: "Laboral",
    article: "Artículo",
    broadcast: "Cobertura",
    audio: "Audio",
    video: "Video",
    analysis: "Análisis",
    investigation: "Investigación",
    policy: "Política",
    editorial: "Editorial",
    openPreview: "Abrir vista",
    readMore: "Leer más",
    viewDetails: "Ver detalles",
    notablePlacements: "Medios destacados",
    linkedin: "Conectar en LinkedIn",
    backToTop: "Arriba",
    languageLabel: "[EN]",
    close: "Cerrar",
  },
} as const;

const stats = [
  { value: 6000000, compact: true, suffix: "+", bar: 82 },
  { value: 98.6, suffix: "%", decimals: 1, bar: 98 },
  { value: 87, suffix: "%", bar: 87 },
  { value: 200000, compact: true, suffix: "+", bar: 64 },
];

const campaigns: Campaign[] = [
  {
    id: "living-wage",
    title: "Humanizing the Frontline: The Living Wage Documentary Series",
    category: ["healthcare", "public services", "labor"],
    sector: "Healthcare, education, public safety, and general public services",
    role: [
      "Frontline storytelling",
      "Public affairs & narrative strategy",
      "Advertising & conversion optimization",
      "Design direction",
    ],
    scope: ["Tacoma", "Monterey", "Oakland", "San Francisco", "Hollister", "Santa Cruz"],
    outcome: [
      "Elevated worker testimony over abstract contract language",
      "Created a repeatable documentary campaign toolkit across markets",
      "Turned local stories into persuasive public-facing narrative assets",
    ],
    summary:
      "Historic wage campaigns rarely move on data alone. This work embedded with workers across healthcare systems and public agencies to build documentary-led narratives that translated hardship, dignity, and urgency into messages the public and elected leaders could not ignore.",
    image:
      "https://images.pexels.com/photos/37440666/pexels-photo-37440666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    accent: "Documentary storytelling",
  },
  {
    id: "monterey-county-can",
    title: "Mobilizing Monterey: Securing Essential Positions Against Elimination",
    category: ["public services", "labor"],
    sector: "Healthcare, justice, roads, elections, courts, social services, and public safety",
    role: [
      "Digital infrastructure",
      "Legislative affairs",
      "Videography & photography",
      "Campaign web experience",
    ],
    scope: ["Monterey County", "Salinas", "Seaside", "County board ecosystem"],
    outcome: [
      "Helped protect essential public-service positions from cuts",
      "Improved digital engagement across campaign channels",
      "Converted community frustration into measurable legislative pressure",
    ],
    summary:
      "Facing severe budget cuts, the campaign paired high-velocity field media with low-friction advocacy tools. The result was a public narrative that made invisible county work visible and gave supporters a clear path to action.",
    image:
      "https://images.pexels.com/photos/5428361/pexels-photo-5428361.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    accent: "Legislative mobilization",
  },
  {
    id: "grocery-safety",
    title: "Architecting Safety: Collateral for Grocery and Skilled Trades Workers",
    category: ["labor"],
    sector: "Skilled trades and grocery",
    role: ["Print design", "Field communications", "Shop-floor message discipline"],
    scope: ["Northern California", "Member meetings", "Bargaining updates"],
    outcome: [
      "Kept workers aligned during high-stakes negotiations",
      "Translated bargaining language into plain-language action tools",
      "Built highly legible safety-rights collateral for frontline use",
    ],
    summary:
      "When safety language becomes a life-and-death issue, communications must be crisp, portable, and trusted. This campaign centered practical print systems and field-ready messaging that connected negotiations to day-to-day worker reality.",
    image:
      "https://images.pexels.com/photos/37732810/pexels-photo-37732810.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    accent: "Field communications",
  },
];

const mediaItems: MediaItem[] = [
  {
    id: "planned-parenthood",
    title: "Planned Parenthood Mar Monte workers united file for union election",
    outlet: "SF Chronicle / labor organizing",
    type: "article",
    summary:
      "Coverage spotlighting healthcare professionals organizing around representation, security, and improved workplace conditions across clinics.",
    image:
      "https://images.pexels.com/photos/37440668/pexels-photo-37440668.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    details: [
      "Coordinated narrative framing around healthcare worker voice",
      "Positioned campaign as both labor-rights and patient-care story",
      "Built disciplined press context during a volatile national moment",
    ],
  },
  {
    id: "baby-jaxon",
    title: "San Jose demands answers after the Baby Jaxon tragedy",
    outlet: "San Jose Spotlight / investigative follow-through",
    type: "article",
    summary:
      "A sustained accountability storyline that linked public grief, systems failure, and pressure for answers from child welfare leadership.",
    image:
      "https://images.pexels.com/photos/29344111/pexels-photo-29344111.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    details: [
      "Maintained public attention beyond the first news cycle",
      "Connected family concerns to institutional scrutiny",
      "Supported follow-up reporting with disciplined fact patterning",
    ],
  },
  {
    id: "vta-nyt",
    title: "VTA shooting: SEIU responds to tragedy under intense national scrutiny",
    outlet: "The New York Times / crisis communications",
    type: "article",
    summary:
      "Crisis-response messaging that centered grief, worker safety, and public accountability while national outlets were seeking immediate context.",
    image:
      "https://images.pexels.com/photos/6257341/pexels-photo-6257341.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    details: [
      "Balanced urgency with credibility in a rapidly changing story",
      "Protected frontline voices from becoming collateral in reactive coverage",
      "Extended the frame from tragedy to worker conditions and support",
    ],
    href: "https://www.nytimes.com/2021/05/26/us/san-jose-mass-shooting.html",
  },
  {
    id: "santa-cruz-strike",
    title: "City of Santa Cruz inaugural strike",
    outlet: "SFGATE / Mercury News / Sentinel",
    type: "broadcast",
    summary:
      "A local labor story expanded into a broader civic debate through highly targeted press pressure, public-safety framing, and social amplification.",
    image:
      "https://images.pexels.com/photos/32266769/pexels-photo-32266769.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    details: [
      "Generated escalating local and regional coverage",
      "Turned unsafe conditions into a public-interest frame",
      "Reinforced strike readiness and community comprehension",
    ],
    href: "https://www.sfgate.com/news/bayarea/article/santa-cruz-unionized-city-employees-poised-to-21115411.php",
  },
  {
    id: "social-workers-radio",
    title: "Social workers demand more staffing support",
    outlet: "KQED / public radio feature",
    type: "audio",
    summary:
      "Audio-led coverage bringing the staffing crisis into homes and commutes, helping residents connect policy decisions to service breakdowns.",
    image:
      "https://images.pexels.com/photos/7598549/pexels-photo-7598549.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    details: [
      "Helped workers speak in human, not bureaucratic, terms",
      "Supported broader cross-outlet pickup after radio exposure",
      "Linked staffing pressure to family and child safety outcomes",
    ],
    href: "https://www.kqed.org/news/12022256/santa-clara-county-social-workers-demand-more-staffing-support-in-troubled-agency/",
  },
  {
    id: "broadcast-hits",
    title: "Bilingual and local TV coverage that translated campaign urgency for mass audiences",
    outlet: "CBS / Telemundo / local broadcast",
    type: "video",
    summary:
      "A press strategy tailored for broadcast environments, with clean visuals, sharp spokesperson prep, and bilingual accessibility built into the rollout.",
    image:
      "https://images.pexels.com/photos/7598556/pexels-photo-7598556.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    details: [
      "Prepared visual-first messages for television formats",
      "Expanded access to Spanish-language audiences",
      "Strengthened message consistency across interviews and field footage",
    ],
  },
];

const opEds: OpEd[] = [
  {
    id: "cars-wages",
    title: "Santa Cruz wages are so low, some of us live in our cars; city workers need raises, protection and respect",
    outlet: "Lookout Santa Cruz!",
    year: "2022",
    category: "analysis",
    byline:
      "By Leslie Auerbach, Ken Bare, Eric Bumgarner, Brian Cline, Emilio Galvan, and David Tannaci",
    excerpt:
      "A frontline dispatch documenting the human cost of low municipal wages and the strain placed on city workers delivering public services.",
    thesis:
      "The piece reframed compensation as a public-service stability issue, not merely a labor complaint.",
    whyItMattered: [
      "Put lived experience at the center of the wage debate",
      "Connected workforce precarity to city service quality",
      "Supplied values-based framing for subsequent coverage",
    ],
  },
  {
    id: "animal-shelter",
    title: "The Santa Cruz County Animal Shelter has too many pets and too little staff; we need action now",
    outlet: "Lookout Santa Cruz!",
    year: "2024",
    category: "investigation",
    byline: "By SEIU 521 and Ian Mark Newman",
    excerpt:
      "A critical call to action on staffing shortfalls, public accountability, and service risk inside the county shelter system.",
    thesis:
      "The argument fused compassion, operations, and public oversight into one coherent pressure point.",
    whyItMattered: [
      "Made staffing shortages legible to a general audience",
      "Built urgency without sacrificing credibility",
      "Gave advocates a concise public narrative to repeat",
    ],
  },
  {
    id: "public-health-outsourcing",
    title: "The push to outsource Santa Cruz County Public Health",
    outlet: "Santa Cruz Sentinel",
    year: "2025",
    category: "policy",
    byline: "By Cassandra Cheddar, Jacob Ginsburg, and Jason Johnston",
    excerpt:
      "A strategic narrative exposing the risks of outsourcing public health and raising the stakes for residents who depend on those services.",
    thesis:
      "Outsourcing was repositioned from administrative efficiency to a threat to accountability, continuity, and care.",
    whyItMattered: [
      "Elevated worker voice inside a policy-heavy debate",
      "Clarified what residents stood to lose",
      "Created clearer language for public-health defense",
    ],
  },
  {
    id: "library-safe",
    title: "Editorial: Making the Downtown Library Safe",
    outlet: "Santa Cruz Sentinel",
    year: "2025",
    category: "editorial",
    byline: "By Santa Cruz Sentinel Editorial Board",
    excerpt:
      "An editorial argument for safety, service access, and accountability in one of the city’s most visible civic spaces.",
    thesis:
      "The editorial transformed frontline concerns into a citywide public-interest question.",
    whyItMattered: [
      "Extended the story beyond labor audiences",
      "Created legitimacy through third-party editorial voice",
      "Helped define the issue as civic stewardship",
    ],
  },
  {
    id: "public-education-defender",
    title: "Public education in Santa Clara County needs a defender",
    outlet: "San Jose Spotlight",
    year: "2024",
    category: "policy",
    byline: "By Dolores Huerta, Supervisor Sylvia Arenas, and Supervisor Betty Duong",
    excerpt:
      "A values-centered defense of public education infrastructure and the political leadership required to protect it.",
    thesis:
      "The editorial made defense of public schools synonymous with defense of community stability and equity.",
    whyItMattered: [
      "Aligned movement and elected voices in one frame",
      "Elevated public schools as shared civic infrastructure",
      "Strengthened coalition language around education cuts",
    ],
  },
  {
    id: "safe-haven",
    title: "Newsom budget threatens California’s status as a safe haven for abortion",
    outlet: "San Francisco Chronicle / New York Times discourse",
    year: "2025",
    category: "analysis",
    byline: "Policy and reproductive-rights commentary",
    excerpt:
      "A high-stakes editorial synthesis connecting reproductive rights, budget politics, and the constraints facing providers.",
    thesis:
      "The piece converted budget abstraction into a direct question of access, values, and political responsibility.",
    whyItMattered: [
      "Linked state budgeting to frontline healthcare access",
      "Strengthened a morally clear public frame",
      "Expanded the conversation beyond insider policy audiences",
    ],
  },
];

const galleryItems: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "Street-level worker energy",
    caption: "Organizing moments gain power when photographed with urgency and intimacy.",
    image:
      "https://images.pexels.com/photos/37732810/pexels-photo-37732810.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
  {
    id: "gallery-2",
    title: "Campaign motion",
    caption: "Field documentation keeps campaigns grounded in real people, not abstractions.",
    image:
      "https://images.pexels.com/photos/37440666/pexels-photo-37440666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
  {
    id: "gallery-3",
    title: "Public accountability",
    caption: "Civic settings become narrative stages when communications are disciplined.",
    image:
      "https://images.pexels.com/photos/29344111/pexels-photo-29344111.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
  {
    id: "gallery-4",
    title: "Meeting rooms and chambers",
    caption: "Policy communication succeeds when it makes institutional stakes visible.",
    image:
      "https://images.pexels.com/photos/32266769/pexels-photo-32266769.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
  {
    id: "gallery-5",
    title: "Broadcast readiness",
    caption: "Radio and studio environments demand clear message architecture and calm pacing.",
    image:
      "https://images.pexels.com/photos/7598549/pexels-photo-7598549.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
  {
    id: "gallery-6",
    title: "Portrait tone",
    caption: "Editorial-style portraiture can communicate dignity, realism, and stakes at once.",
    image:
      "https://images.pexels.com/photos/6509901/pexels-photo-6509901.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
  },
  {
    id: "gallery-7",
    title: "Protest framing",
    caption: "Strong visual hierarchy helps local stories scale into regional attention.",
    image:
      "https://images.pexels.com/photos/5428361/pexels-photo-5428361.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
];

const competencies = [
  {
    id: "01",
    title: "Public policy & systems impact",
    description:
      "Architects inside-outside campaigns that bridge labor, community voices, consultants, and executive offices to protect services and shape policy outcomes.",
  },
  {
    id: "02",
    title: "Equity & bilingual strategy",
    description:
      "Designs full-spectrum communications for English and Spanish-speaking audiences, with special attention to racial equity, worker access, and message clarity.",
  },
  {
    id: "03",
    title: "High-impact media production",
    description:
      "Produces campaign-ready photography, videography, editorial framing, and visual systems that hold up under pressure and on tight timelines.",
  },
];

const placementLogos = [
  "The New York Times",
  "SF Chronicle",
  "Mercury News",
  "San Jose Spotlight",
  "KQED",
  "CBS",
  "Telemundo",
  "Univision",
  "Lookout Santa Cruz!",
];

const navConfig = [
  { id: "campaigns", key: "navCampaigns" as const },
  { id: "media", key: "navMedia" as const },
  { id: "analysis", key: "navOpEds" as const },
  { id: "profile", key: "navProfile" as const },
  { id: "contact", key: "navContact" as const },
];

function formatMetric(
  value: number,
  progress: number,
  compact?: boolean,
  suffix = "",
  decimals = 0,
) {
  const next = value * progress;

  if (suffix === "%") {
    return `${next.toFixed(decimals)}%`;
  }

  if (compact) {
    if (next >= 1000000) {
      return `${(next / 1000000).toFixed(1).replace(/\.0$/, "")}M${suffix}`;
    }
    if (next >= 1000) {
      return `${(next / 1000).toFixed(0)}K${suffix}`;
    }
  }

  return `${Math.round(next)}${suffix}`;
}

function matchesQuery(text: string, query: string) {
  return text.toLowerCase().includes(query.trim().toLowerCase());
}

function SectionHeader({
  number,
  title,
  accent,
  body,
}: {
  number: string;
  title: string;
  accent?: string;
  body?: string;
}) {
  return (
    <div className="section-rule mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 md:px-10">
      <span className="mono text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--accent)]">
        {number}
      </span>
      <div className="max-w-4xl space-y-4">
        <h2 className="text-4xl font-medium uppercase leading-none tracking-[-0.04em] text-white sm:text-5xl md:text-7xl">
          {accent ? <span className="outline-text">{accent}</span> : null} {title}
        </h2>
        {body ? <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">{body}</p> : null}
      </div>
    </div>
  );
}

function MetaGroup({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="space-y-2">
      <div className="mono text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
        {label}
      </div>
      <div className="space-y-2 text-sm leading-7 text-[var(--muted)]">
        {values.map((value) => (
          <div key={value}>{value}</div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [showTop, setShowTop] = useState(false);
  const [metricProgress, setMetricProgress] = useState(0);
  const [campaignQuery, setCampaignQuery] = useState("");
  const [campaignFilter, setCampaignFilter] = useState("all");
  const [mediaQuery, setMediaQuery] = useState("");
  const [mediaFilter, setMediaFilter] = useState("all");
  const [opEdQuery, setOpEdQuery] = useState("");
  const [opEdFilter, setOpEdFilter] = useState("all");
  const [selectedOpEd, setSelectedOpEd] = useState<OpEd>(opEds[0]);
  const [modalItem, setModalItem] = useState<ModalItem | null>(null);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  const t = copy[lang];
  const contactParts = t.contactTitle.split(" ");
  const contactLead = contactParts.slice(0, -1).join(" ");
  const contactAccent = contactParts[contactParts.length - 1] ?? "";

  useEffect(() => {
    let frame = 0;
    const duration = 1700;
    const start = performance.now();

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setMetricProgress(progress);
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const ids = ["hero", "campaigns", "media", "analysis", "profile", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { threshold: [0.25, 0.45, 0.7], rootMargin: "-25% 0px -45% 0px" },
    );

    sections.forEach((section) => observer.observe(section));

    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalItem ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalItem]);

  useEffect(() => {
    if (!modalItem) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalItem(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modalItem]);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const haystack = [
        campaign.title,
        campaign.sector,
        campaign.summary,
        ...campaign.role,
        ...campaign.scope,
        ...campaign.outcome,
      ].join(" ");
      const categoryMatch = campaignFilter === "all" || campaign.category.includes(campaignFilter);
      return categoryMatch && matchesQuery(haystack, campaignQuery);
    });
  }, [campaignFilter, campaignQuery]);

  const filteredMedia = useMemo(() => {
    return mediaItems.filter((item) => {
      const haystack = [item.title, item.outlet, item.summary, ...item.details].join(" ");
      const typeMatch = mediaFilter === "all" || item.type === mediaFilter;
      return typeMatch && matchesQuery(haystack, mediaQuery);
    });
  }, [mediaFilter, mediaQuery]);

  const filteredOpEds = useMemo(() => {
    return opEds.filter((item) => {
      const haystack = [item.title, item.outlet, item.byline, item.excerpt, item.thesis].join(" ");
      const categoryMatch = opEdFilter === "all" || item.category === opEdFilter;
      return categoryMatch && matchesQuery(haystack, opEdQuery);
    });
  }, [opEdFilter, opEdQuery]);

  useEffect(() => {
    if (!filteredOpEds.length) return;
    if (!filteredOpEds.some((item) => item.id === selectedOpEd.id)) {
      setSelectedOpEd(filteredOpEds[0]);
    }
  }, [filteredOpEds, selectedOpEd.id]);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Campaign inquiry from ${formValues.name || "website visitor"}`);
    const body = encodeURIComponent(
      [
        `Name: ${formValues.name}`,
        `Email: ${formValues.email}`,
        `Organization: ${formValues.organization}`,
        "",
        formValues.message,
      ].join("\n"),
    );

    window.location.href = `mailto:Ian.metromet@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative overflow-x-hidden text-[var(--text)]">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="float-orb absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.22),transparent_68%)] blur-2xl" />
        <div className="float-orb-delayed absolute right-[-6rem] top-56 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.18),transparent_70%)] blur-2xl" />
        <div className="absolute inset-x-0 top-[35vh] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <header className="top-gradient sticky top-0 z-40 border-b border-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <a href="#hero" className="mono text-xs font-bold uppercase tracking-[0.28em] text-white">
            Ian Mark Newman
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {navConfig.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link mono text-[10px] font-bold uppercase tracking-[0.22em] ${
                  activeSection === item.id ? "is-active text-white" : "text-slate-400"
                }`}
              >
                {t[item.key]}
              </a>
            ))}
            <button
              type="button"
              onClick={() => setLang((current) => (current === "en" ? "es" : "en"))}
              className="mono rounded-full border border-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)] transition hover:border-white/20 hover:text-white"
            >
              {t.languageLabel}
            </button>
          </nav>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((current) => !current)}
            className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-xs text-white md:hidden"
          >
            <span className="mono uppercase tracking-[0.2em]">Menu</span>
          </button>
        </div>

        {menuOpen ? (
          <div className="border-t border-white/10 bg-[rgba(11,17,32,0.96)] px-6 py-5 md:hidden">
            <div className="flex flex-col gap-5">
              {navConfig.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="mono text-xs uppercase tracking-[0.22em] text-slate-300"
                >
                  {t[item.key]}
                </a>
              ))}
              <button
                type="button"
                onClick={() => setLang((current) => (current === "en" ? "es" : "en"))}
                className="mono w-fit rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--accent)]"
              >
                {t.languageLabel}
              </button>
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <section id="hero" className="mx-auto max-w-7xl px-6 pb-16 pt-12 md:px-10 md:pb-20 md:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div className="space-y-8">
              <div className="mono text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--accent)]">
                {t.role}
              </div>

              <div className="space-y-4">
                <p className="mono text-[11px] uppercase tracking-[0.24em] text-slate-400">{t.heroTop}</p>
                <h1 className="text-5xl font-medium uppercase leading-[0.9] tracking-[-0.06em] text-white sm:text-7xl md:text-[7.5rem]">
                  <span className="outline-text">{t.heroLine1}</span>
                  <br />
                  <span>{t.heroLine2}</span>
                  <br />
                  <span className="outline-text">{t.heroLine3}</span>
                  <br />
                  <span className="outline-text">{t.heroLine4}</span>
                </h1>
              </div>

              <p className="max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">{t.heroBody}</p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="mono inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition hover:-translate-y-0.5 hover:brightness-110"
                >
                  {t.heroPrimary}
                </a>
                <a
                  href="#campaigns"
                  className="mono inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-200 transition hover:border-white/30 hover:text-white"
                >
                  {t.heroSecondary} <span aria-hidden>→</span>
                </a>
              </div>
            </div>

            <div className="glass-panel bg-noise relative overflow-hidden rounded-[2rem] p-5 md:p-6">
              <div className="media-frame overflow-hidden rounded-[1.6rem] border border-white/10">
                <img
                  src="https://images.pexels.com/photos/37440668/pexels-photo-37440668.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1400"
                  alt="Workers marching in an editorial-style campaign image"
                  className="h-[420px] w-full object-cover grayscale lg:h-[560px]"
                />
                <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
                  <div className="mb-4 inline-flex rounded-full border border-white/20 bg-black/25 px-3 py-2 text-[10px] text-white/90 backdrop-blur">
                    <span className="mono uppercase tracking-[0.24em]">{t.heroCardLabel}</span>
                  </div>
                  <h2 className="max-w-xl text-2xl font-bold uppercase leading-tight tracking-[-0.03em] text-white md:text-3xl">
                    {t.heroCardTitle}
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200 md:text-base">{t.heroCardBody}</p>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Earned media", value: "Regional + national" },
                  { label: "Narrative systems", value: "Field to editorial" },
                  { label: "Language access", value: "Bilingual strategy" },
                ].map((item) => (
                  <div key={item.label} className="editorial-card rounded-[1.4rem] p-4">
                    <div className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">{item.label}</div>
                    <p className="mt-2 text-sm font-medium text-slate-100">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="impact" className="mx-auto max-w-7xl px-6 pb-10 md:px-10 md:pb-16">
          <div className="mb-6 flex items-end justify-between gap-6">
            <div>
              <div className="mono text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--accent)]">
                {t.impactTitle}
              </div>
            </div>
            <div className="hidden h-px flex-1 bg-gradient-to-r from-white/10 to-transparent md:block" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <article key={t.statLabels[index]} className="glass-panel rounded-[2rem] p-6 md:p-7">
                <div className="text-4xl font-black tracking-[-0.05em] text-white md:text-6xl">
                  {formatMetric(stat.value, metricProgress, stat.compact, stat.suffix, stat.decimals ?? 0)}
                </div>
                <p className="mono mt-3 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  {t.statLabels[index]}
                </p>
                <div className="metric-bar mt-6">
                  <span style={{ width: `${stat.bar * metricProgress}%` }} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="campaigns" className="py-10 md:py-20">
          <SectionHeader number={t.sectionCampaigns} accent="Strategic" title={t.campaignTitle} />

          <div className="mx-auto mt-10 flex w-full max-w-6xl flex-col gap-4 px-6 md:px-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <input
                type="search"
                value={campaignQuery}
                onChange={(event) => setCampaignQuery(event.target.value)}
                placeholder={t.campaignSearch}
                className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[var(--accent)] lg:max-w-md"
              />
              <div className="flex flex-wrap gap-3">
                {[
                  { label: t.all, value: "all" },
                  { label: t.healthcare, value: "healthcare" },
                  { label: t.publicServices, value: "public services" },
                  { label: t.labor, value: "labor" },
                ].map((pill) => (
                  <button
                    key={pill.value}
                    type="button"
                    onClick={() => setCampaignFilter(pill.value)}
                    className={`filter-pill mono rounded-full px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] ${
                      campaignFilter === pill.value ? "is-active" : ""
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-8">
              {filteredCampaigns.map((campaign) => (
                <article key={campaign.id} className="glass-panel overflow-hidden rounded-[2rem]">
                  <div className="grid gap-0 lg:grid-cols-[0.95fr_1.1fr]">
                    <div className="media-frame min-h-[320px] overflow-hidden border-b border-white/10 lg:border-b-0 lg:border-r">
                      <img
                        src={campaign.image}
                        alt={campaign.title}
                        className="h-full w-full object-cover grayscale transition duration-700 hover:scale-[1.03] hover:grayscale-0"
                      />
                      <div className="absolute left-5 top-5 z-10 rounded-full border border-white/20 bg-black/25 px-3 py-2 backdrop-blur">
                        <span className="mono text-[10px] uppercase tracking-[0.2em] text-white">{campaign.accent}</span>
                      </div>
                    </div>

                    <div className="grid gap-8 p-6 md:p-8 xl:grid-cols-[0.82fr_1.18fr]">
                      <div className="space-y-5">
                        <MetaGroup label="Sector" values={[campaign.sector]} />
                        <MetaGroup label="Role" values={campaign.role} />
                        <MetaGroup label="Scope" values={campaign.scope} />
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-extrabold uppercase leading-tight tracking-[-0.03em] text-white md:text-4xl">
                            {campaign.title}
                          </h3>
                          <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--muted)]">
                            {campaign.summary}
                          </p>
                        </div>

                        <div>
                          <div className="mono mb-3 text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                            Outcome
                          </div>
                          <ul className="space-y-3 text-sm leading-7 text-slate-200">
                            {campaign.outcome.map((item) => (
                              <li key={item} className="flex gap-3">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setModalItem({
                              eyebrow: campaign.accent,
                              title: campaign.title,
                              body: campaign.summary,
                              image: campaign.image,
                              bullets: campaign.outcome,
                            })
                          }
                          className="mono inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-100 transition hover:border-white/30 hover:text-white"
                        >
                          {t.viewDetails} <span aria-hidden>↗</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {!filteredCampaigns.length ? (
                <div className="editorial-card rounded-[2rem] px-6 py-10 text-[var(--muted)]">
                  No campaigns matched that search.
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section id="media" className="border-y border-white/5 bg-[rgba(255,255,255,0.02)] py-12 md:py-20">
          <SectionHeader number={t.sectionMedia} accent="Media" title={t.mediaTitle} />

          <div className="mx-auto mt-10 flex w-full max-w-6xl flex-wrap gap-3 px-6 md:px-10">
            <span className="mono mr-2 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
              {t.notablePlacements}
            </span>
            {placementLogos.map((logo) => (
              <span
                key={logo}
                className="mono rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-slate-300"
              >
                {logo}
              </span>
            ))}
          </div>

          <div className="mx-auto mt-10 flex w-full max-w-6xl flex-col gap-4 px-6 md:px-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <input
                type="search"
                value={mediaQuery}
                onChange={(event) => setMediaQuery(event.target.value)}
                placeholder={t.mediaSearch}
                className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[var(--accent)] lg:max-w-md"
              />
              <div className="flex flex-wrap gap-3">
                {[
                  { label: t.all, value: "all" },
                  { label: t.article, value: "article" },
                  { label: t.broadcast, value: "broadcast" },
                  { label: t.audio, value: "audio" },
                  { label: t.video, value: "video" },
                ].map((pill) => (
                  <button
                    key={pill.value}
                    type="button"
                    onClick={() => setMediaFilter(pill.value)}
                    className={`filter-pill mono rounded-full px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] ${
                      mediaFilter === pill.value ? "is-active" : ""
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-6 lg:grid-cols-2">
              {filteredMedia.map((item) => (
                <article
                  key={item.id}
                  className="editorial-card overflow-hidden rounded-[2rem] transition duration-300 hover:-translate-y-1 hover:border-white/20"
                >
                  <div className="media-frame h-64 overflow-hidden border-b border-white/10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover grayscale transition duration-700 hover:scale-[1.04] hover:grayscale-0"
                    />
                    <div className="absolute left-5 top-5 z-10 rounded-full border border-white/20 bg-black/30 px-3 py-2 backdrop-blur">
                      <span className="mono text-[10px] uppercase tracking-[0.18em] text-white">{item.type}</span>
                    </div>
                  </div>

                  <div className="space-y-5 p-6">
                    <div>
                      <div className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                        {item.outlet}
                      </div>
                      <h3 className="mt-3 text-2xl font-extrabold uppercase leading-tight tracking-[-0.03em] text-white">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-base leading-8 text-[var(--muted)]">{item.summary}</p>
                    </div>

                    <ul className="space-y-3 text-sm leading-7 text-slate-200">
                      {item.details.map((detail) => (
                        <li key={detail} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() =>
                          setModalItem({
                            eyebrow: item.outlet,
                            title: item.title,
                            body: item.summary,
                            image: item.image,
                            bullets: item.details,
                            href: item.href,
                            hrefLabel: item.href ? t.readMore : undefined,
                          })
                        }
                        className="mono inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-100 transition hover:border-white/30"
                      >
                        {t.openPreview} <span aria-hidden>↗</span>
                      </button>

                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mono inline-flex items-center gap-2 rounded-full border border-[rgba(255,90,31,0.35)] bg-[var(--accent-soft)] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:border-[var(--accent)]"
                        >
                          {t.readMore} <span aria-hidden>↗</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="analysis" className="py-12 md:py-20">
          <SectionHeader
            number={t.sectionOpEds}
            title={t.opEdTitle}
            body="A selective archive of editorial and opinion work designed to sharpen public understanding, support organizing campaigns, and move policy conversations."
          />

          <div className="mx-auto mt-10 grid w-full max-w-6xl gap-8 px-6 md:px-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-5">
              <div className="flex flex-col gap-4">
                <input
                  type="search"
                  value={opEdQuery}
                  onChange={(event) => setOpEdQuery(event.target.value)}
                  placeholder={t.opEdSearch}
                  className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[var(--accent)]"
                />
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: t.all, value: "all" },
                    { label: t.analysis, value: "analysis" },
                    { label: t.investigation, value: "investigation" },
                    { label: t.policy, value: "policy" },
                    { label: t.editorial, value: "editorial" },
                  ].map((pill) => (
                    <button
                      key={pill.value}
                      type="button"
                      onClick={() => setOpEdFilter(pill.value)}
                      className={`filter-pill mono rounded-full px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] ${
                        opEdFilter === pill.value ? "is-active" : ""
                      }`}
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                {filteredOpEds.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedOpEd(item)}
                    className={`editorial-card rounded-[1.75rem] p-5 text-left transition duration-300 hover:-translate-y-1 ${
                      selectedOpEd.id === item.id
                        ? "border-[rgba(255,90,31,0.4)] bg-[rgba(255,90,31,0.08)]"
                        : ""
                    }`}
                  >
                    <div className="flex flex-wrap gap-2">
                      <span className="mono rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--brand)]">
                        {item.outlet}
                      </span>
                      <span className="mono rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-extrabold leading-tight tracking-[-0.03em] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.excerpt}</p>
                  </button>
                ))}

                {!filteredOpEds.length ? (
                  <div className="editorial-card rounded-[1.75rem] px-5 py-8 text-[var(--muted)]">
                    No op-eds matched that search.
                  </div>
                ) : null}
              </div>
            </div>

            <aside className="glass-panel sticky top-28 h-fit rounded-[2rem] p-6 md:p-8">
              <div className="mono text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--accent)]">
                {t.opEdPanelTitle}
              </div>
              <h3 className="mt-4 text-3xl font-extrabold uppercase leading-tight tracking-[-0.04em] text-white">
                {selectedOpEd.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-300">
                <span>{selectedOpEd.outlet}</span>
                <span>•</span>
                <span>{selectedOpEd.year}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{selectedOpEd.byline}</p>
              <p className="mt-6 text-base leading-8 text-[var(--muted)]">{selectedOpEd.excerpt}</p>

              <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-[rgba(0,0,0,0.15)] p-5">
                <div className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">Core thesis</div>
                <p className="mt-3 text-base leading-8 text-slate-100">{selectedOpEd.thesis}</p>
              </div>

              <div className="mt-8">
                <div className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">Why it mattered</div>
                <ul className="mt-4 space-y-4 text-sm leading-7 text-slate-200">
                  {selectedOpEd.whyItMattered.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section id="gallery" className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-16">
          <div className="glass-panel rounded-[2rem] p-6 md:p-8">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mono text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--accent)]">03A</div>
                <h2 className="mt-3 text-3xl font-extrabold uppercase tracking-[-0.04em] text-white md:text-5xl">
                  {t.galleryTitle}
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">{t.galleryBody}</p>
            </div>

            <div className="gallery-scroll flex snap-x gap-5 overflow-x-auto pb-2">
              {galleryItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setModalItem({
                      eyebrow: "Field documentation",
                      title: item.title,
                      body: item.caption,
                      image: item.image,
                      bullets: [
                        "Editorial-style framing",
                        "Documentary visual tone",
                        "Campaign-ready image storytelling",
                      ],
                    })
                  }
                  className="media-frame group relative h-[26rem] min-w-[22rem] snap-center overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/20 text-left transition duration-300 hover:-translate-y-1 md:min-w-[28rem]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                    <h3 className="text-xl font-bold uppercase leading-tight tracking-[-0.03em] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-200">{item.caption}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="profile" className="py-12 md:py-20">
          <SectionHeader number={t.sectionProfile} accent="Profile" title={t.profileTitle} />

          <div className="mx-auto mt-10 grid w-full max-w-6xl gap-8 px-6 md:px-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="glass-panel media-frame overflow-hidden rounded-[2rem]">
              <img
                src="https://images.pexels.com/photos/6509900/pexels-photo-6509900.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1000"
                alt="Editorial style portrait"
                className="h-full min-h-[420px] w-full object-cover grayscale"
              />
              <div className="absolute left-6 top-6 z-10 rounded-full border border-white/20 bg-black/25 px-3 py-2 backdrop-blur">
                <span className="mono text-[10px] uppercase tracking-[0.2em] text-white">Strategic communicator</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-panel rounded-[2rem] p-6 md:p-8">
                <p className="text-base leading-8 text-[var(--muted)]">
                  Ian Mark Newman is a strategic communications and media professional with more than a decade of experience advancing labor, racial justice, and public-interest campaigns. The work spans local, statewide, and regional efforts including minimum-wage fights, healthcare advocacy, worker defense, budget accountability, and campaigns that translate frontline knowledge into public will.
                </p>
                <p className="mt-5 text-base leading-8 text-[var(--muted)]">
                  The practice combines earned-media strategy, bilingual communications, documentary production, and message systems built for moments when the stakes are political, human, and immediate. The throughline is clear: elevate the people closest to the issue and build narratives powerful enough to change outcomes.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(0,0,0,0.12)] p-5">
                    <div className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">Education</div>
                    <div className="mt-2 text-lg font-bold text-white">MFA, Digital Arts & New Media</div>
                    <p className="mt-2 text-sm leading-7 text-slate-300">University of California, Santa Cruz</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(0,0,0,0.12)] p-5">
                    <div className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                      Language access
                    </div>
                    <div className="mt-2 text-lg font-bold text-white">Advanced Spanish proficiency</div>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      Bilingual strategy for public-facing and internal campaign communications
                    </p>
                  </div>
                </div>

                <a
                  href="https://www.linkedin.com/in/ian-newman-219a3518/"
                  target="_blank"
                  rel="noreferrer"
                  className="mono mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-100 transition hover:border-white/30 hover:text-white"
                >
                  {t.linkedin} <span aria-hidden>↗</span>
                </a>
              </div>

              <div>
                <div className="mono mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--accent)]">
                  {t.competenciesTitle}
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {competencies.map((item) => (
                    <article key={item.id} className="editorial-card rounded-[1.75rem] p-5">
                      <div className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">{item.id}</div>
                      <h3 className="mt-4 text-lg font-bold uppercase leading-tight tracking-[-0.03em] text-white">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-white/5 bg-[rgba(255,255,255,0.02)] py-12 md:py-20">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 md:px-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <div className="mono text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--accent)]">Contact</div>
              <h2 className="text-4xl font-medium uppercase leading-none tracking-[-0.05em] text-white md:text-6xl">
                {contactLead} <span className="outline-text">{contactAccent}</span>
              </h2>
              <p className="max-w-xl text-base leading-8 text-[var(--muted)]">{t.contactBody}</p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="editorial-card rounded-[1.6rem] p-5">
                  <div className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">Email</div>
                  <a href="mailto:Ian.metromet@gmail.com" className="mt-3 block text-lg font-bold text-white">
                    Ian.metromet@gmail.com
                  </a>
                </div>
                <div className="editorial-card rounded-[1.6rem] p-5">
                  <div className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">Focus</div>
                  <p className="mt-3 text-sm leading-7 text-slate-200">
                    Earned media, public affairs, campaign messaging, documentary production, bilingual strategy.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="glass-panel rounded-[2rem] p-6 md:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mono mb-2 block text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    {t.contactFormName}
                  </span>
                  <input
                    type="text"
                    required
                    value={formValues.name}
                    onChange={(event) => setFormValues((current) => ({ ...current, name: event.target.value }))}
                    className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-[var(--accent)]"
                    placeholder={t.contactFormName}
                  />
                </label>

                <label className="block">
                  <span className="mono mb-2 block text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    {t.contactFormEmail}
                  </span>
                  <input
                    type="email"
                    required
                    value={formValues.email}
                    onChange={(event) => setFormValues((current) => ({ ...current, email: event.target.value }))}
                    className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-[var(--accent)]"
                    placeholder={t.contactFormEmail}
                  />
                </label>
              </div>

              <label className="mt-4 block">
                <span className="mono mb-2 block text-[11px] uppercase tracking-[0.2em] text-slate-400">
                  {t.contactFormOrg}
                </span>
                <input
                  type="text"
                  value={formValues.organization}
                  onChange={(event) =>
                    setFormValues((current) => ({ ...current, organization: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-[var(--accent)]"
                  placeholder={t.contactFormOrg}
                />
              </label>

              <label className="mt-4 block">
                <span className="mono mb-2 block text-[11px] uppercase tracking-[0.2em] text-slate-400">Message</span>
                <textarea
                  required
                  rows={6}
                  value={formValues.message}
                  onChange={(event) => setFormValues((current) => ({ ...current, message: event.target.value }))}
                  className="w-full rounded-[1.5rem] border border-white/10 bg-black/10 px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-[var(--accent)]"
                  placeholder={t.contactFormMessage}
                />
              </label>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  className="mono inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:brightness-110"
                >
                  {t.contactPrimary}
                </button>
                <a
                  href="mailto:Ian.metromet@gmail.com"
                  className="mono inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-100 transition hover:border-white/30"
                >
                  {t.contactSecondary}
                </a>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-400">{t.contactNote}</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mono text-xs font-bold uppercase tracking-[0.24em] text-slate-300">Ian Mark Newman</div>
            <p className="mt-2 text-sm text-slate-500">
              Strategy, narrative systems, and communications for high-stakes public-interest campaigns.
            </p>
          </div>
          <div className="mono flex flex-wrap gap-4 text-[10px] uppercase tracking-[0.2em] text-slate-400">
            {navConfig.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {t[item.key]}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`mono fixed bottom-6 right-6 z-30 rounded-full border border-white/10 bg-black/30 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur transition ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        {t.backToTop}
      </button>

      {modalItem ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(5,10,18,0.82)] p-4 backdrop-blur-md"
          onClick={() => setModalItem(null)}
        >
          <div
            className="glass-panel max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[2rem]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="grid max-h-[90vh] gap-0 overflow-auto lg:grid-cols-[1.1fr_0.9fr]">
              <div className="media-frame min-h-[280px] lg:min-h-[620px]">
                <img src={modalItem.image} alt={modalItem.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col justify-between gap-6 p-6 md:p-8">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                        {modalItem.eyebrow}
                      </div>
                      <h3 className="mt-3 text-3xl font-extrabold uppercase leading-tight tracking-[-0.04em] text-white">
                        {modalItem.title}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setModalItem(null)}
                      className="mono rounded-full border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-slate-300"
                    >
                      {t.close}
                    </button>
                  </div>

                  <p className="mt-6 text-base leading-8 text-[var(--muted)]">{modalItem.body}</p>
                  <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-200">
                    {modalItem.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3">
                  {modalItem.href ? (
                    <a
                      href={modalItem.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mono inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white"
                    >
                      {modalItem.hrefLabel ?? t.readMore} <span aria-hidden>↗</span>
                    </a>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setModalItem(null)}
                    className="mono inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-100"
                  >
                    {t.close}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
