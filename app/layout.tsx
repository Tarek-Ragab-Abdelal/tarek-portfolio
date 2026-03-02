import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL, faqs, featuredProjects, personalInfo } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${personalInfo.name} | Full-Stack Engineer`,
    template: `%s | ${personalInfo.name}`
  },
  description:
    "Portfolio of Tarek Ragab, full-stack engineer focused on data-intensive products, cloud automation, and interactive web experiences.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${personalInfo.name} | Full-Stack Engineer`,
    description:
      "SEO-first interactive portfolio highlighting product engineering, cloud systems, and shipped projects.",
    images: [
      {
        url: "/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} profile photo`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} | Full-Stack Engineer`,
    description:
      "SEO-first interactive portfolio highlighting product engineering, cloud systems, and shipped projects.",
    images: ["/images/profile.jpg"]
  },
  keywords: [
    "Tarek Ragab",
    "Full-Stack Engineer",
    "Next.js portfolio",
    ".NET developer",
    "Azure developer",
    "React developer",
    "Cairo software engineer"
  ]
};

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: personalInfo.name,
      jobTitle: personalInfo.title,
      email: personalInfo.email,
      telephone: personalInfo.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: personalInfo.location
      },
      url: SITE_URL,
      sameAs: [personalInfo.links.github, personalInfo.links.linkedin, personalInfo.links.upwork]
    },
    {
      "@type": "WebSite",
      name: `${personalInfo.name} Portfolio`,
      url: SITE_URL,
      description: personalInfo.summary,
      inLanguage: "en"
    },
    ...featuredProjects.map((project) => ({
      "@type": "SoftwareSourceCode",
      name: project.title,
      codeRepository: project.repoUrl ?? undefined,
      url: project.liveUrl ?? project.repoUrl ?? SITE_URL,
      programmingLanguage: project.stack.join(", ")
    })),
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
        />
      </body>
    </html>
  );
}
