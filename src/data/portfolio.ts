/**
 * Single source of truth for portfolio content (from resume).
 * Edit here to update the whole site.
 */

export const profile = {
  name: "Shreyash Tripathi",
  handle: "shreyash",
  role: "Full-Stack Dev & AI Enthusiast",
  roles: [
    "Full-Stack Developer",
    "AI / ML Enthusiast",
    "MERN Stack Engineer",
    "Next.js Builder",
    "REST API Designer",
  ],
  location: "Ahmedabad, Gujarat, India",
  email: "tshreyash024@gmail.com",
  phone: "+91 81608 90957",
  phoneHref: "+918160890957",
  github: "https://github.com/Yaminam",
  linkedin:
    "https://www.linkedin.com/in/shreyash-tripathi-96570a251?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  resume: "/Shreyash_Tripathi_Resume.pdf",
  photo: "/shreyash-profile.png",
  summary:
    "Results-driven Computer Science student building full-stack web apps with the MERN stack and Next.js — while diving deep into AI & Machine Learning. I design REST APIs, role-based auth and real-time features, and I'm increasingly applying ML to make modern web products smarter.",
};

export const stats = [
  { value: "2+", label: "Years coding" },
  { value: "40%", label: "Manual work cut by automation" },
  { value: "15+", label: "Tech & tools" },
  { value: "5", label: "Projects shipped" },
];

export const strengths = [
  "Problem Solving",
  "Clean, Efficient Code",
  "Clear Communication",
  "Team Collaboration",
  "Analytical Thinking",
  "Fast Learner",
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
    company: "Garage Productions Pvt. Ltd.",
    role: "AI Trainee",
    period: "Feb 2026 — Present",
    current: true,
    points: [
      "Assist in building and deploying AI-powered features, contributing to smarter and more automated system behavior.",
      "Develop and test intelligent workflow automation pipelines, cutting manual intervention in repetitive processes by 40%.",
      "Collaborate with the engineering team on AI model integration, system architecture, and production deployment.",
    ],
  },
  {
    company: "EduBooks Pvt. Ltd.",
    role: "Web Developer Intern",
    period: "Mar 2024 — Mar 2025",
    points: [
      "Created reusable UI components in React.js, reducing code duplication by 30% and improving development speed across the application.",
      "Developed and integrated REST APIs with Node.js and Express, enabling reliable data flow between frontend and backend services.",
      "Leveraged Prisma ORM with PostgreSQL to streamline database queries, improving maintainability and cutting query complexity significantly.",
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
    name: "Case Cat",
    tagline: "Custom Mobile Cover E-Commerce Platform",
    description:
      "A full-stack e-commerce platform for custom phone cases with secure auth, role-based access and a polished, responsive storefront.",
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
    name: "Heart Disease EDA App",
    tagline: "Interactive ML Data-Exploration App",
    description:
      "An interactive exploratory data analysis app that turns a raw heart-disease dataset into clear, filterable visual insights.",
    tech: ["Python", "Pandas", "Streamlit", "Matplotlib", "Seaborn", "NumPy"],
    highlights: [
      "Built an interactive EDA app with Streamlit for the heart-disease dataset.",
      "Visualized key features with charts and statistical summaries, surfacing correlations.",
      "Enabled dynamic filtering and exploration through interactive widgets.",
    ],
    accent: "purple",
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
    accent: "yellow",
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
    items: ["Java", "JavaScript", "TypeScript", "Python", "C++", "SQL"],
  },
  {
    label: "Frontend",
    prompt: "frontend --list",
    items: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Radix UI"],
  },
  {
    label: "Backend",
    prompt: "backend --list",
    items: ["Node.js", "Express.js", "REST API Design"],
  },
  {
    label: "AI / ML",
    prompt: "aiml --list",
    items: ["TensorFlow", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Streamlit", "EDA"],
  },
  {
    label: "Databases",
    prompt: "databases --list",
    items: ["MongoDB", "MySQL", "Prisma ORM"],
  },
  {
    label: "Tools",
    prompt: "tools --list",
    items: ["Git", "GitHub", "Vercel", "Postman", "VS Code", "Jupyter"],
  },
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
    degree: "B.Tech — Computer Science Engineering",
    period: "2022 — Present",
    current: true,
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
    title: "DSA (Java) & AI/ML Foundations",
    detail: "Certified in Data Structures & Algorithms using Java and AI/ML Foundations.",
    tag: "Certified",
  },
  {
    title: "Summer Analytics 2024",
    detail: "Member of the Consulting & Analytics Club, IIT Guwahati.",
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
