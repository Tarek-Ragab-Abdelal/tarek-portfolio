import { personalInfo, experiences, projects, education, skills } from '@/data/portfolio';

// Generate structured data for person/professional
export const generatePersonStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": personalInfo.name,
    "jobTitle": personalInfo.title,
    "description": personalInfo.summary,
    "email": personalInfo.email,
    "telephone": personalInfo.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": personalInfo.location
    },
    "url": window.location.origin,
    "image": `${window.location.origin}/assets/profile.jpg`,
    "sameAs": [
      personalInfo.links.github,
      personalInfo.links.linkedin,
      personalInfo.links.upwork
    ],
    "knowsAbout": Object.values(skills).flat(),
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": education.institution,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": education.location
      }
    },
    "worksFor": experiences.map(exp => ({
      "@type": "Organization",
      "name": exp.company
    }))
  };
};

// Generate structured data for portfolio/website
export const generateWebsiteStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": `${personalInfo.name} - Portfolio`,
    "url": window.location.origin,
    "description": personalInfo.summary,
    "author": {
      "@type": "Person",
      "name": personalInfo.name
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${window.location.origin}/#search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
};

// Generate structured data for work experience
export const generateWorkExperienceStructuredData = () => {
  return experiences.map(exp => ({
    "@context": "https://schema.org",
    "@type": "WorkHistory",
    "jobTitle": exp.title,
    "employer": {
      "@type": "Organization",
      "name": exp.company
    },
    "startDate": exp.period.split(' - ')[0],
    "endDate": exp.period.includes('Present') ? new Date().toISOString().split('T')[0] : exp.period.split(' - ')[1],
    "description": exp.achievements.join('. ')
  }));
};

// Generate structured data for projects/creative works
export const generateProjectsStructuredData = () => {
  return projects.map(project => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "creator": {
      "@type": "Person",
      "name": personalInfo.name
    },
    "provider": {
      "@type": "Organization",
      "name": project.company
    },
    "url": project.link || window.location.origin,
    "keywords": project.technologies
  }));
};

// Generate breadcrumb structured data
export const generateBreadcrumbStructuredData = (items: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

// Generate FAQ structured data for common questions
export const generateFAQStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What programming languages does Tarek Ragab specialize in?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `I specialize in ${skills["Programming Languages"].join(', ')} with extensive experience in full-stack development.`
        }
      },
      {
        "@type": "Question",
        "name": "What is Tarek Ragab's experience with cloud platforms?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `I have extensive experience with ${skills["Cloud & Serverless"].join(', ')} and have built scalable cloud solutions for various clients.`
        }
      },
      {
        "@type": "Question",
        "name": "How can I contact Tarek Ragab for project collaboration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `You can reach me via email at ${personalInfo.email} or connect with me on LinkedIn at ${personalInfo.links.linkedin}.`
        }
      }
    ]
  };
};