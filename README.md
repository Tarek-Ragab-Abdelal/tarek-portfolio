# Tarek Ragab - Portfolio Website

A modern, SEO-optimized portfolio website built with React, TypeScript, and Vite, featuring responsive design with dark/light theme support and comprehensive search engine optimization.

## 🚀 SEO Optimizations Implemented

### 1. **Dynamic Meta Tags Management**
- **react-helmet-async** integration for dynamic meta tag management
- Comprehensive Open Graph and Twitter Card meta tags
- Structured data (JSON-LD) for rich snippets
- Canonical URLs and proper meta descriptions

### 2. **Semantic HTML Structure**
- Proper use of HTML5 semantic elements (`header`, `main`, `section`, `article`, `nav`, `footer`)
- ARIA labels and roles for accessibility
- Hierarchical heading structure (h1 → h6)
- Descriptive alt text for all images

### 3. **Performance Optimization**
- Preconnect to external fonts for faster loading
- Preload critical images (profile, hero background)
- Optimized image loading with proper dimensions
- Efficient CSS and JS bundling with Vite

### 4. **Structured Data (Schema.org)**
- **Person schema** for professional information
- **Organization schema** for work experience
- **CreativeWork schema** for projects
- **FAQ schema** for common questions
- **Website schema** with search functionality

### 5. **Technical SEO**
- **robots.txt** with proper crawling directives
- **XML sitemap** with image optimization
- Clean URL structure with hash navigation
- Mobile-responsive design
- Fast Core Web Vitals performance

### 6. **Content Optimization**
- Keyword-rich meta descriptions
- Descriptive page titles with target keywords
- Internal linking structure
- Optimized content hierarchy

## 🏗️ Architecture

```
src/
├── components/
│   ├── SEO/
│   │   ├── SEOHead.tsx          # Dynamic meta tag component
│   │   └── StructuredData.ts    # Schema.org structured data
│   ├── sections/                # Main content sections
│   ├── layout/                  # Navigation and footer
│   └── ...
├── data/
│   └── portfolio.ts            # Centralized data management
└── ...
```

## Project info

**URL**: https://lovable.dev/projects/143f8139-79de-41fa-bab6-942be5d64cf1

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/143f8139-79de-41fa-bab6-942be5d64cf1) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/143f8139-79de-41fa-bab6-942be5d64cf1) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
