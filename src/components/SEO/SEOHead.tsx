import { Helmet, HelmetProvider } from 'react-helmet-async';
import { personalInfo } from '@/data/portfolio';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  jsonLd?: object;
}

const SEOHead = ({
  title = `${personalInfo.name} - ${personalInfo.title}`,
  description = personalInfo.summary,
  keywords = "Full-Stack Software Engineer, .NET Developer, React Developer, Azure Cloud, TypeScript, C#, Software Engineer Cairo, Portfolio, Tarek Ragab",
  image = "/assets/profile.jpg",
  url = window.location.href,
  type = "website",
  jsonLd
}: SEOHeadProps) => {
  const siteUrl = window.location.origin;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={personalInfo.name} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={`${personalInfo.name} - Portfolio`} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content="@tarek_ragab" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="application-name" content={`${personalInfo.name} Portfolio`} />
      <meta name="apple-mobile-web-app-title" content={`${personalInfo.name} Portfolio`} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

// HOC to wrap components with HelmetProvider
export const withSEO = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => (
    <HelmetProvider>
      <Component {...props} />
    </HelmetProvider>
  );
};

export default SEOHead;