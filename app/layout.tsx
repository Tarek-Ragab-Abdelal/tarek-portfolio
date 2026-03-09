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
    canonical: "/",
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`
    }
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${personalInfo.name} | Full-Stack Engineer`,
    description:
      "SEO-first interactive portfolio highlighting product engineering, cloud systems, and shipped projects.",
    images: [{ url: "/images/profile.jpg", width: 1200, height: 630, alt: `${personalInfo.name} profile photo` }]
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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: personalInfo.name,
      jobTitle: personalInfo.title,
      email: personalInfo.email,
      telephone: personalInfo.phone,
      address: { "@type": "PostalAddress", addressLocality: personalInfo.location },
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
    ...featuredProjects.map((p) => ({
      "@type": "SoftwareSourceCode",
      name: p.title,
      codeRepository: p.repoUrl ?? undefined,
      url: p.liveUrl ?? p.repoUrl ?? SITE_URL,
      programmingLanguage: p.stack.join(", ")
    })),
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer }
      }))
    }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
