import { ThemeProvider } from "next-themes";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import ContactSection from "@/components/sections/ContactSection";
import SEOHead from "@/components/SEO/SEOHead";
import { 
  generatePersonStructuredData, 
  generateWebsiteStructuredData,
  generateFAQStructuredData 
} from "@/components/SEO/StructuredData";
import { personalInfo } from "@/data/portfolio";

const Index = () => {
  const combinedStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      generatePersonStructuredData(),
      generateWebsiteStructuredData(),
      generateFAQStructuredData()
    ]
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SEOHead
        title={`${personalInfo.name} - ${personalInfo.title} | Portfolio`}
        description={`${personalInfo.summary} Based in ${personalInfo.location}. Available for freelance projects and full-time opportunities.`}
        keywords="Full-Stack Developer, Software Engineer, .NET Developer, React Developer, Azure Cloud Engineer, TypeScript Expert, C# Developer, Cairo Egypt, Remote Work, Freelancer, Upwork Developer"
        jsonLd={combinedStructuredData}
      />
      <div className="min-h-screen">
        <Navbar />
        <main role="main">
          <HeroSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <ReviewsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
