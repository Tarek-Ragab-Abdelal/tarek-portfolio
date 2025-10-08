// Interface definitions
export interface PersonalInfo {
  name: string;
  title: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  links: {
    github: string;
    linkedin: string;
    upwork: string;
  };
}

export interface Skills {
  [category: string]: string[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  achievements: string[];
}

export interface Project {
  title: string;
  company: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Review {
  author: string;
  role: string;
  content: string;
  rating: number;
  company?: string;
  project?: string;
  image?: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
}

export interface Language {
  language: string;
  level: string;
}

// Data exports with type annotations
export const personalInfo: PersonalInfo = {
  name: "Tarek Ragab",
  title: "Full-Stack Software Engineer & Azure Cloud Developer",
  summary: "Experienced Full-Stack Software Engineer specializing in .NET development, React applications, Azure cloud solutions, and scalable data-driven systems. Expert in building high-performance web applications, IoT implementations, and enterprise-grade software solutions. Proven track record in delivering custom software development projects that improve business efficiency, optimize performance, and reduce operational costs for clients worldwide.",
  email: "tarek.madany113@gmail.com",
  phone: "+201090477381",
  location: "Cairo, Egypt",
  links: {
    github: "https://github.com/Tarek-Ragab-Abdelal",
    linkedin: "https://www.linkedin.com/in/tarek-ragab/",
    upwork: "https://www.upwork.com/freelancers/~01f068ac7a77a08223",
  },
};

export const skills: Skills = {
  "Programming Languages": ["C#", "C++", "JavaScript", "TypeScript", "Python", "Dart"],
  "Frameworks & Platforms": [".NET", "Node.js", "Nest.js", "React", "Flutter"],
  "Cloud & Serverless": ["Azure Function Apps", "Azure Service Bus", "Azure Web Hosting"],
  "Data & APIs": ["SQL Server", "PostgreSQL", "RESTful APIs", "Websockets", "Message Queuing"],
  "Version Control & CI/CD": ["Git", "GitHub", "GitHub Actions", "Containerization (Docker)"],
  "Miscellaneous": ["UML", "Documentation", "Markdown", "LaTeX", "Agile", "Scrum", "Waterfall"],
};

export const coreSkills: string[] = ["Web Development", "SQL Databases", "Cloud Solutions", "System Design", "Data Pipelines", "API Design", "System Architecture"];

export const experiences: Experience[] = [
  {
    title: "Software Engineer (Remote)",
    company: "Upwork",
    period: "Jan 2023 - Present",
    achievements: [
      "Delivered full-stack solutions using C#, .NET, IoT integrations, and SQL Server for diverse global clients.",
      "Built automated workflows with Python and Azure Function Apps, reducing data collection time by 10x and cutting manual workload.",
      "Partnered closely with clients to align project scope and deliverables, achieving 95%+ on-time delivery.",
    ],
  },
  {
    title: "Full-Stack Software Engineer",
    company: "RES-VA",
    period: "Jun 2024 - Present",
    achievements: [
      "Delivered 5+ large-scale projects, starting from system design, implementation, documentation, and maintenance.",
      "Built and deployed real-time data applications.",
      "Optimized SQL queries and backend logic, improving API performance by 35% and reducing response latency by 40%.",
    ],
  },
  {
    title: "Mid-Level IoT Firmware Engineer",
    company: "SudoTechs",
    period: "Jun 2022 - Oct 2024",
    achievements: [
      "Designed IoT systems architecture and implemented firmware for a variety of micro-controllers, supporting 20+ industrial devices.",
      "Optimized embedded workflows, reducing device data transmission delays by 25%.",
      "Delivered customized IoT solutions that scaled to handle 2× more connected devices.",
    ],
  },
  {
    title: "IoT Instructor (Part-time)",
    company: "CIC, Cairo",
    period: "Oct 2022 - Oct 2023",
    achievements: [
      "Designed and delivered a practical IoT curriculum for over 100 students.",
      "Increased course satisfaction by 30% by incorporating real-world case studies and hands-on device labs.",
    ],
  },
  {
    title: "Digital Fabrication Trainee",
    company: "Sector B5",
    period: "Jun 2021 - Sep 2021",
    achievements: [
      "Gained practical experience with 3D printing (FDM, SLA) and CNC machinery.",
      "Designed and built an autonomous maze-solver robot that completed obstacle courses 20% faster than baseline models.",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Lead Generation Reporting App",
    company: "RES-VA",
    description: "Developed a reporting platform to visualize and export real-time lead and productivity metrics, cutting report generation time by 3×.",
    technologies: [".NET", "SQL", "Redis", "React", "TypeScript"],
    link: "https://res-va-reporting.com/",
  },
  {
    title: "Loan System Reporting App",
    company: "SANAD Finance",
    description: "Implemented a reporting solution enabling 3× faster query performance and improving cashflow projection accuracy by 25%.",
    technologies: ["SQL", "Python", "Elasticsearch"],
    link: "https://www.upwork.com/jobs/~021926964337378412890"
  },
  {
    title: "End-to-End Data Pipeline",
    company: "RES-VA",
    description: "Built a scalable Python-based pipeline processing 2× more data and automating ingestion, transformation, and export of CRM and dialer records.",
    technologies: ["Python", "Azure Function Apps"],
  },
  {
    title: "Human Resources Management",
    company: "Future of Egypt",
    description: "Developed a responsive HR management platform boosting reporting efficiency by 40%.",
    technologies: ["Flutter Web", "Node.js", "SQL"],
  },
  {
    title: "Licencer Desktop App",
    company: "Boreal Laser Inc.",
    description: "Created a cross-platform licensing management desktop application reducing manual license issuance time by 50%.",
    technologies: ["Dart", "Flutter Desktop", "Rive Design"],
    link:"https://www.upwork.com/jobs/~019b407c3a005474d7"
  },
  {
    title: "IoT Dashboard",
    company: "Boreal Laser Inc.",
    description: "Developed a real-time IoT monitoring dashboard improving sensor data visibility and reducing diagnostic time by 30%.",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "https://www.upwork.com/jobs/~01f89be264ec24bfce", 
  },
];

export const reviews: Review[] = [
  {
    author: "Edward Don Adrenana",
    role: "Product Manager",
    company: "Boreal Laser Inc.",
    project: "ESP32 Web Server for Industrial Gas Sensing",
    content: "I am thoroughly impressed with the outcome of this project and the role Tarek played in its realization. The success of our collaboration has led us to continue our professional relationship with a new venture—an App version of the web server interface. I look forward to what we will achieve with this continued partnership.",
    rating: 5,
    image: "/src/assets/clients/edward.jpg" 
  },
  {
    author: "Chris Byard",
    role: "CTO", 
    company: "Signal Dynamic",
    project: "Azure Certifate Management For IoT Devices  ",
    content: "Tarek was great - very good and thorough communication and successfully completed the work on schedule. Will certainly use again in future.",
    rating: 5,
    image: "/src/assets/clients/chris.jpg" 
  },
  {
    author: "Aser Nabil",
    role: "Product Owner",
    company: "Sudotechs", 
    content: "Tarek's attention to detail and problem-solving skills are remarkable. He transformed our data processing capabilities and delivered a solution that handles 2x more data efficiently. Would definitely work with him again.",
    rating: 5,
  },
  {
    author: "Seif Mostafa",
    role: "Senior Software Engineer",
    company: "RES Va", 
    content: "Tarek demonstrated exceptional expertise in system design and clean architecture principles. His work ensured scalability, maintainability, and performance, setting a strong foundation for our application. Highly recommend his skills.",
    rating: 5,
    // image: "/src/assets/client3.jpg" // Will fallback to initials
  },
  {
    author: "Edward Don Adrenana",
    role: "Product Manager",
    company: "Boreal Laser Inc.",
    project: "Desktop Licencing App",
    content: "Our experience has been immensely positive, a reflection of both the Upwork platform's efficacy and Tarek's exceptional talent and work ethic. This project exemplifies how visionary individuals can transform ideas into exemplary solutions.",
    rating: 5,
    image: "/src/assets/clients/edward.jpg" 
  }
];

export const education: Education = {
  degree: "Bachelor of Telecommunication and Electronics Engineering",
  institution: "Helwan University",
  location: "Cairo, Egypt",
  period: "2018 - 2024",
};

export const languages: Language[] = [
  { language: "Arabic", level: "Native / Bilingual" },
  { language: "English", level: "Full Professional" },
];
