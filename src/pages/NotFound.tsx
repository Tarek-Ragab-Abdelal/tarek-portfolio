import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import { personalInfo } from "@/data/portfolio";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Page Not Found - 404",
    "description": "The requested page could not be found on Tarek Ragab's portfolio website.",
    "url": `${window.location.origin}${location.pathname}`,
    "isPartOf": {
      "@type": "WebSite",
      "name": `${personalInfo.name} Portfolio`,
      "url": window.location.origin
    }
  };

  return (
    <>
      <SEOHead
        title="Page Not Found (404) - Tarek Ragab Portfolio"
        description="The page you're looking for doesn't exist. Return to Tarek Ragab's portfolio to explore projects, experience, and skills in software engineering."
        jsonLd={structuredData}
      />
      
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Search className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Page Not Found</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <Home className="w-4 h-4" />
              Return to Portfolio
            </Link>
            
            <div className="text-center">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            </div>
          </div>

          <div className="mt-12 text-sm text-muted-foreground">
            <p>
              Looking for something specific? Visit my{" "}
              <Link to="/#projects" className="text-primary hover:underline">
                projects
              </Link>
              {" or "}
              <Link to="/#contact" className="text-primary hover:underline">
                get in touch
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
