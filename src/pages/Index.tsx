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
import SiteMap from "@/components/SEO/SiteMap";
import SEOFAQSection from "@/components/SEO/SEOFAQSection";
import { 
  generatePersonStructuredData, 
  generateWebsiteStructuredData,
  generateFAQStructuredData 
} from "@/components/SEO/StructuredData";
import { personalInfo, coreSkills } from "@/data/portfolio";

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
        title={`${personalInfo.name} - ${personalInfo.title}`}
        description={
          `Tarek Ragab, Software Engineer focused on ${coreSkills.join(',')} Based in ${personalInfo.location}.`}
        image="/src/assets/profile.jpg"
        url={window.location.href}

        type="website"
        keywords="
          Tarek, Tarek Ragab, Tarek Ragab Portfolio, Eng Tarek Ragba, Eng Tarek, Eng Tarek Ragab Portfolio, Eng. Taerek Ragab, 
          Tarek Ragab CV, Tarek Ragab Resume, Tarek Ragab Software Engineer, Tarek Ragab Developer,
          Backend Developer, Frontend Developer, Web Developer, IoT Developer, 
          Full-Stack Developer, Software Engineer, 
          .NET Developer, React Developer, Azure Cloud Engineer, TypeScript Expert, C# Developer, 
          Cairo, Cairo Egypt, Remote Work, 
          Freelancer, Upwork Developer"
        jsonLd={combinedStructuredData}
      />
      <div className="min-h-screen">
        <Navbar />
        
        {/* SEO Content - Hidden for users but visible to search engines */}
        <aside className="sr-only" aria-label="SEO Content">
          <h1>Tarek Ragab - Full-Stack Software Engineer Portfolio</h1>
          <p>
            Welcome to the professional portfolio of Tarek Ragab, an experienced Full-Stack Software Engineer 
            specializing in .NET development, React applications, and Azure cloud solutions. Based in Cairo, Egypt, 
            Tarek offers comprehensive software development services including web application development, 
            IoT solutions, and data pipeline implementations.
          </p>
          
          <h2>Professional Software Development Services</h2>
          <p>
            As a certified software engineer with extensive experience in modern web technologies, Tarek provides 
            end-to-end software solutions for businesses worldwide. His expertise includes full-stack web development 
            using .NET and React, cloud infrastructure on Microsoft Azure, and custom IoT implementations for 
            industrial applications.
          </p>
          
          <h3>Technical Expertise and Skills</h3>
          <p>
            Tarek's technical proficiency spans multiple programming languages including C#, TypeScript, JavaScript, 
            and Python. He specializes in building scalable web applications using .NET framework, Node.js, and 
            modern frontend frameworks like React. His cloud expertise includes Azure Function Apps, Azure Service Bus, 
            and comprehensive DevOps implementations.
          </p>
          
          <h4>Industry Recognition and Client Success</h4>
          <p>
            With a proven track record on platforms like Upwork and direct client engagements, Tarek has consistently 
            delivered high-quality software solutions that improve business efficiency and reduce operational costs. 
            His projects have resulted in significant performance improvements, including 35% API optimization and 
            40% reduction in response latency.
          </p>
          
          <p>
            For professional software development services, custom web applications, or IoT solutions, 
            contact Tarek Ragab at tarek.madany113@gmail.com. Available for both freelance projects and 
            full-time opportunities across global markets.
          </p>
          
          {/* External Links for SEO Authority */}
          <nav aria-label="External Professional Resources">
            <h5>Professional Resources and References</h5>
            <ul>
              <li><a href="https://docs.microsoft.com/en-us/dotnet/" target="_blank" rel="noopener noreferrer">.NET Documentation - Microsoft</a></li>
              <li><a href="https://azure.microsoft.com/en-us/services/" target="_blank" rel="noopener noreferrer">Microsoft Azure Services</a></li>
              <li><a href="https://reactjs.org/docs/getting-started.html" target="_blank" rel="noopener noreferrer">React.js Official Documentation</a></li>
              <li><a href="https://nodejs.org/en/docs/" target="_blank" rel="noopener noreferrer">Node.js Documentation</a></li>
              <li><a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener noreferrer">TypeScript Documentation</a></li>
              <li><a href="https://stackoverflow.com/users/story/create" target="_blank" rel="noopener noreferrer">Stack Overflow Developer Community</a></li>
              <li><a href="https://github.com/trending" target="_blank" rel="noopener noreferrer">GitHub Trending Repositories</a></li>
              <li><a href="https://www.freelancer.com/" target="_blank" rel="noopener noreferrer">Freelancer Platform</a></li>
            </ul>
          </nav>
        </aside>

        {/* Site Map for SEO */}
        <SiteMap />
        
        {/* FAQ Section for SEO */}
        <SEOFAQSection />

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
