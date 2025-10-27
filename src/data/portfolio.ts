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
  link?: string;
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
  summary: "Full-Stack Software Engineer with 4+ years of experience in .NET, React, Azure, and scalable data-driven solutions. Proven track record in delivering 40+ high-performance web applications and data pipelines that improve efficiency, performance, and reduce operational costs.",
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
  "Cloud & Serverless": ["Azure Function Apps", "Azure Service Bus", "Azure Web Hosting", "Azure IoT Hub", "ELK Stack"],
  "Data & APIs": ["SQL Server", "PostgreSQL", "RESTful APIs", "WebSockets", "Message Queuing", "Data Migration", "ETL Pipelines"],
  "Embedded & IoT": ["ESP32", "STM32", "C++", "MQTT", "OTA Updates", "Secure Firmware", "Device Provisioning"],
  "Version Control & CI/CD": ["Git", "GitHub", "GitHub Actions"],
  "Miscellaneous": ["UML", "Documentation Practices", "Markdown", "LaTeX", "Agile", "Scrum", "Waterfall"],
};

export const coreSkills: string[] = [
    "Cross platform Applications", "Databases", "Cloud Solutions", 
    "Dashboard Development", "Workflows and Automation", 
    "System Design", "Software Architecture", 
];

export const experiences: Experience[] = [
  {
    title: "Full-Stack Software Engineer",
    company: "RES-VA",
    link: "https://res-va.com/",
    period: "Jun 2024 - Present",
    achievements: [
      "Built full-stack solutions using React.js, C#, .NET, and SQL Server, streamlining KPI tracking and data management.",
      "Automated workflows with Azure Function Apps and Service Bus, reducing data collection time by 10×.",
      "Implemented deployment pipelines improving maintainability and version traceability.",
      "Collaborated on the ERD design for a multi-tenant file management system.",
    ],
  },
  {
    title: "Database Engineer (Upwork Freelance)",
    company: "Sanad Finance",
    period: "Jun 2024 - Present",
    achievements: [
      "Implemented Python data migration scripts transferring data from SQL Server to PostgreSQL with restructured schema and constraints.",
      "Designed and optimized materialized views and complex CTEs for reporting dashboards.",
      "Built and configured an integrated ELK (Elasticsearch, Logstash, Kibana) stack to visualize performance analytics directly from PostgreSQL.",
      "Improved data reliability and query performance by 30%.",
    ],
  },
  {
    title: "Embedded IoT Engineer (Upwork Freelance)",
    company: "Boreal Laser Inc.",
    period: "Jun 2023 - Dec 2023",
    link: "https://www.upwork.com/jobs/~01f89be264ec24bfce",
    achievements: [
      "Developed firmware for multi-sensor IoT devices ensuring secure communication and stable real-time telemetry.",
      "Built a lightweight IoT dashboard using Vanilla JS, HTML, and CSS to visualize live sensor data, reducing diagnostic time by 30%.",
    ],
  },
  {
    title: "Desktop App Developer (Upwork Freelance)",
    company: "Boreal Laser Inc.",
    period: "Feb 2024 - Apr 2024",
    link: "https://www.upwork.com/jobs/~019b407c3a005474d7",
    achievements: [
      "Built a cross-platform Flutter Desktop licensing application integrated with APIs and hardware-based encryption.",
      "Reduced manual license issuance time by 50% through automated validation workflows and local caching.",
    ],
  },
  {
    title: "Embedded IoT Engineer (Upwork Freelance)",
    company: "Signal Dynamic",
    period: "Apr 2023 - Jun 2023",
    achievements: [
      "Developed firmware for a Universal IoT Module enabling secure bidirectional communication via Azure IoT Hub.",
      "Implemented OTA (Over-the-Air) updates and telemetry pipelines supporting predictive maintenance.",
      "Designed device provisioning and cloud event routing for scalable IoT deployments.",
    ],
  },
  {
    title: "Mid-Level IoT Firmware Engineer (Full-time)",
    company: "SudoTechs",
    period: "Jun 2022 - Oct 2024",
    link: "https://sudotechs.com/",
    achievements: [
      "Created IoT systems architecture and implemented firmware for 20+ industrial devices.",
      "Optimized embedded workflows, reducing data transmission delays by 80%.",
      "Delivered scalable IoT solutions handling 2× more connected devices.",
    ],
  },
  {
    title: "IoT Instructor (Part-time)",
    company: "CIC, Cairo",
    period: "Oct 2022 - Oct 2023",
    link: "https://www.cic-cairo.edu.eg/",
    achievements: [
      "Structured and delivered a hands-on IoT curriculum for 200+ students.",
      "Conducted 80+ hours of workshops and lab sessions focusing on microcontrollers and IoT system design.",
    ],
  },
  {
    title: "Digital Fabrication Trainee (Internship)",
    company: "Sector B5",
    period: "Jun 2021 - Sep 2021",
    link: "https://www.linkedin.com/company/sector-b5/posts/?feedView=all",
    achievements: [
      "Gained practical experience with 3D printing (FDM, SLA) and CNC machining.",
      "Built an autonomous maze-solving robot achieving 20% faster navigation than baseline models.",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Lead Generation Reporting App",
    company: "RES-VA",
    description: "Developed a reporting platform using .NET, SQL, Redis, React TS to visualize real-time leads and productivity metrics, cutting report generation time by 3×.",
    technologies: [".NET", "SQL", "Redis", "React", "TypeScript"],
  },
  {
    title: "Loan System Reporting App",
    company: "SANAD Finance",
    description: "Implemented a reporting solution enabling 3× faster query performance and improving cashflow projection accuracy by 25%.",
    technologies: ["SQL", "Python", "Elasticsearch", "Docker"],
    link: "https://www.upwork.com/jobs/~021926964337378412890"
  },
  {
    title: "End-to-End Data Pipeline",
    company: "RES-VA",
    description: "Built a scalable Python-based pipeline processing 2× more data and automating ingestion, transformation, and export of CRM and dialer records.",
    technologies: ["Python", "Azure Function Apps", "Azure Service Bus"],
  },
  {
    title: "Human Resources Management",
    company: "Future of Egypt",
    description: "Developed a responsive HR management platform boosting reporting efficiency by 40%.",
    technologies: ["Flutter Web", "Node.js", "SQL Server", "Views and Procdures"],
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
    description: "Developed a real-time IoT monitoring dashboard using Vanilla HTML, CSS, JS, improving sensor data visibility and reducing diagnostic time by 30%.",
    technologies: ["HTML", "CSS", "JavaScript", "C++", "ESP32"],
    link: "https://www.upwork.com/jobs/~01f89be264ec24bfce", 
  },
  {
    title: "Industrial Web Dashboard",
    company: "Graduation Project",
    description: "Built an industrial process visualization tool using Node.js, React.js, boosting operational response times.",
    technologies: ["Node.js", "React.js", "GitHub Acions"],
  },
  {
    title: "Maze Solver Robot pi-bot",
    company: "Sector B5",
    description: "Designed and programmed an autonomous robot using C++, achieving the first place in the program's competition.",
    technologies: ["C++", "Arduino", "Robotics"],
  },
];


import chrisImg from '@/assets/clients/chris.jpg';
import edwardImg from '@/assets/clients/edward.jpg';
import seifImg from '@/assets/clients/seif.jpg';
import zaneImg from '@/assets/clients/zane.jpg';


export const reviews: Review[] = [
  {
    author: "Edward Don Adrenana",
    role: "Senior Software Engineer",
    company: "Boreal Laser Inc.  (Upwork)",
    project: "Industrial Gas Sensing Dashboard",
    content: "I am thoroughly impressed with the outcome of this project and the role Tarek played in its realization. The success of our collaboration has led us to continue our professional relationship with a new venture—an App version of the web server interface. I look forward to what we will achieve with this continued partnership.",
    rating: 5,
    image: edwardImg
  },
  {
    author: "Chris Byard",
    role: "CTO", 
    company: "Signal Dynamic (Upwork)",
    project: "Azure Certifate Management For IoT Devices  ",
    content: "Tarek was great - very good and thorough communication and successfully completed the work on schedule. Will certainly use again in future.",
    rating: 5,
    image: chrisImg
  },
  // {
  //   author: "Zane White",
  //   role: "CEO",
  //   company: "RES Va", 
  //   content: "Tarek is a highly skilled software engineer with a strong work ethic and attention to detail. He consistently delivers high-quality work on time and within budget. His expertise in system design and architecture has been invaluable to our projects. I highly recommend Tarek for any software development needs.",
  //   rating: 5,
  //   image: zaneImg
  // },
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
    image: seifImg
  },
  {
    author: "Tim Ho",
    role: "Product Owner",
    company: "Boreal Laser Inc. (Upwork)",
    project: "Desktop Licencing App",
    content: "Our experience has been immensely positive, a reflection of both the Upwork platform's efficacy and Tarek's exceptional talent and work ethic. This project exemplifies how visionary individuals can transform ideas into exemplary solutions.",
    rating: 5,
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
