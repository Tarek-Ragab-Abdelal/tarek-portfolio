import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { ProjectShowcase } from "@/components/site/project-showcase";
import { SkillLab } from "@/components/site/skill-lab";
import { HeroSection } from "@/components/site/hero-section";
import { ExperienceTimeline } from "@/components/site/experience-timeline";
import { SectionConnector, SectionDot } from "@/components/site/section-thread";
import { getRecentPosts } from "@/lib/blog";
import { experiences, featuredProjects, personalInfo, skillGroups } from "@/lib/portfolio-data";

export default function HomePage() {
  const recentPosts = getRecentPosts(3);
  const contactChannels = [
    {
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      icon: Mail
    },
    {
      label: "Upwork",
      value: "Hire me on Upwork",
      href: personalInfo.links.upwork,
      icon: BriefcaseBusiness
    },
    {
      label: "LinkedIn",
      value: "Connect professionally",
      href: personalInfo.links.linkedin,
      icon: Linkedin
    },
    {
      label: "GitHub",
      value: "See open-source work",
      href: personalInfo.links.github,
      icon: Github
    }
  ] as const;

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />

        <SectionConnector height="60px" />
        <SectionDot />

        {/* About */}
        <section id="about" className="container py-16">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">About</p>
          <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">Engineering with measurable outcomes</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            I work end-to-end: architecture, implementation, and delivery. My approach starts with business impact and backs it up with maintainable systems and user-centered design.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { title: "System Thinking", desc: "I design for scale, operational clarity, and future extensibility from day one." },
              { title: "Delivery Discipline", desc: "Automation, CI/CD, and clear handoff standards keep releases reliable and predictable." },
              { title: "Interactive UX", desc: "Interfaces designed for quick comprehension, fluid transitions, and purposeful motion." }
            ].map((item) => (
              <div key={item.title} className="card-hover rounded-xl border border-line bg-surface p-5">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <SectionConnector />
        <SectionDot />

        {/* Skills */}
        <section id="skills" className="container py-16">
          <div className="mb-10">
            <p className="text-xs font-medium uppercase tracking-widest text-accent">Skills</p>
            <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">Tech stack across product, data & cloud</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              Full-stack capabilities spanning languages, frameworks, cloud infrastructure, and embedded systems.
            </p>
          </div>
          <SkillLab groups={skillGroups} />
        </section>

        <SectionConnector />
        <SectionDot />

        {/* Projects */}
        <section id="projects" className="container py-16">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">Projects</p>
          <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">Shipped from idea to deployment</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            A curated set of projects including production deployments and source repositories.
          </p>
          <div className="mt-8">
            <ProjectShowcase projects={featuredProjects} />
          </div>
        </section>

        <SectionConnector />
        <SectionDot />

        {/* Experience */}
        <section id="experience" className="container py-16">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">Experience</p>
          <h2 className="mt-2 mb-10 text-2xl font-bold text-white md:text-3xl">Recent roles & execution scope</h2>
          <ExperienceTimeline experiences={experiences} />
        </section>

        <SectionConnector />
        <SectionDot />

        {/* Blog */}
        <section id="blog" className="container py-16">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">Blog</p>
          <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">Engineering notes</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {recentPosts.map((post) => (
              <article key={post.slug} className="card-hover flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent/40">
                {post.coverImage && (
                  <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-lg">
                    <Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 768px) 100vw, 340px" className="object-cover" />
                  </div>
                )}
                <p className="text-xs text-muted">
                  {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </p>
                <h3 className="mt-2 text-base font-semibold text-white">{post.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted">
                  <span>{post.readingTimeMinutes} min read</span>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 font-medium text-accent hover:text-white">
                    Read <ArrowRight size={12} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <SectionConnector />
        <SectionDot />

        {/* Contact */}
        <section id="contact" className="container py-16 pb-24">
          <div className="card-hover rounded-xl border border-line bg-surface p-8 md:p-10">
            <p className="text-xs font-medium uppercase tracking-widest text-accent">Contact</p>
            <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">Let&apos;s build something together</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Available for direct collaboration on software products, platform engineering, or architecture consulting.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {contactChannels.map(({ label, value, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className="group rounded-xl border border-line bg-surface/80 p-4 transition-colors hover:border-accent/40"
                >
                  <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-accent">
                    <Icon size={14} />
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-medium text-white transition-colors group-hover:text-accent">{value}</p>
                </Link>
              ))}
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-surface/60 p-4">
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-muted">
                  <Phone size={14} />
                  Phone
                </p>
                <p className="mt-2 text-sm font-medium text-white">{personalInfo.phone}</p>
              </div>
              <div className="rounded-xl border border-line bg-surface/60 p-4">
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-muted">
                  <MapPin size={14} />
                  Location
                </p>
                <p className="mt-2 text-sm font-medium text-white">{personalInfo.location}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
