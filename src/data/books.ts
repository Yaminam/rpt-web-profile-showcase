/**
 * The Job-Ready Series: Shreyash's own books (all rights reserved).
 * Generated from the PDFs' outlines; covers and free previews live in public/book-files/.
 * Full books are NOT on the site: readers request them by email (free for now).
 * To start selling later, set `price` (shown on the page) and `buyUrl` (Razorpay/Gumroad link) per book.
 */
export type Book = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  blurb: string;
  highlights: string[];
  editions: { label: string; pages: number }[];
  chapters: string[];
  /** How many of `chapters` (from the start) the free preview contains. */
  previewChapters: number;
  previewPages: number;
  seo: { title: string; description: string };
  keywords: string[];
  price?: string;
  buyUrl?: string;
};
export const books: Book[] = [
  {
    "slug": "system-design",
    "title": "System Design: From Zero to Hero",
    "shortTitle": "System Design",
    "tagline": "Textbook for developers",
    "blurb": "Scalable, reliable systems explained in simple language, with facts, humour, activities, 25+ real case studies and a question bank with answers.",
    "highlights": [
      "28 chapters in 5 parts",
      "25+ real system case studies",
      "Question bank with answers"
    ],
    "editions": [
      {
        "label": "Complete",
        "pages": 796
      },
      {
        "label": "Short",
        "pages": 283
      }
    ],
    "chapters": [
      "1. Introduction to System Design",
      "2. Estimation and Numbers Every Engineer Should Know",
      "3. Networking Fundamentals",
      "4. APIs and Communication",
      "5. Authentication, Authorization and Security",
      "6. Relational Databases and SQL",
      "7. NoSQL Databases and Choosing the Right Store",
      "8. Indexes and Storage Engines",
      "9. Scaling and Load Balancing",
      "10. Caching and CDNs",
      "11. Replication",
      "12. Partitioning, Sharding and Consistent Hashing",
      "13. Distributed Systems Fundamentals",
      "14. Distributed Transactions, Idempotency and IDs",
      "15. Message Queues, Pub/Sub and Stream Processing",
      "16. Architecture Styles and Microservices",
      "17. Reliability, Resilience and Rate Limiting",
      "18. Observability and Monitoring",
      "19. Storage Systems, Search and Special Data Structures",
      "20. Real-Time Systems",
      "21. The System Design Interview",
      "22. Case Studies I: Building Blocks",
      "23. Case Studies II: Web Classics",
      "24. Case Studies III: Messaging",
      "25. Case Studies IV: Social and Search",
      "26. Case Studies V: Media and Files",
      "27. Case Studies VI: Location and Booking",
      "28. Case Studies VII: Money and Data",
      "Appendix A: Practice Project: Design Your Own Product",
      "Appendix B: Quick Revision Cheat Sheet",
      "Appendix C: Glossary",
      "Appendix D: Sample Question Paper with Answers",
      "Appendix E: Further Reading and Resources"
    ],
    "previewChapters": 2,
    "previewPages": 62,
    "seo": {
      "title": "System Design Zero to Hero Book | Shreyash Tripathi",
      "description": "System Design: From Zero to Hero, a book for placements and interviews: 25+ case studies, simple language, question bank. Free PDF preview."
    },
    "keywords": [
      "system design book",
      "system design interview",
      "scalability",
      "distributed systems"
    ]
  },
  {
    "slug": "dsa-java",
    "title": "DSA in Java: From Zero to Offer",
    "shortTitle": "DSA (Java)",
    "tagline": "Job-Ready Series, Java edition",
    "blurb": "Start from Java basics, learn 20 patterns, and crack coding rounds. Every problem in simple steps: brute force, the key trick, a dry run, clean code and Big-O.",
    "highlights": [
      "Java basics included",
      "20 problem-solving patterns",
      "Brute force to optimal, with dry runs"
    ],
    "editions": [
      {
        "label": "Java edition",
        "pages": 405
      }
    ],
    "chapters": [
      "0. Java Basics for DSA (Start Here)",
      "1. How to Approach Any DSA Problem",
      "2. Time and Space Complexity",
      "3. Arrays, Strings and Prefix Sums",
      "4. Two Pointers",
      "5. Sliding Window",
      "6. Hashing",
      "7. Binary Search",
      "8. Sorting and Intervals",
      "9. Recursion and Backtracking",
      "10. Linked Lists",
      "11. Stacks, Queues and Monotonic Stack",
      "12. Trees and Binary Search Trees",
      "13. Heaps and Priority Queues",
      "14. Graphs I: BFS, DFS and Topological Sort",
      "15. Graphs II: Shortest Paths, Union-Find and MST",
      "16. Dynamic Programming I: Foundations",
      "17. Dynamic Programming II: Grids, Strings and Subsequences",
      "18. Greedy Algorithms",
      "19. Tries, Bit Manipulation and Math Tricks",
      "20. Must-Do Problem Bank and Pattern Cheat Sheet",
      "Appendix A: Pattern Recognition Cheat Sheet",
      "Appendix B: Big-O and Java Collections Cheat Sheet",
      "Appendix C: Java Code Templates",
      "Appendix D: Glossary"
    ],
    "previewChapters": 2,
    "previewPages": 47,
    "seo": {
      "title": "DSA in Java Book for Placements | Shreyash Tripathi",
      "description": "DSA in Java for placements and coding interviews: Java basics, 20 patterns, dry runs, clean code and Big-O. Free PDF preview of the first chapters."
    },
    "keywords": [
      "dsa in java book",
      "data structures and algorithms java",
      "coding interview patterns"
    ]
  },
  {
    "slug": "dsa-python",
    "title": "DSA in Python: From Zero to Offer",
    "shortTitle": "DSA (Python)",
    "tagline": "Job-Ready Series, Python edition",
    "blurb": "Start from Python basics, learn 20 patterns, and crack coding rounds. Every problem in simple steps: brute force, the key trick, a dry run, clean code and Big-O.",
    "highlights": [
      "Python basics included",
      "20 problem-solving patterns",
      "Brute force to optimal, with dry runs"
    ],
    "editions": [
      {
        "label": "Python edition",
        "pages": 406
      }
    ],
    "chapters": [
      "0. Python Basics for DSA (Start Here)",
      "1. How to Approach Any DSA Problem",
      "2. Time and Space Complexity",
      "3. Arrays, Strings and Prefix Sums",
      "4. Two Pointers",
      "5. Sliding Window",
      "6. Hashing",
      "7. Binary Search",
      "8. Sorting and Intervals",
      "9. Recursion and Backtracking",
      "10. Linked Lists",
      "11. Stacks, Queues and Monotonic Stack",
      "12. Trees and Binary Search Trees",
      "13. Heaps and Priority Queues",
      "14. Graphs I: BFS, DFS and Topological Sort",
      "15. Graphs II: Shortest Paths, Union-Find and MST",
      "16. Dynamic Programming I: Foundations",
      "17. Dynamic Programming II: Grids, Strings and Subsequences",
      "18. Greedy Algorithms",
      "19. Tries, Bit Manipulation and Math Tricks",
      "20. Must-Do Problem Bank and Pattern Cheat Sheet",
      "Appendix A: Pattern Recognition Cheat Sheet",
      "Appendix B: Big-O and Python Collections Cheat Sheet",
      "Appendix C: Python Code Templates",
      "Appendix D: Glossary"
    ],
    "previewChapters": 2,
    "previewPages": 43,
    "seo": {
      "title": "DSA in Python Book for Placements | Shreyash Tripathi",
      "description": "DSA in Python for placements and coding interviews: Python basics, 20 patterns, dry runs, clean code and Big-O. Free PDF preview."
    },
    "keywords": [
      "dsa in python book",
      "data structures and algorithms python",
      "coding interview patterns"
    ]
  },
  {
    "slug": "dsa-cpp",
    "title": "DSA in C++: From Zero to Offer",
    "shortTitle": "DSA (C++)",
    "tagline": "Job-Ready Series, C++ edition",
    "blurb": "Start from C++ and STL basics, learn 20 patterns, and crack coding rounds. Every problem in simple steps: brute force, the key trick, a dry run, clean code and Big-O.",
    "highlights": [
      "C++ and STL basics included",
      "20 problem-solving patterns",
      "100 must-do problems, with answers"
    ],
    "editions": [
      {
        "label": "Short",
        "pages": 256
      }
    ],
    "chapters": [
      "0. C++ and STL Basics for DSA (Start Here)",
      "1. How to Approach Any DSA Problem",
      "2. Time and Space Complexity",
      "3. Arrays, Strings and Prefix Sums",
      "4. Two Pointers",
      "5. Sliding Window",
      "6. Hashing",
      "7. Binary Search",
      "8. Sorting and Intervals",
      "9. Recursion and Backtracking",
      "10. Linked Lists",
      "11. Stacks, Queues and Monotonic Stack",
      "12. Trees and Binary Search Trees",
      "13. Heaps and Priority Queues",
      "14. Graphs I: BFS, DFS and Topological Sort",
      "15. Graphs II: Shortest Paths, Union-Find and MST",
      "16. Dynamic Programming I: Foundations",
      "17. Dynamic Programming II: Grids, Strings and Subsequences",
      "18. Greedy Algorithms",
      "19. Tries, Bit Manipulation and Math Tricks",
      "20. Must-Do Problem Bank and Pattern Cheat Sheet",
      "Appendix A: Pattern Recognition Cheat Sheet",
      "Appendix B: Big-O and C++ STL Cheat Sheet",
      "Appendix C: C++ Code Templates",
      "Appendix D: Glossary"
    ],
    "previewChapters": 2,
    "previewPages": 34,
    "seo": {
      "title": "DSA in C++ Book for Placements | Shreyash Tripathi",
      "description": "DSA in C++ for placements and coding interviews: C++ and STL basics, 20 patterns, 100 must-do problems, dry runs and Big-O. Free PDF preview."
    },
    "keywords": [
      "dsa in c++ book",
      "data structures and algorithms c++",
      "c++ stl for coding interviews"
    ]
  },
  {
    "slug": "devops",
    "title": "DevOps: The Job-Switch Guide",
    "shortTitle": "DevOps",
    "tagline": "Job-Ready Series, Job-Switch edition",
    "blurb": "From Linux to Kubernetes: the 13 tools every DevOps interview asks about, in simple language, with commands, real configs, hands-on labs, production incidents and portfolio projects.",
    "highlights": [
      "13 tools: Linux, Docker, CI/CD, AWS, Terraform, Kubernetes and more",
      "Hands-on labs, real configs and production incidents",
      "120+ interview questions with answers"
    ],
    "editions": [
      {
        "label": "Job-Switch",
        "pages": 364
      }
    ],
    "chapters": [
      "1. DevOps and the Job Switch Roadmap",
      "2. Linux for DevOps",
      "3. Bash Scripting",
      "4. Python for DevOps",
      "5. Networking for DevOps",
      "6. Git and GitHub for DevOps",
      "7. Docker",
      "8. CI/CD with GitHub Actions",
      "9. AWS for DevOps",
      "10. Terraform",
      "11. Ansible",
      "12. Kubernetes I: Core Concepts",
      "13. Kubernetes II: Production",
      "14. Monitoring with Prometheus",
      "15. Dashboards and Alerting with Grafana",
      "16. Real-World Projects and Incident Scenarios",
      "17. DevOps Interview Question Bank",
      "Appendix A: Command Cheat Sheet",
      "Appendix B: Config Templates",
      "Appendix C: Glossary",
      "Appendix D: Job Switch Toolkit"
    ],
    "previewChapters": 2,
    "previewPages": 40,
    "seo": {
      "title": "DevOps Book: Linux to Kubernetes | Shreyash Tripathi",
      "description": "DevOps job-switch guide: Linux, Docker, CI/CD, AWS, Terraform, Kubernetes, Prometheus and Grafana, with labs and 120+ interview Q&A. Free PDF preview."
    },
    "keywords": [
      "devops book",
      "devops interview questions",
      "kubernetes docker terraform guide"
    ]
  },
  {
    "slug": "cloud",
    "title": "Cloud Computing: The Job-Switch Guide",
    "shortTitle": "Cloud (AWS)",
    "tagline": "Job-Ready Series, Job-Switch edition",
    "blurb": "AWS-first and multi-cloud ready: every cloud service interviews ask about, in simple language, from IAM and VPCs to EC2, Lambda, S3 and DynamoDB, plus security, cost and architecture, with free-tier labs, real scenarios and projects.",
    "highlights": [
      "AWS-first, with Azure and GCP for AWS engineers",
      "Free-tier labs, real scenarios and architecture patterns",
      "120+ interview questions with answers"
    ],
    "editions": [
      {
        "label": "Job-Switch",
        "pages": 345
      }
    ],
    "chapters": [
      "1. Cloud Computing and the Cloud Career Roadmap",
      "2. Cloud Foundations: Regions, Pricing and the Well-Architected Framework",
      "3. Identity and Access Management",
      "4. Cloud Networking: VPC in Depth",
      "5. Compute: EC2, Auto Scaling and Load Balancing",
      "6. Storage: S3, EBS, EFS and Backup",
      "7. Databases in the Cloud",
      "8. Containers and Serverless",
      "9. Messaging, Events and Integration",
      "10. DNS, CDN and the Edge",
      "11. Cloud Security and Compliance",
      "12. Monitoring, Logging and Cost Optimization",
      "13. Infrastructure as Code and Automation",
      "14. High Availability, Disaster Recovery and Architecture Patterns",
      "15. Azure and GCP for AWS Engineers",
      "16. Cloud Projects and Real Scenarios",
      "17. Cloud Interview Question Bank",
      "Appendix A: AWS CLI and Service Cheat Sheet",
      "Appendix B: Architecture and Policy Templates",
      "Appendix C: Glossary",
      "Appendix D: Job Switch Toolkit"
    ],
    "previewChapters": 2,
    "previewPages": 42,
    "seo": {
      "title": "Cloud Computing Book: AWS, Azure & GCP | Shreyash Tripathi",
      "description": "AWS-first cloud job-switch guide: IAM, VPC, EC2, S3, Lambda, DynamoDB, security, cost and architecture, with free-tier labs and 120+ interview Q&A."
    },
    "keywords": [
      "cloud computing book",
      "aws interview questions",
      "aws azure gcp guide"
    ]
  },
  {
    "slug": "salesforce",
    "title": "Salesforce: The Job-Switch Guide",
    "shortTitle": "Salesforce",
    "tagline": "Job-Ready Series, Job-Switch edition",
    "blurb": "From Admin to Developer: everything Salesforce interviews ask, in simple language, from the data model, security, Flow and reports to Apex, SOQL, triggers, governor limits, Lightning Web Components, integration and DevOps, with org labs and projects.",
    "highlights": [
      "Admin and Developer tracks in one book",
      "Org labs, real scenarios and projects",
      "120+ interview questions with answers"
    ],
    "editions": [
      {
        "label": "Job-Switch",
        "pages": 360
      }
    ],
    "chapters": [
      "1. The Salesforce Ecosystem and Career Roadmap",
      "2. Platform Basics and the Data Model",
      "3. Security and the Sharing Model",
      "4. Automation with Flow and Declarative Tools",
      "5. Reports, Dashboards and Data Management",
      "6. Sales Cloud and Service Cloud Essentials",
      "7. Apex Fundamentals",
      "8. SOQL and SOSL",
      "9. Apex Triggers and Governor Limits",
      "10. Asynchronous Apex and Testing",
      "11. Lightning Web Components I",
      "12. Lightning Web Components II: Data and Apex",
      "13. Integration",
      "14. Salesforce DevOps and Deployment",
      "15. Experience Cloud, Data Cloud and Agentforce",
      "16. Salesforce Projects and Real Scenarios",
      "17. Salesforce Interview Question Bank",
      "Appendix A: Apex, SOQL and sf CLI Cheat Sheet",
      "Appendix B: Code Templates",
      "Appendix C: Glossary",
      "Appendix D: Job Switch Toolkit"
    ],
    "previewChapters": 2,
    "previewPages": 41,
    "seo": {
      "title": "Salesforce Admin & Developer Book | Shreyash Tripathi",
      "description": "Salesforce job-switch guide, admin to developer: data model, security, Flow, Apex, SOQL, triggers, LWC and integration, with labs and 120+ interview Q&A."
    },
    "keywords": [
      "salesforce book",
      "salesforce interview questions",
      "apex lwc salesforce developer guide"
    ]
  },
  {
    "slug": "ai-engineering",
    "title": "AI Engineering: RAG, GraphRAG & Enterprise Agents",
    "shortTitle": "AI Engineering",
    "tagline": "Job-Ready Series, Job-Switch edition",
    "blurb": "Build what every company wants now: RAG with pgvector, knowledge graphs with Apache AGE, GraphRAG, and permission-aware enterprise agents with MCP, all on PostgreSQL, with real Python code, labs, scenarios and portfolio projects.",
    "highlights": [
      "RAG with pgvector and GraphRAG with Apache AGE, all on PostgreSQL",
      "AI agents, tool calling, LangGraph and MCP",
      "120+ interview questions with answers"
    ],
    "editions": [
      {
        "label": "Job-Switch",
        "pages": 420
      }
    ],
    "chapters": [
      "1. The AI Engineer Job and Roadmap",
      "2. LLMs for Developers",
      "3. Embeddings and Vector Search",
      "4. PostgreSQL for AI Engineers",
      "5. RAG Architecture End to End",
      "6. Ingestion, Parsing and Chunking",
      "7. pgvector in Depth and Hybrid Search",
      "8. Advanced RAG Techniques",
      "9. Evaluating and Debugging RAG",
      "10. Knowledge Graphs Fundamentals",
      "11. Apache AGE: Graphs inside PostgreSQL",
      "12. Building Knowledge Graphs with LLMs",
      "13. GraphRAG",
      "14. Hybrid Retrieval: Vectors and Graphs in One Postgres",
      "15. AI Agents and Tool Calling",
      "16. Frameworks and Protocols: LangChain, LlamaIndex, LangGraph and MCP",
      "17. Multi-Agent Systems and Enterprise Agents",
      "18. Production AI Systems",
      "19. AI Portfolio Projects and Real Scenarios",
      "20. AI Engineering Interview Question Bank",
      "Appendix A: SQL, pgvector and Cypher Cheat Sheet",
      "Appendix B: Code Templates",
      "Appendix C: Glossary",
      "Appendix D: Job Switch Toolkit"
    ],
    "previewChapters": 2,
    "previewPages": 43,
    "seo": {
      "title": "AI Engineering Book: RAG & AI Agents | Shreyash Tripathi",
      "description": "AI engineering job-switch guide: LLMs, embeddings, RAG with pgvector, GraphRAG, AI agents and MCP on PostgreSQL, with Python labs and 120+ interview Q&A."
    },
    "keywords": [
      "ai engineering book",
      "rag interview questions",
      "graphrag ai agents guide"
    ]
  },
  {
    "slug": "dbms",
    "title": "Database Management Systems",
    "shortTitle": "DBMS",
    "tagline": "Job-Ready Series",
    "blurb": "Everything about databases that interviews ask and real jobs use: ER models to normalization, SQL to window functions, transactions to B+ trees. Simple language, worked examples, humour and 120+ interview questions with answers.",
    "highlights": [
      "ER models to B+ trees",
      "SQL from basics to window functions",
      "120+ interview questions with answers"
    ],
    "editions": [
      {
        "label": "Complete",
        "pages": 422
      },
      {
        "label": "Short",
        "pages": 186
      }
    ],
    "chapters": [
      "1. Introduction to DBMS",
      "2. Data Modelling and the ER Model",
      "3. The Relational Model, Keys and Constraints",
      "4. Relational Algebra and Relational Calculus",
      "5. SQL I: Fundamentals",
      "6. SQL II: Joins, Subqueries and Advanced Queries",
      "7. SQL III: Interview Problems, Procedures and Triggers",
      "8. Functional Dependencies and Normalization",
      "9. Transactions and Serializability",
      "10. Concurrency Control",
      "11. Recovery and Durability",
      "12. Indexing, Hashing and File Organization",
      "13. Query Processing and Optimization",
      "14. NoSQL and Distributed Databases",
      "15. Database Security, Administration and Best Practices",
      "16. DBMS and SQL Interview Question Bank",
      "Appendix A: SQL Cheat Sheet",
      "Appendix B: Normalization and Keys Quick Reference",
      "Appendix C: Glossary",
      "Appendix D: Sample Question Paper with Answers"
    ],
    "previewChapters": 2,
    "previewPages": 54,
    "seo": {
      "title": "DBMS Book for Placements & Interviews | Shreyash Tripathi",
      "description": "DBMS for placements and interviews: ER model, normalization, SQL, transactions, indexing and 120+ interview questions with answers. Free PDF preview."
    },
    "keywords": [
      "dbms book",
      "dbms interview questions",
      "sql interview",
      "normalization"
    ]
  },
  {
    "slug": "computer-networks",
    "title": "Computer Networks",
    "shortTitle": "Computer Networks",
    "tagline": "Job-Ready Series",
    "blurb": "Everything about networks that interviews ask and real jobs use: OSI to TCP, subnetting to TLS, ping to Wireshark. Simple language, worked numericals, humour and 100+ interview questions with answers.",
    "highlights": [
      "OSI and TCP/IP to TLS",
      "Worked subnetting numericals",
      "100+ interview questions with answers"
    ],
    "editions": [
      {
        "label": "Complete",
        "pages": 364
      },
      {
        "label": "Short",
        "pages": 164
      }
    ],
    "chapters": [
      "1. Introduction to Computer Networks",
      "2. Network Models: OSI and TCP/IP",
      "3. Physical Layer, Transmission Media and Switching",
      "4. Data Link Layer",
      "5. Network Layer I: IP Addressing and Subnetting",
      "6. Network Layer II: Routing and Supporting Protocols",
      "7. Transport Layer: TCP and UDP",
      "8. Application Layer I: DNS and the Web",
      "9. Application Layer II: Email, File Transfer and Remote Access",
      "10. Network Security",
      "11. Wireless, Mobile and Modern Networks",
      "12. Data Center and Cloud Networking",
      "13. Network Troubleshooting and Tools",
      "14. Putting It Together: What Happens When You Type a URL, and Socket Programming",
      "15. Computer Networks Interview Question Bank",
      "Appendix A: Ports and Protocols Cheat Sheet",
      "Appendix B: Subnetting Quick Reference",
      "Appendix C: Glossary",
      "Appendix D: Sample Question Paper with Answers"
    ],
    "previewChapters": 2,
    "previewPages": 45,
    "seo": {
      "title": "Computer Networks Book for Placements | Shreyash Tripathi",
      "description": "Computer Networks for placements and interviews: OSI, TCP/IP, subnetting, DNS, TLS and 100+ interview questions with answers. Free PDF preview."
    },
    "keywords": [
      "computer networks book",
      "computer networks interview questions",
      "subnetting",
      "osi model"
    ]
  },
  {
    "slug": "operating-systems",
    "title": "Operating Systems",
    "shortTitle": "Operating Systems",
    "tagline": "Job-Ready Series",
    "blurb": "Operating systems for job hunting: processes, threads, scheduling, synchronization, deadlocks, memory, virtual memory, file systems, containers and Linux, with worked numericals and 90+ interview questions with answers.",
    "highlights": [
      "Processes to containers and Linux",
      "Worked scheduling and paging numericals",
      "90+ interview questions with answers"
    ],
    "editions": [
      {
        "label": "Short",
        "pages": 192
      }
    ],
    "chapters": [
      "1. Operating System Basics",
      "2. Processes and IPC",
      "3. Threads and Concurrency",
      "4. CPU Scheduling",
      "5. Synchronization: Mutex, Semaphores and Classic Problems",
      "6. Deadlocks",
      "7. Memory Management and Paging",
      "8. Virtual Memory and Page Replacement",
      "9. File Systems and Disk Management",
      "10. I/O, Virtualization and Containers",
      "11. Linux for Developers",
      "12. Operating Systems Interview Question Bank",
      "Appendix A: Linux Commands Cheat Sheet",
      "Appendix B: Formulas and Numericals Quick Reference",
      "Appendix C: Glossary",
      "Appendix D: Sample Question Paper with Answers"
    ],
    "previewChapters": 2,
    "previewPages": 34,
    "seo": {
      "title": "Operating Systems Book for Placements | Shreyash Tripathi",
      "description": "Operating Systems for placements: processes, threads, scheduling, deadlocks, memory, Linux and 90+ interview questions with answers. Free PDF preview."
    },
    "keywords": [
      "operating systems book",
      "os interview questions",
      "cpu scheduling",
      "deadlocks"
    ]
  },
  {
    "slug": "fullstack-typescript-nextjs",
    "title": "Full-Stack TypeScript and Next.js",
    "shortTitle": "Full-Stack TS & Next.js",
    "tagline": "Job-Ready Series, Compact edition",
    "blurb": "Frontend and backend in one compact book, from basics to advanced: how the web works, HTML, CSS, JavaScript, TypeScript, React, Next.js, Node.js APIs, databases, auth, caching, Docker, performance, security, testing and 100 interview questions with answers.",
    "highlights": [
      "TypeScript, React and Next.js",
      "Node.js APIs, databases, auth and Docker",
      "100 interview questions with answers"
    ],
    "editions": [
      {
        "label": "Compact",
        "pages": 362
      }
    ],
    "chapters": [
      "1. How the Web Works for Developers",
      "2. HTML and CSS Essentials",
      "3. JavaScript Essentials Every Interviewer Asks",
      "4. TypeScript Fundamentals",
      "5. Advanced TypeScript",
      "6. TypeScript in Real Projects",
      "7. React Essentials",
      "8. State Management, Data Fetching and Forms",
      "9. Next.js Fundamentals and the App Router",
      "10. Rendering in Next.js: Server and Client",
      "11. Data Fetching, Server Actions, Route Handlers and Proxy",
      "12. Next.js in Production",
      "13. Node.js Fundamentals",
      "14. Building REST APIs with Express and NestJS",
      "15. Databases for Web Developers",
      "16. Authentication and Authorization on the Backend",
      "17. Caching, Background Jobs and Real-Time",
      "18. Docker, Deployment and DevOps Basics",
      "19. Web Performance and Core Web Vitals",
      "20. Web Security for Frontend and Full-Stack Developers",
      "21. Testing, Tooling and Team Workflow",
      "22. Web Development Interview Question Bank",
      "Appendix A: TypeScript Cheat Sheet",
      "Appendix B: Next.js and Node.js Cheat Sheet",
      "Appendix C: Glossary",
      "Appendix D: Sample Question Paper with Answers"
    ],
    "previewChapters": 2,
    "previewPages": 38,
    "seo": {
      "title": "Full-Stack TypeScript & Next.js Book | Shreyash Tripathi",
      "description": "Full-Stack TypeScript and Next.js for jobs: React, Next.js, Node.js APIs, databases, auth, Docker and 100 interview questions. Free PDF preview."
    },
    "keywords": [
      "next.js book",
      "typescript book",
      "full stack development book",
      "react interview questions"
    ]
  }
];

export const SERIES_NAME = "Job-Ready Series";
export const bookCover = (slug: string) => `/book-files/${slug}-cover.webp`;
export const bookCoverJpg = (slug: string) => `/book-files/${slug}-cover.jpg`;
export const bookPreview = (slug: string) => `/book-files/${slug}-preview.pdf`;

/** "Why I wrote these books": the author's own story (from his own words, no invented details or claims). */
export const seriesStory = {
  heading: "Why I wrote these books",
  paragraphs: [
    "Before placements, my problem wasn't a lack of material. It was too much of it. A playlist for DBMS, a PDF for OS, three websites for DSA, and a new \"must-watch\" video every day. I kept switching sources, kept getting distracted, and never knew if I had covered what interviews actually ask.",
    "What finally worked was putting everything in one place: one clear path per subject, in simple language, with the questions interviewers really ask, plus YouTube for the topics I wanted to see explained visually.",
    "That's the Job-Ready Series. Each book covers one subject end to end, with the concepts, worked examples and interview questions with answers, focused on the skills companies hire developers for in 2026 and the years ahead.",
    "I wrote them for students and early-career developers who want a serious internship or job and are tired of jumping between ten sources. Start with the free preview. If it helps, ask me for the full book.",
  ],
};
