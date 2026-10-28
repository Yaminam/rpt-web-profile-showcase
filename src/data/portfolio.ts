/**
 * Single source of truth for portfolio content (from resume).
 * Edit here to update the whole site.
 */

export const profile = {
  name: "Shreyash Tripathi",
  handle: "shreyash",
  role: "Full-Stack Developer & UI/UX Engineer",
  roles: [
    "Full-Stack Developer",
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
  photo: "/shreyash-tripathi.webp",
  summary:
    "Full-stack developer and UI/UX engineer with production experience shipping features on AI-integrated SaaS platforms and marketing sites at a digital product agency. I build UI across React, Next.js (App Router) and TypeScript codebases with Tailwind CSS, Supabase and REST APIs, and I'm comfortable owning components end-to-end — from responsive layout and design-system consistency through backend integration.",
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
      "Built and shipped a finance mobile app (under NDA) with React Native and Expo: the Android companion to a client-profitability and cash platform for service businesses, with role-based homes, a finance inbox with swipe-to-approve, invoice PDFs and reminders, offline mode, six home-screen widgets, push notifications and security hardening (SSL pinning, secure storage, biometric lock).",
      "Led a dashboard UI overhaul and design-system pass on a startup and investor platform (under NDA): brought investor dashboards to parity with the founder one, redesigned its marketing and campaign landing pages, rebuilt blog typography and fixed build-breaking TypeScript errors (Next.js, TypeScript, Tailwind CSS).",
      "Redesigned an internal agency work-management platform (under NDA) end to end on one design system: director and team-lead dashboards, a team capacity board, project and issue detail views, attendance, dark mode, an email pipeline and tickets; also built its CRM landing page with a request-access flow and comparison section (React, Supabase).",
      "Worked on the dashboard UI of an AI search-visibility tracker (under NDA) that measures how ChatGPT, Gemini, Claude, Perplexity and Grok mention, rank and describe brands (Next.js, Supabase, Anthropic SDK).",
      "Built and deployed a daily AI content-generation agent (Instagram, LinkedIn, blog), cutting manual content-creation effort by roughly 40%.",
      "Shipped UTM auto-tagging and partner-portal link generation on a multi-tenant affiliate-marketing SaaS platform, plus a new analytics dashboard module for an internal campaign-management platform.",
      "Rebuilt a 45-page K-12 school marketing site with a mobile-layout overhaul, fixing horizontal-scroll, tap-target and navigation issues.",
      "Built an internal zero-knowledge asset, credential and billing manager (Next.js, Supabase, WebCrypto) with QR asset labels, invoice OCR and multi-currency spend tracking, and delivered dark-mode, responsiveness and TypeScript fixes across a social-listening platform and an AI call-screening product.",
      "Gained hands-on exposure across 20+ client and SaaS builds — from cinematic 3D/WebGL marketing sites to multi-tenant dashboards and AI content pipelines — with tools spanning Three.js, GSAP, Framer Motion, Stripe/Razorpay, Clerk, Turborepo and OpenAI/Anthropic SDKs.",
    ],
  },
];

export type Project = {
  name: string;
  /** URL slug for the /projects/<slug> case-study page (omit = no page). */
  slug?: string;
  links?: { demo?: string; repo?: string; article?: string };
  /** Team project: what Shreyash owned. Omit for solo projects. */
  team?: { part: "frontend" | "backend"; role: string };
  /** <title> / meta description for the case-study page (keep ≤ 60 / ≤ 155 chars). */
  seo?: { title: string; description: string };
  /** Case-study body: intro paragraphs, how it works step by step, and an optional honest note. */
  caseStudy?: {
    overview: string[];
    howItWorks: { title: string; text: string }[];
    /** Engineering problems visible in the code, and how the code solves them. */
    challenges: { problem: string; solution: string }[];
    /** Verifiable outcomes only (what shipped, counts from the code) — no invented metrics. */
    results: string[];
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
      challenges: [
        {
          problem: "What the customer sees in the designer has to be exactly what gets printed, even though the image can be dragged, resized and viewed on any screen size.",
          solution: "The designer measures the phone frame and the image with getBoundingClientRect, redraws only the area inside the case onto an HTML canvas, and uploads that cropped PNG as the final design, so the saved file matches the on-screen preview.",
        },
        {
          problem: "A custom-product checkout has several stages, and shoppers drop off when they lose track of where they are.",
          solution: "A three-step progress bar (Add image, Customize design, Summary) follows the current route, each step carries the configuration id in the URL, and a live phone mockup keeps the design visible from upload to payment.",
        },
        {
          problem: "An order must never be marked as paid unless the payment really went through.",
          solution: "Orders are updated only by a Stripe webhook whose signature is verified with the webhook secret; only then is the order marked paid, the addresses saved and the confirmation email sent.",
        },
      ],
      results: [
        "Shipped and live at purr-case.vercel.app with a complete browse → design → pay → fulfil flow.",
        "Case designer supports 6 iPhone models (iPhone X to iPhone 15), 2 materials and 2 finishes.",
        "Orders move through 3 tracked states (awaiting shipment, shipped, fulfilled) in an admin dashboard with weekly and monthly revenue.",
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
      role: "Backend: built the real-time Socket.IO game server behind live drawing sync, turn rotation, hints and scoring, working with a teammate who built the Next.js frontend.",
    },
    links: {
      demo: "https://sketchrace.vercel.app",
      repo: "https://github.com/PRINCEjain0/sketchrace",
      article: "https://dev.to/shreyashtripathi/building-a-real-time-multiplayer-drawing-game-with-socketio-rooms-timers-scoring-and-the-bugs-3i4j",
    },
    seo: {
      title: "SketchRace: Real-Time Multiplayer Game | Shreyash Tripathi",
      description: "How the SketchRace game server works: a real-time multiplayer drawing and guessing game with Socket.IO rooms, live strokes, timers and scoring.",
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
          text: "Guesses arrive as chat messages during a 45-second guessing window. With 20 seconds left, the server reveals two random letters of the word, sent only to the guessers. A correct guess earns the guesser 10 points (reduced by 20% after the hint) and the drawer 5, and if everyone gets it the turn ends early with a 10-point drawer bonus.",
        },
        {
          title: "Game flow",
          text: "Each turn starts with a 7-second word-selection countdown, which the drawer can skip (force-end-timer). The pen then rotates to the next player; after everyone has drawn the round advances, and after 3 rounds the server sends final scores and ends the game.",
        },
      ],
      challenges: [
        {
          problem: "Every player's canvas has to show the drawing as it happens; sending whole images after each stroke would be slow and heavy.",
          solution: "The server relays small drawing events for each stroke to the other players in the same room, and each client replays them on its own canvas, so pictures stay in sync with very little data per update.",
        },
        {
          problem: "Timers and turns must be the same for everyone, or one player's clock could run ahead of another's.",
          solution: "The server owns the game clock: it announces the word-selection and guessing phases to the whole room, broadcasts a tick every second, and rotates the drawer after each turn, so every client follows one shared timeline.",
        },
        {
          problem: "Scoring has to reward both sides: players who guess, and the drawer whose sketch made the word guessable.",
          solution: "The server keeps every score. Guessers earn 10 points (20% less if they saw the hint); the drawer earns 5 per correct guess, 10 more if everyone gets it, and an end-of-turn bonus scaled by the share of players who guessed. Scores are broadcast after every change and totalled on the final scoreboard.",
        },
      ],
      results: [
        "Shipped and live at sketchrace.vercel.app as a playable multiplayer game in the browser.",
        "The game runs on 10 real-time Socket.IO event types, covering drawing, canvas clearing, word choice, timers, chat, scoring and game resets.",
        "Separate rooms at /room/[roomId] let multiple matches run at the same time.",
      ],
    },
    tagline: "Real-Time Multiplayer Drawing & Guessing Game",
    description:
      "A live multiplayer drawing game where players take turns sketching and guessing, racing against the clock for points.",
    tech: ["Socket.IO", "Node.js", "Canvas API", "Next.js 15", "React 19", "Tailwind CSS"],
    highlights: [
      "Backend (Shreyash): Express + Socket.IO game server for rooms, live drawing sync, server-owned timers, hints and scoring.",
      "Shared drawing surface on the Canvas API, with strokes broadcast to every player in the room.",
      "Timed rounds with random word choices, chat guessing and a final scoreboard.",
    ],
    accent: "magenta",
  },
  {
    name: "Job Portal",
    slug: "mern-job-portal",
    seo: {
      title: "Job Portal & Job Board App Case Study | Shreyash Tripathi",
      description: "Job portal and job board app by Shreyash Tripathi, built with Next.js 15, TypeScript, JWT auth and REST APIs: job search, applications and a dashboard.",
    },
    links: {
      demo: "https://v0-mern-job-portal-one.vercel.app",
      repo: "https://github.com/Yaminam/jobportal",
      article: "https://dev.to/shreyashtripathi/building-a-job-portal-with-nextjs-15-route-handlers-auth-applications-and-the-schema-behind-them-4of4",
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
          text: "Responsive layouts from mobile to desktop, a dark/light theme that follows the system setting, and loading states while jobs load, built with Tailwind CSS and shadcn/ui components.",
        },
      ],
      challenges: [
        {
          problem: "Job seekers and employers need accounts, and passwords must never be stored or compared in plain text.",
          solution: "The register route hashes passwords with bcrypt (12 salt rounds) and the login route compares hashes before signing a JSON Web Token for the session.",
        },
        {
          problem: "A job portal's data is highly connected: people, companies, jobs, applications, saved jobs and full profiles all reference each other.",
          solution: "A relational PostgreSQL schema with foreign keys ties users, companies, jobs, applications, saved jobs, skills, work experience and education together, with seed data for testing.",
        },
        {
          problem: "A candidate must never be able to apply to the same job twice, even with a double click or a retried request.",
          solution: "The applications API rejects a second application for the same job and user with a clear error, and the database schema backs it up with a UNIQUE (job_id, user_id) constraint; saved jobs use the same rule.",
        },
      ],
      results: [
        "Shipped and live at v0-mern-job-portal-one.vercel.app, with the source public on GitHub.",
        "12 pages, including jobs, companies, dashboard, post a job, profile, resume, pricing, login and sign-up.",
        "6 REST API routes (register, login, jobs, applications, profile, resume) and an 8-table database schema.",
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
    // Internal tool built at work: kept anonymous on purpose (no product/company name, no repo or live link).
    name: "Asset & Credential Vault",
    slug: "asset-credential-vault",
    links: { article: "https://dev.to/shreyashtripathi/building-a-zero-knowledge-vault-in-the-browser-with-webcrypto-no-crypto-libraries-51k4" },
    seo: {
      title: "Zero-Knowledge Asset & Credential Vault | Shreyash Tripathi",
      description: "Zero-knowledge asset, credential and billing manager by Shreyash Tripathi, built with Next.js, Supabase and WebCrypto: QR asset labels and invoice OCR.",
    },
    caseStudy: {
      overview: [
        "An internal tool for the digital agency where Shreyash works, replacing scattered spreadsheets with one place for the team's hardware inventory, service logins, environment variables and vendor bills. Every record is encrypted in the browser under a master password, so the database only ever stores ciphertext.",
        "Shreyash Tripathi built it end to end as a Next.js 15, React 19 and TypeScript app on Supabase (Postgres, Storage and row-level security): about 16,000 lines of TypeScript, with the entire encryption layer on the browser's built-in WebCrypto API and no third-party crypto libraries.",
      ],
      howItWorks: [
        {
          title: "Unlock",
          text: "The master password and a per-vault salt go through PBKDF2-SHA256 with 600,000 iterations to derive an AES-256-GCM key. The key lives only in memory for the session and is dropped when the vault locks; the password never leaves the tab.",
        },
        {
          title: "Asset inventory and QR labels",
          text: "Each hardware asset gets a readable tag built from its category (for example LT-0007 for a laptop) and a printable 70 x 35 mm thermal label with a QR code. Scanning the label with any phone opens a read-only view of what's printed on it, without unlocking the vault.",
        },
        {
          title: "Who has what",
          text: "An allocation view lists every employee with the assets assigned to them, built around the offboarding question: what does this person need to hand back?",
        },
        {
          title: "Credentials and environments",
          text: "Logins and environment variables live alongside the assets. Provider templates pre-fill the exact key names each service expects, .env files can be imported directly, and a generator and health audit score password strength with a deliberately pessimistic entropy estimate.",
        },
        {
          title: "Bills and spend",
          text: "Invoice PDFs are read through pdf.js, with Tesseract OCR as a fallback for scans and photos, and turned into billing entries one at a time or in bulk. Spend dashboards break costs down per currency and never add INR to USD.",
        },
        {
          title: "Sharing",
          text: "One-time share links are bound to a named recipient: the key is derived from a random token in the URL fragment plus the recipient's name, so neither the database nor a link leaked into a chat can read the shared entry.",
        },
      ],
      challenges: [
        {
          problem: "The data has to stay private even from the database that stores it, including whoever administers it.",
          solution: "A zero-knowledge design: titles, usernames, URLs, owners and attached files are all encrypted in the browser with AES-256-GCM before upload, so Postgres and Storage hold only initialisation vectors and ciphertext, with no readable metadata at all.",
        },
        {
          problem: "Asset labels must work when anyone scans them with a phone, without ever exposing the vault.",
          solution: "The QR code carries only what is already printed on the label, inside the URL fragment, which browsers never send to a server. The scan page needs no unlock and makes no network request; labels print from the unlocked tab, with each QR drawn as one SVG path instead of about 5,000 rectangles to keep print jobs fast.",
        },
        {
          problem: "Every dependency that touches plaintext credentials is a supply-chain risk.",
          solution: "The dependency surface is kept small on purpose: a hand-written .xlsx reader built on the browser's DecompressionStream replaces a spreadsheet library, and service logos ship as bundled path data rather than being fetched from a logo CDN, which would reveal which services the vault holds.",
        },
      ],
      results: [
        "Built and deployed for internal use at the agency, covering hardware assets, logins, environment variables and vendor bills in one encrypted app.",
        "About 16,000 lines of TypeScript and 7 database migrations, with encryption on WebCrypto alone (no third-party crypto libraries).",
        "Zero plaintext in the database: PBKDF2-SHA256 (600,000 iterations) and AES-256-GCM for every record and file.",
      ],
      note: "This is an internal tool, so there's no public demo or source code link; details that would identify the company or its data are left out.",
    },
    tagline: "Zero-Knowledge Asset, Credential & Billing Manager",
    description:
      "An internal tool for tracking hardware assets, logins, environment variables and vendor bills, encrypted end to end in the browser so the database never sees plaintext.",
    tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS 4", "Supabase", "PostgreSQL", "WebCrypto", "pdf.js", "Tesseract.js"],
    highlights: [
      "Asset inventory with printable QR labels and a who-has-what view for offboarding.",
      "Zero-knowledge encryption: PBKDF2 + AES-256-GCM in the browser, ciphertext-only database.",
      "Invoice OCR, multi-currency spend tracking and one-time share links bound to a recipient.",
    ],
    accent: "yellow",
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
    label: "Mobile",
    prompt: "mobile --list",
    items: ["React Native", "Expo (EAS, Router)", "Android home-screen widgets", "Push notifications", "Biometric & secure storage"],
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
    a: "Shreyash Tripathi is a Full-Stack Developer and UI/UX Engineer based in Noida, India. He is a Junior Developer, UI/UX at Garage Collective, where he builds production UI with React, Next.js (App Router) and TypeScript for AI-integrated SaaS platforms and marketing sites.",
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
    q: "Is Shreyash Tripathi available for hire or freelance work?",
    a: "Yes, for both. He is open to full-time roles, full-stack, frontend or backend (Noida, Delhi NCR, Uttar Pradesh, Gujarat, remote or with relocation), and to freelance projects: full-stack web apps, backends and APIs, React/Next.js sites, UI/UX builds and AI-integrated features. Details are at shreyashtripathi.in/hire.",
  },
  {
    q: "How can I contact Shreyash Tripathi?",
    a: "Email tshreyash024@gmail.com, or connect on GitHub (github.com/Yaminam) and LinkedIn (linkedin.com/in/shreyashtripathi9). His resume is available at shreyashtripathi.in/Shreyash_Tripathi_Resume.pdf.",
  },
];

export const SITE_URL = "https://shreyashtripathi.in";

/** Projects that have their own /projects/<slug> case-study page. */
export const caseStudies = projects.filter((p): p is Project & { slug: string } => Boolean(p.slug));

/** /hire/seo: secondary hire page for AI-first SEO, AEO and GEO work. Facts only: the proof is this site's own results. */
export const seoServices = {
  seo: {
    title: "AI-First SEO, AEO & GEO Services | Shreyash Tripathi",
    description:
      "Get found on Google and in AI answers (ChatGPT, Perplexity, Gemini). Technical SEO, structured data, llms.txt and AI-crawler tracking by a developer.",
  },
  headline: "AI-first SEO, AEO & GEO, done by a developer",
  intro:
    "I'm Shreyash Tripathi, a full-stack developer who does search work from the code up. SEO gets you ranked on Google; AEO (answer engine optimization) gets your content used as the answer; GEO (generative engine optimization) gets you named and cited by AI assistants like ChatGPT, Perplexity and Gemini. I fix the technical side myself instead of handing you a report.",
  terms: [
    { title: "SEO", text: "Search engine optimization: crawlable pages, the right titles and descriptions, speed and structured data so Google ranks you." },
    { title: "AEO", text: "Answer engine optimization: clear question-and-answer content and FAQ sections so search features and assistants can lift your answer." },
    { title: "GEO", text: "Generative engine optimization: consistent facts about you across the web, llms.txt and open access for AI crawlers, so AI assistants name and cite you." },
  ],
  services: [
    { title: "Technical SEO audit & fixes", text: "Crawlability, indexing, canonical URLs, redirects, sitemaps and robots rules, fixed in your code, not just listed." },
    { title: "SEO for React, Vite & Next.js", text: "Prerendering or server rendering so single-page apps show real content to Google and AI crawlers instead of an empty page." },
    { title: "Structured data (Schema.org)", text: "JSON-LD for people, organizations, products, services, books, FAQs and breadcrumbs, validated for rich results." },
    { title: "AEO: answer-ready content", text: "FAQ and how-to sections written as direct answers, matched to the questions people actually search." },
    { title: "GEO: visibility in AI assistants", text: "llms.txt, AI-crawler access, consistent profiles across GitHub, LinkedIn and dev.to, and tracking of GPTBot, ClaudeBot and PerplexityBot visits in GA4." },
    { title: "Search Console, Bing & GA4 setup", text: "Verification, sitemaps, IndexNow, lead events and a simple monthly read of what's working." },
    { title: "Speed & Core Web Vitals", text: "Lighthouse and Core Web Vitals improvements: image optimization, code splitting and render-blocking fixes." },
    { title: "Data-driven keyword tuning", text: "Titles and descriptions rewritten from your real Search Console queries, so pages that are shown but not clicked start getting clicks." },
  ],
  proof: [
    "Took this site from a parked domain to 15+ indexable pages, with 18,000+ words crawlers can read (from 134).",
    "Lighthouse SEO, accessibility and best practices at 100; mobile performance 30 to 70-80.",
    "Ranking around position 3 for my name within the first month, with clicks growing week over week.",
    "New book pages earned more search clicks than the home page within 2 weeks of launch.",
    "ChatGPT identifies me and links this site when asked who I am.",
  ],
  faqs: [
    { q: "What is the difference between SEO, AEO and GEO?", a: "SEO gets your pages ranked in search results. AEO shapes your content so it can be used directly as an answer. GEO makes AI assistants like ChatGPT, Perplexity and Gemini know about you, name you and cite your site. Good AEO and GEO are built on top of solid technical SEO." },
    { q: "How long until results show?", a: "Indexing usually takes days to a couple of weeks. Ranking for your name or brand often follows within weeks; competitive keywords and AI-assistant mentions take one to three months and depend on links and mentions from other sites." },
    { q: "Do you need access to my code?", a: "For technical fixes, yes: a repository or CMS access. For an audit or a Search Console review, read access is enough." },
    { q: "Can you work on React or Next.js sites?", a: "Yes, that's my main stack. Single-page React and Vite apps often need prerendering before Google and AI crawlers can see their content, and I did exactly that on this site." },
  ],
};

/** /hire page: open to full-time roles and freelance work. Facts only — no invented prices, clients or reviews. */
export const hire = {
  seo: {
    title: "Hire a Frontend & Full-Stack Developer | Shreyash Tripathi",
    description:
      "Hire Shreyash Tripathi, React & Next.js frontend and full-stack developer, for full-time or freelance work in Noida, Delhi NCR, Gujarat or remote.",
  },
  headline: "Hire a Frontend & Full-Stack Developer in India",
  /** Job titles he fits, written out on the page so searches for each title can match. Facts only. */
  roles: [
    { title: "Frontend Developer", text: "React, Next.js and TypeScript interfaces: responsive layouts, design systems, accessibility and fast pages." },
    { title: "Full-Stack Developer", text: "Complete products end to end: UI, REST APIs, auth, databases and deployment on Vercel." },
    { title: "React Developer", text: "Component-driven React apps with hooks, state management, Tailwind CSS, Radix UI and Framer Motion." },
    { title: "Next.js Developer", text: "App Router, server rendering and prerendering, SEO-ready pages and API route handlers." },
    { title: "React Native / Mobile Developer", text: "Android apps with React Native and Expo: role-based screens, offline mode, widgets, push notifications and secure sign-in, as in the finance app I built (under NDA)." },
    { title: "Node.js / Backend Developer", text: "Node.js and Express APIs, JWT auth, Socket.IO real-time servers, PostgreSQL, Supabase and MongoDB." },
    { title: "UI/UX Engineer", text: "Turning designs into pixel-accurate, accessible UI, and improving UX with motion and mobile-first layouts." },
    { title: "Web Developer", text: "Marketing sites, landing pages and SEO for agencies and brands, including AI-powered features." },
    { title: "AI Integration Developer", text: "Adding OpenAI and Anthropic Claude features to products: content agents, chat and automation." },
  ],
  intro:
    "I'm Shreyash Tripathi, a frontend and full-stack developer with a strong UI/UX eye: React, Next.js and TypeScript on the frontend; Node.js, Express, REST APIs, Socket.IO and PostgreSQL/Supabase on the backend. I build complete products for AI-integrated SaaS platforms and marketing sites, and I'm open to full-time roles and freelance projects in Noida, Delhi NCR, Uttar Pradesh and Gujarat, or remotely from anywhere.",
  /** Places served, shown on the page and in the Service schema (areaServed). */
  locations: [
    { name: "Noida", text: "Where I'm based today: on-site, hybrid or freelance." },
    { name: "Delhi NCR", text: "Delhi, Gurugram, Ghaziabad and Faridabad: on-site or hybrid roles and projects." },
    { name: "Uttar Pradesh", text: "Lucknow and across UP: remote-first, with on-site visits when needed." },
    { name: "Gujarat", text: "Ahmedabad and across Gujarat, where I'm originally from: on-site, hybrid or remote." },
    { name: "Remote, India & worldwide", text: "Freelance projects and remote roles for teams anywhere with working-hour overlap with IST." },
  ],
  engagements: [
    {
      title: "Full-time roles",
      text: "Full-stack, frontend or backend roles (React, Next.js, Node.js): on-site or hybrid in Noida, Delhi NCR, Uttar Pradesh or Gujarat, fully remote, or with relocation.",
      reason: "job",
      cta: "hire_full_time",
    },
    {
      title: "Freelance projects",
      text: "Projects for startups, agencies and businesses across India (Noida, Delhi NCR, UP, Gujarat and beyond) and abroad: new builds, redesigns, fixes and ongoing support.",
      reason: "freelance",
      cta: "start_a_project",
    },
  ],
  services: [
    {
      title: "Full-stack web apps",
      text: "Complete products end to end: a Next.js or React frontend, Node.js APIs and a PostgreSQL database, with auth and deployment. Built solo, like a job portal and a zero-knowledge asset and credential manager.",
    },
    {
      title: "Backend & REST APIs",
      text: "Node.js and Express services, REST API design, JWT authentication with bcrypt password hashing, role-based access, file uploads and third-party integrations like Stripe and email.",
    },
    {
      title: "Real-time features",
      text: "Live multiplayer and collaborative features with Socket.IO: rooms, server-owned timers, state sync and scoring, as in the server I built for a real-time drawing game.",
    },
    {
      title: "Databases & auth",
      text: "PostgreSQL and Supabase (row-level security, storage, migrations), MongoDB and Prisma ORM, with data models designed for the product, not bolted on later.",
    },
    {
      title: "React & Next.js frontends",
      text: "Production UI in React, Next.js (App Router) and TypeScript, from components and state to API integration, built across 20+ client and SaaS projects at a digital product agency.",
    },
    {
      title: "UI/UX implementation",
      text: "Accurate builds from designs, design-system consistency, dark mode and mobile overhauls, like rebuilding a 45-page school website for mobile.",
    },
    {
      title: "AI-integrated features",
      text: "OpenAI and Anthropic Claude SDK integrations, from content pipelines to in-app assistants. I built a daily AI content agent that cut manual content work by roughly 40%.",
    },
    {
      title: "Fast, SEO-ready websites",
      text: "Prerendered, accessible sites with structured data and strict security headers, plus performance and SEO fixes for existing React, Vite or Next.js sites. This portfolio went from a mobile Lighthouse score of 30 to 70-80.",
    },
  ],
  process: [
    { title: "Tell me what you need", text: "A role description, or the project, timeline and budget, by email or LinkedIn." },
    { title: "Scope & estimate", text: "For freelance work I reply with a written scope and estimate before anything starts." },
    { title: "Build with previews", text: "You see progress on live preview links, not just at the end." },
    { title: "Launch & handover", text: "Deployment, documentation and a clean handover, with support after launch if you need it." },
  ],
  faqs: [
    {
      q: "Is Shreyash Tripathi available for hire?",
      a: "Yes, for both full-time roles (full-stack, frontend or backend) and freelance projects. He is currently a Junior Developer, UI/UX at Garage Collective in Noida.",
    },
    {
      q: "Where does he work, and does he work remotely?",
      a: "Yes. Freelance work is remote-first for clients anywhere. For full-time roles he is open to on-site or hybrid work in Noida, Delhi NCR, Uttar Pradesh or Gujarat (Ahmedabad), fully remote roles, or relocating.",
    },
    {
      q: "Does he do backend development too?",
      a: "Yes. He is a full-stack developer: Node.js and Express APIs, REST design, JWT authentication, Socket.IO real-time servers, and PostgreSQL, Supabase and MongoDB databases, alongside React and Next.js frontends.",
    },
    {
      q: "Has Shreyash Tripathi written any books?",
      a: "Yes. He wrote the Job-Ready Series, eleven books for developers preparing for interviews and job switches: System Design, DSA in Java, DSA in Python, DSA in C++, DevOps, Cloud (AWS, Azure, GCP), Salesforce, DBMS, Computer Networks, Operating Systems and Full-Stack TypeScript with Next.js. Free previews are at shreyashtripathi.in/books.",
    },
    {
      q: "What kind of freelance projects does he take on?",
      a: "Full-stack web apps, backends and REST APIs, real-time features, React and Next.js websites, UI/UX implementation from designs, AI-integrated features, dashboards and internal tools, and performance or SEO fixes for existing sites.",
    },
    {
      q: "How much does a freelance project cost?",
      a: "It depends on the scope. Share what you need and your timeline, and he replies with a written scope and estimate before any work starts.",
    },
    {
      q: "How do I hire Shreyash Tripathi?",
      a: "Email tshreyash024@gmail.com (the buttons on this page open a ready-made job or project message) or connect on LinkedIn at linkedin.com/in/shreyashtripathi9.",
    },
  ],
};

/**
 * Praise from leadership, quoted from real messages. At the user's request: no names and no
 * company, role only. Text is verbatim apart from joining consecutive messages into sentences.
 * Deliberately not marked up as Review/rating schema (self-hosted, anonymous reviews aren't eligible).
 */
export const testimonials = [
  {
    quote: "The email has come out great. Kudos. Keep up the great work.",
    role: "CEO",
    context: "on a company email newsletter I built",
  },
  {
    quote: "Fantastic job with the website. Keep shining. Wonderful show.",
    role: "Founder",
    context: "on the company website I built with a teammate",
  },
  {
    quote: "This looks amazing.",
    role: "AVP",
    context: "on a school website I delivered for a client",
  },
];

/** A fact rather than a quote: what leadership did after seeing the work. */
export const testimonialNote =
  "After I redesigned the company website, the CEO asked for the same approach on another of the group's brand sites.";
