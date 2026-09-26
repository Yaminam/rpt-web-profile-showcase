/**
 * Single source of truth for portfolio content (from resume).
 * Edit here to update the whole site.
 */

export const profile = {
  name: "Shreyash Tripathi",
  handle: "shreyash",
  role: "Junior Frontend / UI-UX Developer",
  roles: [
    "Junior Developer, UI/UX",
    "Frontend Developer",
    "UI/UX Engineer",
    "Next.js Developer",
    "AI-Integrated Builder",
  ],
  location: "Noida, India",
  email: "tshreyash024@gmail.com",
  phone: "+91 81608 90957",
  phoneHref: "+918160890957",
  github: "https://github.com/Yaminam",
  linkedin: "https://www.linkedin.com/in/shreyashtripathi9",
  resume: "/Shreyash_Tripathi_Resume.pdf",
  photo: "/shreyash-profile.webp",
  summary:
    "Frontend-focused full-stack developer and UI/UX contributor with production experience shipping features on AI-integrated SaaS platforms and marketing sites at a digital product agency. I build UI across React, Next.js (App Router) and TypeScript codebases with Tailwind CSS, Supabase and REST APIs, and I'm comfortable owning components end-to-end — from responsive layout and design-system consistency through backend integration.",
};

export type ContactReason = {
  id: string;
  label: string;
  subject: string;
  body: string;
};

/** Pre-written email templates, keyed by why someone's reaching out. */
export const contactReasons: ContactReason[] = [
  {
    id: "job",
    label: "Job Opportunity",
    subject: "Job opportunity for Shreyash",
    body: "Hi Shreyash,\n\nI'm reaching out about a job opportunity I think could be a great fit for you.\n\nRole:\nCompany:\nLocation:\n\nLooking forward to hearing from you!\n",
  },
  {
    id: "freelance",
    label: "Freelance Project",
    subject: "Freelance project inquiry",
    body: "Hi Shreyash,\n\nI have a freelance project I'd love to discuss with you.\n\nProject:\nTimeline:\nBudget:\n\nLet me know if you're available!\n",
  },
  {
    id: "collab",
    label: "Collaboration",
    subject: "Let's collaborate",
    body: "Hi Shreyash,\n\nI'd like to explore collaborating on something together.\n\nWhat I have in mind:\n\n\nWould love to hear your thoughts!\n",
  },
  {
    id: "hello",
    label: "Just Saying Hi",
    subject: "Hey from your portfolio",
    body: "Hi Shreyash,\n\nJust came across your portfolio and wanted to say hi!\n\n\n",
  },
];

/** Builds a mailto: link pre-filled with the subject/body for a given reason. */
export const mailtoFor = (email: string, reason: ContactReason) =>
  `mailto:${email}?subject=${encodeURIComponent(reason.subject)}&body=${encodeURIComponent(reason.body)}`;

export const stats = [
  { value: "2+", label: "Years coding" },
  { value: "40%", label: "Manual work cut by automation" },
  { value: "30+", label: "Tech & tools" },
  { value: "10+", label: "Production features shipped" },
];

export const strengths = [
  "Problem Solving",
  "Clean, Efficient Code",
  "Clear Communication",
  "Team Collaboration",
  "Analytical Thinking",
  "Fast Learner",
  "Design-System Thinking",
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  location?: string;
  current?: boolean;
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "Garage Collective",
    role: "Junior Developer, UI/UX",
    period: "Feb 2026 — Present",
    location: "Noida, India",
    current: true,
    points: [
      "Promoted from AI Trainee to Junior Developer, UI/UX after shipping production features across the agency's client and SaaS portfolio.",
      "Built and deployed a daily AI content-generation agent (Instagram, LinkedIn, blog), cutting manual content-creation effort by roughly 40%.",
      "Shipped UTM auto-tagging and partner-portal link generation on a multi-tenant affiliate-marketing SaaS platform, plus a new analytics dashboard module for an internal campaign-management platform.",
      "Rebuilt a 45-page K-12 school marketing site with a mobile-layout overhaul, fixing horizontal-scroll, tap-target and navigation issues.",
      "Extended a zero-knowledge credential management tool with credential revocation and multi-currency vendor billing, and delivered dark-mode, responsiveness and TypeScript fixes across a social-listening platform, an AI call-screening product and a startup/investor marketplace.",
      "Gained hands-on exposure across 20+ client and SaaS builds — from cinematic 3D/WebGL marketing sites to multi-tenant dashboards and AI content pipelines — with tools spanning Three.js, GSAP, Framer Motion, Stripe/Razorpay, Clerk, Turborepo and OpenAI/Anthropic SDKs.",
    ],
  },
];

export type Project = {
  name: string;
  /** URL slug for the /projects/<slug> case-study page (omit = no page). */
  slug?: string;
  links?: { demo?: string; repo?: string };
  /** Team project: what Shreyash owned. Omit for solo projects. */
  team?: { part: "frontend" | "backend"; role: string };
  /** <title> / meta description for the case-study page (keep ≤ 60 / ≤ 155 chars). */
  seo?: { title: string; description: string };
  /** Case-study body: intro paragraphs, how it works step by step, and an optional honest note. */
  caseStudy?: {
    overview: string[];
    howItWorks: { title: string; text: string }[];
    note?: string;
  };
  tagline: string;
  description: string;
  tech: string[];
  highlights: string[];
  accent: "cyan" | "magenta" | "green" | "purple" | "yellow";
};

export const projects: Project[] = [
  {
    name: "PurrCase",
    slug: "purrcase",
    team: {
      part: "frontend",
      role: "Frontend: built the storefront UI and responsive design with Tailwind CSS and Radix UI, working with a teammate on the full-stack app.",
    },
    links: {
      demo: "https://purr-case.vercel.app",
      repo: "https://github.com/NEMYSESx/Purr-Case",
    },
    seo: {
      title: "PurrCase: Next.js E-Commerce Case Study | Shreyash Tripathi",
      description: "PurrCase is a custom phone-case store built with Next.js, Prisma and Kinde OAuth. Shreyash Tripathi built its frontend with Tailwind CSS and Radix UI.",
    },
    caseStudy: {
      overview: [
        "PurrCase turns a customer's own photo into a custom phone case. The shopper uploads an image, places it on a live phone mockup, chooses the phone model and case options, checks a final preview and pays — all in one guided three-step flow.",
        "It was built by a two-person team as a full-stack Next.js 14 app. Shreyash Tripathi owned the frontend: the storefront and landing page, the step-by-step configurator, the phone mockup and preview screens, and responsive layouts from mobile to desktop, built with Tailwind CSS and Radix UI components.",
      ],
      howItWorks: [
        {
          title: "Upload",
          text: "The customer drops an image into a drag-and-drop zone (react-dropzone); the file is stored through UploadThing and a new case configuration is created for it.",
        },
        {
          title: "Design",
          text: "The image can be dragged and resized over a phone frame (react-rnd). The shopper picks an iPhone model from iPhone X to iPhone 15, a case colour, a silicone or soft polycarbonate material and a smooth or textured finish, with every option validated by Zod.",
        },
        {
          title: "Preview",
          text: "A preview page shows the finished case with its model, material, finish and total price before the customer signs in with Kinde and checks out.",
        },
        {
          title: "Checkout",
          text: "Payment runs on Stripe Checkout. A signed Stripe webhook marks the order as paid, saves the shipping and billing addresses in PostgreSQL through Prisma, and sends an order-confirmation email built with React Email and delivered by Resend.",
        },
        {
          title: "Fulfilment",
          text: "An admin-only dashboard shows recent orders and revenue for the last week and month, and lets the store move each order from awaiting shipment to shipped to fulfilled.",
        },
      ],
    },
    tagline: "Custom Mobile Cover E-Commerce Platform",
    description:
      "A full-stack e-commerce store where customers design their own phone case from a photo, preview it and pay with Stripe.",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Radix UI", "Prisma", "PostgreSQL", "Kinde Auth", "Stripe", "UploadThing", "Resend"],
    highlights: [
      "Three-step case designer: upload a photo, drag and resize it on a phone mockup, pick model, material and finish.",
      "Stripe checkout with webhook-confirmed orders, Prisma + PostgreSQL data and Resend order emails.",
      "Frontend (Shreyash): responsive storefront and configurator UI built with Tailwind CSS and Radix UI.",
    ],
    accent: "cyan",
  },
  {
    name: "SketchRace",
    slug: "sketchrace",
    team: {
      part: "backend",
      role: "Backend: built the real-time Socket.IO game server behind live drawing sync, turn rotation and speed-based scoring, working with a teammate who built the Next.js frontend.",
    },
    links: {
      demo: "https://sketchrace.vercel.app",
      repo: "https://github.com/PRINCEjain0/sketchrace",
    },
    seo: {
      title: "SketchRace: Real-Time Multiplayer Game | Shreyash Tripathi",
      description: "SketchRace is a real-time multiplayer drawing and guessing game. Shreyash Tripathi built its Socket.IO backend for live sync, turns and scoring.",
    },
    caseStudy: {
      overview: [
        "SketchRace is a real-time multiplayer drawing and guessing game that runs in the browser. Players join a room, one player draws a secret word on a shared canvas, and everyone else races to guess it in the chat before the timer runs out. Faster correct guesses score more points.",
        "It was built by a two-person team. Shreyash Tripathi built the backend: the Socket.IO game server that keeps every player in a room in sync. A teammate built the Next.js 15 and React 19 frontend, which connects to the server with socket.io-client.",
      ],
      howItWorks: [
        {
          title: "Rooms",
          text: "Every match runs in its own room, reached at /room/[roomId]. The server tracks who is in each room, whose turn it is to draw, and each player's score.",
        },
        {
          title: "Word selection",
          text: "At the start of a turn the server opens a word-selection window for the drawer, who picks one of several randomly generated words; the choice comes back to the server as a word-selected event.",
        },
        {
          title: "Live drawing",
          text: "Each stroke on the Canvas API surface is sent as a drawing event and broadcast to everyone else in the room, so all canvases show the same picture as it is drawn. A clear-canvas event wipes every canvas at once.",
        },
        {
          title: "Guessing and scoring",
          text: "Guesses arrive as chat messages while the server runs the guessing timer. A correct guess triggers a correct-guess event and awards points based on how fast it came; the round can also be ended early with force-end-timer.",
        },
        {
          title: "Game flow",
          text: "start-game and reset-game control each match, the drawing turn rotates to the next player after every round, and a final scoreboard closes the game.",
        },
      ],
    },
    tagline: "Real-Time Multiplayer Drawing & Guessing Game",
    description:
      "A live multiplayer drawing game where players take turns sketching and guessing, racing against the clock for points.",
    tech: ["Socket.IO", "Node.js", "Canvas API", "Next.js 15", "React 19", "Tailwind CSS"],
    highlights: [
      "Backend (Shreyash): Socket.IO game server for rooms, live drawing sync, turn rotation and speed-based scoring.",
      "Shared drawing surface on the Canvas API, with strokes broadcast to every player in the room.",
      "Timed rounds with random word choices, chat guessing and a final scoreboard.",
    ],
    accent: "magenta",
  },
  {
    name: "Job Portal",
    slug: "mern-job-portal",
    seo: {
      title: "Full-Stack Job Portal Case Study | Shreyash Tripathi",
      description: "A full-stack job portal by Shreyash Tripathi, built with Next.js 15, TypeScript, JWT auth and REST APIs: job search, applications and a dashboard.",
    },
    links: {
      demo: "https://v0-mern-job-portal-one.vercel.app",
      repo: "https://github.com/Yaminam/jobportal",
    },
    caseStudy: {
      overview: [
        "Job Portal connects job seekers and employers in one app. Candidates search and filter openings, save jobs for later and apply; employers post new roles; and everyone gets a personal dashboard that tracks their activity.",
        "Shreyash Tripathi built it end to end as a full-stack Next.js 15 app with the App Router and TypeScript: the pages and UI, the REST API routes, authentication and the database schema.",
      ],
      howItWorks: [
        {
          title: "Authentication",
          text: "Register and login API routes hash passwords with bcrypt and issue JSON Web Tokens, with separate sign-up flows for job seekers and employers.",
        },
        {
          title: "Jobs and applications",
          text: "REST endpoints serve jobs, applications, profiles and resumes. The job board filters by keyword, location and job type, and candidates can save jobs and track every application they send.",
        },
        {
          title: "Data model",
          text: "A relational PostgreSQL schema covers users, companies, jobs, applications, saved jobs, skills, work experience and education, with seed data for development.",
        },
        {
          title: "Dashboard",
          text: "Each user gets a dashboard with application and saved-job stats and recent activity; employers post new openings from a dedicated form.",
        },
        {
          title: "Interface",
          text: "Responsive layouts from mobile to desktop, a dark/light theme that follows the system setting, and loading skeletons, built with Tailwind CSS and shadcn/ui components.",
        },
      ],
      note: "The live demo is a working prototype: its API routes serve in-memory sample data and the dashboard keeps state in the browser, while the SQL schema is ready for a real PostgreSQL database.",
    },
    tagline: "Full-Stack Recruitment Platform",
    description:
      "A full-stack job portal where candidates search, save and apply for jobs and employers post openings, with JWT auth, REST APIs and a personal dashboard.",
    tech: ["Next.js 15", "TypeScript", "REST API", "JWT", "bcrypt", "PostgreSQL", "Tailwind CSS", "shadcn/ui"],
    highlights: [
      "Built the full stack with the Next.js 15 App Router, TypeScript and REST API routes.",
      "JWT authentication with bcrypt password hashing for job seekers and employers.",
      "Job search with filters, saved jobs, application tracking and a user dashboard; deployed on Vercel.",
    ],
    accent: "green",
  },
  {
    name: "Portfolio Website",
    tagline: "TypeScript Personal Site",
    description:
      "A performant, SEO-optimized personal site to showcase skills, projects and resume — the one you're on right now.",
    tech: ["TypeScript", "React", "Tailwind CSS", "Vercel"],
    highlights: [
      "Built a TypeScript-based personal website highlighting skills, projects and resume.",
      "Optimized for performance and SEO.",
      "Deployed on Vercel.",
    ],
    accent: "purple",
  },
];

export type SkillGroup = {
  label: string;
  prompt: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    prompt: "languages --list",
    items: ["TypeScript", "JavaScript", "Java", "C++", "Python", "SQL"],
  },
  {
    label: "Frontend",
    prompt: "frontend --list",
    items: [
      "React",
      "Next.js (App Router)",
      "Vite",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Radix UI",
      "shadcn/ui",
      "Responsive Design",
    ],
  },
  {
    label: "Animation & Motion",
    prompt: "motion --list",
    items: ["Framer Motion", "GSAP", "Three.js", "React Three Fiber", "Lenis", "Lottie"],
  },
  {
    label: "Backend & APIs",
    prompt: "backend --list",
    items: ["Node.js", "Express.js", "Hono", "REST API Design"],
  },
  {
    label: "Databases & Auth",
    prompt: "data --list",
    items: [
      "Supabase (Postgres, Auth, Storage, Realtime, RLS)",
      "MongoDB",
      "PostgreSQL",
      "Prisma ORM",
      "Clerk",
    ],
  },
  {
    label: "AI Integration",
    prompt: "ai --list",
    items: ["OpenAI API", "Anthropic Claude SDK", "AI Content & Automation Pipelines"],
  },
  {
    label: "Tools & Deployment",
    prompt: "tools --list",
    items: ["Git", "GitHub", "Vercel", "Turborepo", "Stripe", "Razorpay", "Postman", "VS Code"],
  },
];

/** Self-rated proficiency per domain (0–100) for the radar chart. */
export const skillRadar = [
  { axis: "Frontend", level: 92 },
  { axis: "Motion / 3D", level: 80 },
  { axis: "Backend", level: 78 },
  { axis: "Languages", level: 85 },
  { axis: "Databases", level: 76 },
  { axis: "Tools", level: 84 },
];

export type Education = {
  school: string;
  location: string;
  degree: string;
  period: string;
  current?: boolean;
};

export const education: Education[] = [
  {
    school: "JECRC University",
    location: "Jaipur, Rajasthan",
    degree: "B.Tech — Computer Science Engineering (CGPA: 8.1)",
    period: "2022 — 2026",
  },
  {
    school: "P.P. Savani School",
    location: "Ankleshwar, Gujarat",
    degree: "Senior Secondary (12th Grade)",
    period: "2022",
  },
  {
    school: "Swami Vivekanand Academy",
    location: "Ankleshwar, Gujarat",
    degree: "Secondary (10th Grade)",
    period: "2020",
  },
];

export const coursework = [
  "Data Structures",
  "Algorithms",
  "DBMS",
  "Operating Systems",
  "OOP",
  "Web Development",
  "Data Analytics",
];

export type Achievement = {
  title: string;
  detail: string;
  tag: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    title: "Top 10 — Smart India Hackathon",
    detail: "Top 10 rank among 200+ teams in the national-level Smart India Hackathon (SIH).",
    tag: "National",
  },
  {
    title: "Top 10 — Ideathon Competition",
    detail: "Top 10 finalist in the university Ideathon for an innovative project.",
    tag: "Finalist",
  },
  {
    title: "DSA with Java — Apna College Alpha",
    detail: "Certificate of Completion, Apna College's Alpha program (Data Structures & Algorithms with Java).",
    tag: "Certified",
    link: "/certificates/apna-college-dsa-java-certificate.pdf",
  },
  {
    title: "Summer Analytics 2024",
    detail: "Consulting & Analytics Club, IIT Guwahati — active member since Aug 2024.",
    tag: "IIT Guwahati",
  },
];

export const navItems = [
  { id: "home", label: "home" },
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "skills", label: "skills" },
  { id: "projects", label: "projects" },
  { id: "education", label: "education" },
  { id: "contact", label: "contact" },
];

export type Faq = { q: string; a: string };

/** Visible Q&A (answer-engine friendly): plain, self-contained answers about who/what/how. */
export const faqs: Faq[] = [
  {
    q: "Who is Shreyash Tripathi?",
    a: "Shreyash Tripathi is a Frontend Developer and UI/UX Engineer based in Noida, India. He is a Junior Developer, UI/UX at Garage Collective, where he builds production UI with React, Next.js (App Router) and TypeScript for AI-integrated SaaS platforms and marketing sites.",
  },
  {
    q: "What technologies does Shreyash Tripathi work with?",
    a: "React, Next.js, TypeScript and JavaScript on the frontend; Tailwind CSS, Radix UI, Framer Motion and GSAP for UI and motion; Node.js and Express for backend and REST APIs; Supabase, PostgreSQL, MongoDB and Prisma for data; and the OpenAI and Anthropic Claude SDKs for AI features.",
  },
  {
    q: "What does Shreyash Tripathi do at Garage Collective?",
    a: "He builds and ships production UI and AI-powered features across the agency's client and SaaS portfolio, owning components end-to-end, from responsive layout and design-system consistency through backend integration. He was promoted to Junior Developer, UI/UX from an AI Trainee role.",
  },
  {
    q: "Is Shreyash Tripathi available for freelance work?",
    a: "Yes. He works full-time at Garage Collective and is open to interesting freelance projects and collaborations alongside that role, especially React/Next.js frontends, UI/UX builds and AI-integrated web apps.",
  },
  {
    q: "How can I contact Shreyash Tripathi?",
    a: "Email tshreyash024@gmail.com, or connect on GitHub (github.com/Yaminam) and LinkedIn (linkedin.com/in/shreyashtripathi9). His resume is available at shreyashtripathi.in/Shreyash_Tripathi_Resume.pdf.",
  },
];

export const SITE_URL = "https://shreyashtripathi.in";

/** Projects that have their own /projects/<slug> case-study page. */
export const caseStudies = projects.filter((p): p is Project & { slug: string } => Boolean(p.slug));
