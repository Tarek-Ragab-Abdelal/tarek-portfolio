import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb navigation" className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
      <a 
        href="#home" 
        className="flex items-center gap-1 hover:text-primary transition-smooth"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </a>
      
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4" />
          {item.current ? (
            <span className="text-foreground font-medium" aria-current="page">
              {item.label}
            </span>
          ) : (
            <a 
              href={item.href} 
              className="hover:text-primary transition-smooth"
              aria-label={`Navigate to ${item.label}`}
            >
              {item.label}
            </a>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;