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
  photo: "/shreyash-profile.png",
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
  tagline: string;
  description: string;
  tech: string[];
  highlights: string[];
  accent: "cyan" | "magenta" | "green" | "purple" | "yellow";
};

export const projects: Project[] = [
  {
    name: "PurrCase",
    tagline: "Custom Mobile Cover E-Commerce Platform",
    description:
      "A full-stack e-commerce platform for custom phone cases with secure OAuth, role-based access and a polished, responsive storefront.",
    tech: ["Next.js", "Prisma ORM", "Kinde OAuth", "Tailwind CSS", "Radix UI", "REST API"],
    highlights: [
      "Engineered with Next.js + Prisma ORM and Kinde OAuth, featuring Role-Based Access Control (RBAC) and REST APIs.",
      "Crafted a responsive UI with Tailwind CSS and Radix UI.",
      "Integrated real-time data sync, file uploads, and automated email notifications.",
    ],
    accent: "cyan",
  },
  {
    name: "SketchRace",
    tagline: "Real-Time Multiplayer Drawing & Guessing Game",
    description:
      "A live multiplayer drawing game where players take turns sketching and guessing, racing against the clock for points.",
    tech: ["Socket.IO", "Canvas API", "Next.js 15", "React 19", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Built real-time gameplay with Socket.IO for live sync, dynamic turn rotation and speed-based scoring across players.",
      "Implemented the interactive drawing surface with the Canvas API.",
      "Powered by Next.js 15, React 19 and TypeScript for a fast, typed experience.",
    ],
    accent: "magenta",
  },
  {
    name: "MERN Job Portal",
    tagline: "Full-Stack Recruitment Platform",
    description:
      "A real-time recruitment platform connecting recruiters and candidates with secure auth, an admin dashboard and full application tracking.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "TypeScript", "JWT", "RBAC"],
    highlights: [
      "Built a real-time job portal for employers and candidates with the full MERN stack + TypeScript.",
      "Implemented JWT authentication, role-based access control (RBAC) and secure sessions.",
      "Developed an admin dashboard with analytics and moderation tools; deployed on Vercel.",
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
