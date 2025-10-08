# Tarek Ragab - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS, showcasing experience as a Full-Stack Software Engineer.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF)

## Architecture Overview

This portfolio follows a component-based architecture with clear separation of concerns:

- **Atomic Design Pattern**: Components are organized hierarchically from atomic to page-level
- **Data-Driven Content**: All portfolio content is centralized in TypeScript interfaces
- **Theme System**: Comprehensive dark/light theme implementation with system preference detection
- **SEO Architecture**: Structured data integration with JSON-LD for enhanced search visibility
- **Performance Optimization**: Code splitting, lazy loading, and bundle optimization

## Technology Stack

### Frontend Framework

- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with enhanced IDE support
- **Vite** - Next-generation frontend tooling for fast development

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful, consistent icons
- **shadcn/ui** - Re-usable component library

### Developer Experience

- **ESLint** - Code linting and formatting
- **Bun** - Fast package manager and JavaScript runtime
- **TypeScript** - Static type checking
- **Hot Module Replacement** - Instant development feedback

### Additional Libraries

- **React Router DOM** - Client-side routing
- **React Helmet Async** - Dynamic document head management
- **Next Themes** - Theme switching functionality
- **Class Variance Authority** - Component variant management

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or [Node.js](https://nodejs.org/) 18+
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Tarek-Ragab-Abdelal/tarek-folio.git
   cd tarek-folio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:8080` to view the portfolio

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── atomic/          # Basic building blocks (Chip, PillButton)
│   ├── molecular/       # Component combinations (Cards)
│   ├── layout/          # Layout components (Navbar, Footer)
│   ├── sections/        # Page sections (Hero, Experience, etc.)
│   ├── SEO/            # SEO and structured data components
│   └── ui/             # shadcn/ui components
├── data/               # Static data and content
│   └── portfolio.ts    # Portfolio data (experience, projects, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
│   ├── Index.tsx       # Main portfolio page
│   └── NotFound.tsx    # 404 error page
└── assets/             # Images, fonts, and other static files
```

## System Design

### Component Architecture

The application follows a hierarchical component structure:

- **Atomic Components**: Basic UI primitives (Chip, PillButton)
- **Molecular Components**: Composite components (ExperienceCard, ProjectCard, ReviewCard)
- **Layout Components**: Structural elements (Navbar, Footer)
- **Section Components**: Page sections with specific business logic
- **Page Components**: Top-level routing components

### Data Architecture

Portfolio content is managed through TypeScript interfaces with strong typing:

```typescript
interface PersonalInfo {
  name: string;
  title: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  links: { github: string; linkedin: string; upwork: string };
}
```

### SEO Implementation

- **Structured Data**: JSON-LD schema for Person, Website, and FAQ entities
- **Meta Tags**: Dynamic head management with React Helmet Async
- **Semantic HTML**: Proper use of semantic elements and ARIA attributes
- **Performance**: Core Web Vitals optimization

## Available Scripts

| Script          | Description                              |
| --------------- | ---------------------------------------- |
| `bun dev`       | Start development server with hot reload |
| `bun build`     | Build production-ready application       |
| `bun build:dev` | Build in development mode                |
| `bun preview`   | Preview production build locally         |
| `bun lint`      | Run ESLint for code quality              |

## Configuration

### Data Configuration

All portfolio content is centralized in `src/data/portfolio.ts` with TypeScript interfaces:

- **PersonalInfo**: Contact information and professional summary
- **Experience**: Work history with achievements and metrics
- **Projects**: Portfolio projects with technology stacks
- **Skills**: Categorized technical competencies
- **Reviews**: Client testimonials and ratings

### Theme Configuration

Theme system implemented with:

- **CSS Variables**: Dynamic color switching in `tailwind.config.ts`
- **Next Themes**: Persistent theme state management
- **System Integration**: Automatic system preference detection

### Build Configuration

Vite configuration includes:

- **Path Aliases**: `@` mapped to `./src` for clean imports
- **Plugin System**: React SWC for fast compilation
- **Development Tools**: Component tagger for development mode

## Performance Metrics

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: Optimized with tree-shaking and code splitting
- **First Contentful Paint**: Sub-second initial page load
- **Cumulative Layout Shift**: Minimized through proper image sizing
- **Accessibility**: WCAG 2.1 AA compliance with ARIA implementation

## Development

### Code Quality Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Configured with React and TypeScript rules
- **Component Structure**: Follows atomic design principles
- **File Organization**: Clear separation of concerns

### Build Process

```bash
# Development build with hot reload
npm run dev

# Production build with optimizations
npm run build

# Code quality checks
bun lint
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact Information

**Tarek Ragab** - Full-Stack Software Engineer

- Email: [tarek.madany113@gmail.com](mailto:tarek.madany113@gmail.com)
- LinkedIn: [linkedin.com/in/tarek-ragab](https://www.linkedin.com/in/tarek-ragab/)
- GitHub: [github.com/Tarek-Ragab-Abdelal](https://github.com/Tarek-Ragab-Abdelal)
- Upwork: [upwork.com/freelancers/~01f068ac7a77a08223](https://www.upwork.com/freelancers/~01f068ac7a77a08223)
- Location: Cairo, Egypt
- Phone: +201090477381
