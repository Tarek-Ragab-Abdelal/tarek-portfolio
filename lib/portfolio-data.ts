export const SITE_URL = "https://www.tarekragab.com";

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  link?: string;
  highlights: string[];
}

export interface FeaturedProject {
  id: string;
  title: string;
  company: string;
  tagline: string;
  summary: string;
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
  highlights: string[];
}

export interface SkillGroup {
  name: string;
  skills: string[];
}

export interface Review {
  author: string;
  role?: string;
  content: string;
  rating: number;
  company?: string;
  project?: string;
  image?: string;
}

export const personalInfo = {
  name: "Tarek Ragab",
  title: "Full-Stack Software Engineer & Cloud Developer",
  location: "Cairo, Egypt",
  email: "tarek.madany113@gmail.com",
  phone: "+201090477381",
  summary:
    "Full-Stack Software Engineer with 4+ years of experience in .NET, React, Azure, and scalable data-driven solutions. Proven track record in delivering 40+ high-performance web applications and data pipelines that improve efficiency, performance, and reduce operational costs.",
  links: {
    github: "https://github.com/Tarek-Ragab-Abdelal",
    linkedin: "https://www.linkedin.com/in/tarek-ragab/",
    upwork: "https://www.upwork.com/freelancers/~01f068ac7a77a08223"
  }
} as const;

export const upworkBadges = [
  { label: "Top Rated", value: "Upwork" },
  { label: "5-⭐ Rated", value: "Client Feedback" },
  { label: "100% Job Success", value: "Consistent Delivery" }
] as const;

export const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" }
] as const;

export const coreSkills = [
  "Cross platform Applications",
  "Databases",
  "Cloud Solutions",
  "Dashboard Development",
  "Workflows and Automation",
  "System Design",
  "Software Architecture"
] as const;

export const featuredProjects: FeaturedProject[] = [
  {
    id: "gold-ingots-calc",
    title: "Gold Ingots Calculator",
    company: "Personal Product",
    tagline: "Precise calculation experience for gold trading workflows",
    summary:
      "A focused calculator product deployed as a lightweight web app with a clear UX for fast value estimation. The implementation is optimized for quick input, reliable outputs, and low-friction usage on mobile.",
    stack: ["React", "TypeScript", "Responsive UI", "Validation"],
    repoUrl: "https://github.com/Tarek-Ragab-Abdelal/gold_ingots_calc",
    liveUrl: "https://gold.tarekragab.com",
    highlights: [
      "Fast form interactions tuned for repeated use.",
      "Validation-first input model to reduce calculation mistakes.",
      "Clear separation of UI logic and calculation logic."
    ]
  },
  {
    id: "floosy-feen",
    title: "Floosy Feen",
    company: "Personal Product",
    tagline: "Personal finance tracking with actionable visibility",
    summary:
      "A finance-focused web product centered on helping users understand spending movement. The experience emphasizes clarity, frictionless navigation, and practical insights from simple interactions.",
    stack: ["React", "Data Visualization", "State Management", "UX Flows"],
    repoUrl: "https://github.com/Tarek-Ragab-Abdelal/floosy-feen",
    liveUrl: "https://floosy-feen.tarekragab.com",
    highlights: [
      "Dashboard views designed for daily behavior tracking.",
      "Simple IA for quick switching between views.",
      "Foundation ready for advanced budgeting intelligence."
    ]
  },
  {
    id: "arabi-lingo-ai",
    title: "Arabi Lingo AI",
    company: "Personal Product",
    tagline: "Language learning with AI-backed interaction loops",
    summary:
      "A language product aiming to make Arabic learning adaptive and conversational. The architecture is structured for iterative model and prompt improvements.",
    stack: ["AI Product Design", "Language UX", "Prompt Workflows"],
    repoUrl: "https://github.com/Tarek-Ragab-Abdelal/arabi-lingo-ai",
    liveUrl: "https://tarek-ragab-abdelal.github.io/arabi-lingo-ai/",
    highlights: [
      "Conversational learning flow driven by AI prompts.",
      "Design prepared for personalized learning paths.",
      "Clear product direction for expanding educational features."
    ]
  },
  {
    id: "apartment-listing",
    title: "Apartment Listing Platform",
    company: "Personal Product",
    tagline: "Listing workflows and searchable housing inventory",
    summary:
      "A property listing application focused on discoverability and structured listing presentation. Built to scale listing content while keeping browsing and filtering intuitive.",
    stack: ["Frontend Architecture", "Search UX", "Reusable Components"],
    repoUrl: "https://github.com/Tarek-Ragab-Abdelal/apartment-listing",
    highlights: [
      "Structured listing cards for high scannability.",
      "Query and filter model for practical browsing.",
      "Modular UI blocks for future expansion."
    ]
  },
  {
    id: "lead-generation-reporting-app",
    title: "Lead Generation Reporting App",
    company: "RES-VA",
    tagline: "Real-time lead analytics and KPI visibility",
    summary:
      "Developed a reporting platform using .NET, SQL, Redis, React TS to visualize real-time leads and productivity metrics, cutting report generation time by 3x.",
    stack: [".NET", "SQL", "Redis", "React", "TypeScript"],
    highlights: [
      "Reduced reporting turnaround by 3x.",
      "Built real-time visibility for leads and productivity.",
      "Improved data confidence for management decisions."
    ]
  },
  {
    id: "loan-system-reporting-app",
    title: "Loan System Reporting App",
    company: "SANAD Finance",
    tagline: "Faster reporting and stronger cashflow insight",
    summary:
      "Implemented a reporting solution enabling 3x faster query performance and improving cashflow projection accuracy by 25%.",
    stack: ["SQL", "Python", "Elasticsearch", "Docker"],
    liveUrl: "https://www.upwork.com/jobs/~021926964337378412890",
    highlights: [
      "Accelerated heavy financial queries by 3x.",
      "Improved forecast reliability with stronger data modeling.",
      "Delivered production-ready reporting flows for finance teams."
    ]
  },
  {
    id: "end-to-end-data-pipeline",
    title: "End-to-End Data Pipeline",
    company: "RES-VA",
    tagline: "Automation-first pipeline for CRM and dialer data",
    summary:
      "Built a scalable Python-based pipeline processing 2x more data and automating ingestion, transformation, and export of CRM and dialer records.",
    stack: ["Python", "Azure Function Apps", "Azure Service Bus"],
    highlights: [
      "Handled 2x data volumes with stable throughput.",
      "Reduced manual operations via automated stages.",
      "Improved reliability of downstream analytics."
    ]
  },
  {
    id: "human-resources-management",
    title: "Human Resources Management",
    company: "Future of Egypt",
    tagline: "Responsive HR platform with reporting improvements",
    summary:
      "Developed a responsive HR management platform boosting reporting efficiency by 40%.",
    stack: ["Flutter Web", "Node.js", "SQL Server", "Views and Procedures"],
    highlights: [
      "Delivered responsive workflows for HR operations.",
      "Improved reporting efficiency by 40%.",
      "Built maintainable backend and query patterns."
    ]
  },
  {
    id: "licencer-desktop-app",
    title: "Licencer Desktop App",
    company: "Boreal Laser Inc.",
    tagline: "Cross-platform licensing with secure validation",
    summary:
      "Created a cross-platform licensing management desktop application reducing manual license issuance time by 50%.",
    stack: ["Dart", "Flutter Desktop", "Rive Design"],
    liveUrl: "https://www.upwork.com/jobs/~019b407c3a005474d7",
    highlights: [
      "Cut manual license issuance time by 50%.",
      "Integrated API-based validation and secure flows.",
      "Improved operator efficiency with better UX."
    ]
  },
  {
    id: "iot-dashboard",
    title: "IoT Dashboard",
    company: "Boreal Laser Inc.",
    tagline: "Real-time sensor monitoring for faster diagnostics",
    summary:
      "Developed a real-time IoT monitoring dashboard using Vanilla HTML, CSS, JS, improving sensor data visibility and reducing diagnostic time by 30%.",
    stack: ["HTML", "CSS", "JavaScript", "C++", "ESP32"],
    liveUrl: "https://www.upwork.com/jobs/~01f89be264ec24bfce",
    highlights: [
      "Visualized live IoT telemetry with low overhead.",
      "Reduced diagnostic effort by 30%.",
      "Connected embedded and UI layers for real-time troubleshooting."
    ]
  },
  {
    id: "industrial-web-dashboard",
    title: "Industrial Web Dashboard",
    company: "Graduation Project",
    tagline: "Industrial process visibility with responsive UI",
    summary:
      "Built an industrial process visualization tool using Node.js and React.js, boosting operational response times.",
    stack: ["Node.js", "React.js", "GitHub Actions"],
    highlights: [
      "Improved response times with clearer industrial state views.",
      "Implemented component-driven dashboard architecture.",
      "Automated deployment steps with GitHub Actions."
    ]
  },
  {
    id: "maze-solver-robot-pi-bot",
    title: "Maze Solver Robot pi-bot",
    company: "Sector B5",
    tagline: "Autonomous robotics firmware and algorithm design",
    summary:
      "Designed and programmed an autonomous robot using C++, achieving first place in the program competition.",
    stack: ["C++", "Arduino", "Robotics"],
    highlights: [
      "Implemented navigation logic in constrained hardware.",
      "Optimized behavior for faster maze resolution.",
      "Won first place in project competition."
    ]
  }
];

export const experiences: ExperienceItem[] = [
  {
    role: "Software Engineer (Part-time)",
    company: "White Space Solutions",
    link: "https://www.whitespacesolutions.ai/",
    period: "Apr 2026 - Present",
    highlights: [
      "Initiating and maintaining AI-based automation pipelines.",
      "Building web-based applications.",
      "Participating in business and product requirements.",
      "Contributing to system design and CI/CD pipelines.",
      "Coordinating with clients on system features and requirements."
    ]
  },
  {
    role: "Senior Software Engineer",
    company: "Limaz Inc.",
    link: "https://limaz.co/",
    period: "Dec 2025 - Present",
    highlights: [
      "Leading development of a scalable SaaS platform for inventory management using Node.js, Next.js, and GCP.",
      "Implemented CI/CD pipelines with GitHub Actions, reducing deployment time by 90%.",
      "Collaborated on product design to align technical solutions with business goals.",
      "Mentored junior engineers and established coding standards to improve code quality."
    ]
  },
  {
    role: "AI Automation Engineer (Freelance)",
    company: "We Buy Any Vegas House",
    link: "https://webuyanyvegashouse.com/",
    period: "Nov 2025 - Apr 2026",
    highlights: [
      "Architected and deployed custom n8n nodes to bridge complex data gaps between REST APIs and enterprise platforms.",
      "Led the full-scale migration of legacy workflows from Zapier and Make.com to n8n, improving system reliability and reducing technical debt.",
      "Engineered modular, high-performance automation frameworks ensuring clean, maintainable, and scalable backend structures.",
      "Integrated cross-platform ecosystems, including WordPress/Gravity Forms and Podio, to automate mission-critical business processes.",
      "Optimized API data flows by implementing advanced error handling, rate-limit management, and rigorous validation protocols."
    ]
  },
  {
    role: "Full-Stack Software Engineer",
    company: "RES-VA",
    link: "https://res-va.com/",
    period: "Jun 2024 - Dec 2025",
    highlights: [
      "Built full-stack solutions using React.js, C#, .NET, and SQL Server, streamlining KPI tracking and data management.",
      "Automated workflows with Azure Function Apps and Service Bus, reducing data collection time by 10x.",
      "Implemented deployment pipelines improving maintainability and version traceability.",
      "Collaborated on the ERD design for a multi-tenant file management system."
    ]
  },
  {
    role: "Database Engineer (Upwork Freelance)",
    company: "Sanad Finance",
    period: "Jun 2025 - Nov 2025",
    highlights: [
      "Implemented Python data migration scripts transferring data from SQL Server to PostgreSQL with restructured schema and constraints.",
      "Designed and optimized materialized views and complex CTEs for reporting dashboards.",
      "Built and configured an integrated ELK stack to visualize performance analytics directly from PostgreSQL.",
      "Improved data reliability and query performance by 30%."
    ]
  },
  {
    role: "Embedded IoT Engineer (Upwork Freelance)",
    company: "Boreal Laser Inc.",
    period: "Jun 2023 - Dec 2023",
    link: "https://www.upwork.com/jobs/~01f89be264ec24bfce",
    highlights: [
      "Developed firmware for multi-sensor IoT devices ensuring secure communication and stable real-time telemetry.",
      "Built a lightweight IoT dashboard using Vanilla JS, HTML, and CSS to visualize live sensor data, reducing diagnostic time by 30%."
    ]
  },
  {
    role: "Desktop App Developer (Upwork Freelance)",
    company: "Boreal Laser Inc.",
    period: "Feb 2024 - Apr 2024",
    link: "https://www.upwork.com/jobs/~019b407c3a005474d7",
    highlights: [
      "Built a cross-platform Flutter Desktop licensing application integrated with APIs and hardware-based encryption.",
      "Reduced manual license issuance time by 50% through automated validation workflows and local caching."
    ]
  },
  {
    role: "Embedded IoT Engineer (Upwork Freelance)",
    company: "Signal Dynamic",
    period: "Apr 2023 - Jun 2023",
    highlights: [
      "Developed firmware for a Universal IoT Module enabling secure bidirectional communication via Azure IoT Hub.",
      "Implemented OTA updates and telemetry pipelines supporting predictive maintenance.",
      "Designed device provisioning and cloud event routing for scalable IoT deployments."
    ]
  },
  {
    role: "Mid-Level IoT Firmware Engineer (Full-time)",
    company: "SudoTechs",
    period: "Jun 2022 - Oct 2024",
    link: "https://sudotechs.com/",
    highlights: [
      "Created IoT systems architecture and implemented firmware for 20+ industrial devices.",
      "Optimized embedded workflows, reducing data transmission delays by 80%.",
      "Delivered scalable IoT solutions handling 2x more connected devices."
    ]
  },
  {
    role: "IoT Instructor (Part-time)",
    company: "CIC, Cairo",
    period: "Oct 2022 - Oct 2023",
    link: "https://www.cic-cairo.edu.eg/",
    highlights: [
      "Structured and delivered a hands-on IoT curriculum for 200+ students.",
      "Conducted 80+ hours of workshops and lab sessions focusing on microcontrollers and IoT system design."
    ]
  },
  {
    role: "Digital Fabrication Trainee (Internship)",
    company: "Sector B5",
    period: "Jun 2021 - Sep 2021",
    link: "https://www.linkedin.com/company/sector-b5/posts/?feedView=all",
    highlights: [
      "Gained practical experience with 3D printing (FDM, SLA) and CNC machining.",
      "Built an autonomous maze-solving robot achieving 20% faster navigation than baseline models."
    ]
  }
];

export const reviews: Review[] = [
  {
    author: "Casey Ryan",
    company: "We Buy Any Vegas House",
    content:
      "Tarek is good at communication and planning the solution based on the situation and the requirements. Looking forward to continuing the collaboration. Hard to find talent as good as him and as competent. HIGHLY recommend.",
    rating: 5
  },
  {
    author: "Abdulrahaman Alzamil",
    company: "Sanad Finance",
    content:
      "Tarek is a fantastic developer. He took on a project that grew from simple reporting into a full database migration and executed it perfectly. He managed the data mapping and scripting effortlessly, resulting in a successful launch. A pleasure to work with him.",
    rating: 5
  },
  {
    author: "Edward Don Adrenana",
    role: "Senior Software Engineer",
    company: "Boreal Laser Inc.",
    project: "ESP32 Web Server for Industrial Gas Sensing",
    content:
      "I am thoroughly impressed with the outcome of this project and the role Tarek played in its realization. The success of our collaboration has led us to continue our professional relationship with a new venture—an app version of the web server interface. I look forward to what we will achieve with this continued partnership.",
    rating: 5,
    image: "/images/clients/edward.jpg"
  },
  {
    author: "Chris Byard",
    role: "CTO",
    company: "Signal Dynamic",
    project: "Azure Certificate Management for IoT Devices",
    content:
      "Tarek was great - very good and thorough communication and successfully completed the work on schedule. Will certainly use again in future.",
    rating: 5,
    image: "/images/clients/chris.jpg"
  },
  {
    author: "Aser Nabil",
    role: "Product Owner",
    company: "SudoTechs",
    content:
      "Tarek's attention to detail and problem-solving skills are remarkable. He transformed our data processing capabilities and delivered a solution that handles 2x more data efficiently. Would definitely work with him again.",
    rating: 5
  },
  {
    author: "Seif Mostafa",
    role: "Senior Software Engineer",
    company: "RES-VA",
    content:
      "Tarek demonstrated exceptional expertise in system design and clean architecture principles. His work ensured scalability, maintainability, and performance, setting a strong foundation for our application. Highly recommend his skills.",
    rating: 5
  },
  {
    author: "Tim Ho",
    role: "Product Owner",
    company: "Boreal Laser Inc.",
    project: "Desktop Licensing App",
    content:
      "Our experience has been immensely positive, a reflection of both the Upwork platform's efficacy and Tarek's exceptional talent and work ethic. This project exemplifies how visionary individuals can transform ideas into exemplary solutions.",
    rating: 5
  }
];

export const skillGroups: SkillGroup[] = [
  {
    name: "Programming Languages",
    skills: ["C#", "C++", "JavaScript", "TypeScript", "Python", "Dart"]
  },
  {
    name: "Frameworks & Platforms",
    skills: [".NET", "Node.js", "Nest.js", "React", "Flutter"]
  },
  {
    name: "Cloud & Serverless",
    skills: ["Azure Function Apps", "Azure Service Bus", "Azure Web Hosting", "Azure IoT Hub", "ELK Stack"]
  },
  {
    name: "Data & APIs",
    skills: ["SQL Server", "PostgreSQL", "RESTful APIs", "WebSockets", "Message Queuing", "Data Migration", "ETL Pipelines"]
  },
  {
    name: "Embedded & IoT",
    skills: ["ESP32", "STM32", "C++", "MQTT", "OTA Updates", "Secure Firmware", "Device Provisioning"]
  },
  {
    name: "AI & Automation",
    skills: ["AI Automation", "n8n", "Zapier", "Make.com", "Custom n8n Nodes", "Webhooks", "WordPress", "Gravity Forms", "Podio"]
  },
  {
    name: "Version Control & CI/CD",
    skills: ["Git", "GitHub", "GitHub Actions"]
  },
  {
    name: "Miscellaneous",
    skills: ["UML", "Documentation Practices", "Markdown", "LaTeX", "Agile", "Scrum", "Waterfall"]
  }
];

export const allSkills = Array.from(new Set(skillGroups.flatMap((group) => group.skills)));

export const faqs = [
  {
    question: "What kind of projects does Tarek build?",
    answer:
      "I focus on full-stack systems, analytics products, cloud automation workflows, and selected AI or IoT products with clear business impact."
  },
  {
    question: "Is Tarek available for freelance or remote work?",
    answer:
      "Yes. I am available for remote freelance collaborations and product-focused engineering engagements."
  },
  {
    question: "Where can I see live products and source code?",
    answer:
      "Featured projects include live deployments and repositories, including Gold Ingots Calculator, Floosy Feen, Apartment Listing, and Arabi Lingo AI."
  }
] as const;
