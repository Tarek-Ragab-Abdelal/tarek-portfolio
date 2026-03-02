import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookMarked,
  BriefcaseBusiness,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy
} from "lucide-react";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { ProjectShowcase } from "@/components/site/project-showcase";
import { Reveal } from "@/components/site/reveal";
import { SectionTitle } from "@/components/site/section-title";
import { SkillsAutoScroll } from "@/components/site/skills-auto-scroll";
import { SkillLab } from "@/components/site/skill-lab";
import { getRecentPosts } from "@/lib/blog";
import { allSkills, coreSkills, experiences, featuredProjects, personalInfo, skillGroups, upworkBadges } from "@/lib/portfolio-data";

export default function HomePage() {
  const recentPosts = getRecentPosts(3);

  return (
    <>
      <Navbar />

      <main>
        <section id="home" className="container relative py-16 md:py-24">
          <div className="pointer-events-none absolute -left-8 top-0 h-44 w-44 rounded-full bg-accent2/20 blur-3xl" />
          <div className="pointer-events-none absolute right-10 top-16 h-56 w-56 rounded-full bg-accent/25 blur-3xl" />

          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal className="space-y-6">
              <h1 className="font-display text-5xl font-semibold leading-tight text-white md:text-7xl">{personalInfo.name}</h1>
              <div className="h-4 w-full max-w-2xl rounded-sm bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500 shadow-[0_0_40px_rgba(91,118,255,0.35)]" />
              <p className="text-xl text-slate-400 md:text-4xl">Software Engineer based in {personalInfo.location}</p>

              <div className="flex flex-wrap gap-2">
                {upworkBadges.map((badge, index) => {
                  const Icon = index === 0 ? Trophy : index === 1 ? Star : ShieldCheck;

                  return (
                    <span key={badge.label} className="badge-pill gap-2 border-accent2/50 bg-slate-950/40 text-[11px] uppercase tracking-[0.11em] text-slate-100">
                      <Icon size={14} className="text-accent2" />
                      <strong className="font-semibold text-accent">{badge.label}</strong>
                    </span>
                  );
                })}
              </div>

              <p className="max-w-3xl text-base leading-relaxed text-muted md:text-lg">{personalInfo.summary}</p>

              <div className="flex flex-wrap gap-2">
                {coreSkills.map((skill) => (
                  <span key={skill} className="rounded-full border border-blue-500/35 bg-blue-500/10 px-4 py-2 text-sm text-blue-200">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-fuchsia-500 px-7 py-4 text-base font-semibold text-white shadow-[0_8px_30px_rgba(90,106,255,0.45)] transition-transform hover:scale-[1.02]"
                >
                  <ExternalLink size={18} />
                  Let&apos;s Collaborate
                </Link>
                <Link
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-blue-500 px-7 py-4 text-base font-semibold text-blue-300 transition-colors hover:bg-blue-500/15"
                >
                  <Download size={18} />
                  Download Resume
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-full border border-line/70 bg-bg/60 px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-muted transition-colors hover:text-white"
                >
                  Read Blog
                  <BookMarked size={16} />
                </Link>
                <Link
                  href="/#projects"
                  className="inline-flex items-center gap-2 rounded-full border border-accent/70 bg-accent/15 px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-accent/25"
                >
                  View Projects
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Link
                  href={personalInfo.links.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line/70 bg-slate-950/55 text-slate-200 transition-colors hover:border-blue-500/60 hover:text-white"
                >
                  <Github size={21} />
                </Link>
                <Link
                  href={personalInfo.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line/70 bg-slate-950/55 text-slate-200 transition-colors hover:border-blue-500/60 hover:text-white"
                >
                  <Linkedin size={21} />
                </Link>
                <Link
                  href={personalInfo.links.upwork}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Upwork"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line/70 bg-slate-950/55 text-base font-semibold text-slate-200 transition-colors hover:border-blue-500/60 hover:text-white"
                >
                  Up
                </Link>
              </div>

              <dl className="grid gap-4 pt-3 sm:grid-cols-3">
                <div className="section-shell p-4">
                  <dt className="text-xs uppercase tracking-[0.16em] text-muted">Experience</dt>
                  <dd className="mt-2 font-display text-2xl font-semibold text-white">4+ years</dd>
                </div>
                <div className="section-shell p-4">
                  <dt className="text-xs uppercase tracking-[0.16em] text-muted">Apps Shipped</dt>
                  <dd className="mt-2 font-display text-2xl font-semibold text-white">40+</dd>
                </div>
                <div className="section-shell p-4">
                  <dt className="text-xs uppercase tracking-[0.16em] text-muted">Core Focus</dt>
                  <dd className="mt-2 font-display text-2xl font-semibold text-white">Data + UX</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.1} className="relative flex justify-center lg:justify-end">
              <div className="absolute h-[20rem] w-[20rem] rounded-full bg-blue-500/35 blur-[90px]" />
              <div className="relative mx-auto flex aspect-square w-full max-w-[23rem] items-center justify-center rounded-full border border-blue-500/55 bg-blue-500/10 p-3 shadow-[0_0_60px_rgba(85,120,255,0.48)] lg:mx-0 lg:max-w-[28rem]">
                <div className="relative h-full w-full overflow-hidden rounded-full border border-slate-200/25">
                <Image
                  src="/images/profile.jpg"
                  alt={`${personalInfo.name} profile portrait`}
                  fill
                  priority
                    sizes="(max-width: 1024px) 90vw, 460px"
                  className="object-cover"
                />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="skills" className="container py-12 md:py-16">
          <Reveal className="space-y-6">
            <SectionTitle
              eyebrow="Skills"
              title="Hands-on stack across product, data, and cloud"
              description="An auto-scrolling skills stream gives a quick overview while the interactive selector below lets you inspect categories in detail."
            />
            <SkillsAutoScroll skills={allSkills} />
            <SkillLab groups={skillGroups} />
          </Reveal>
        </section>

        <section id="about" className="container py-12 md:py-16">
          <Reveal className="section-shell noise-mask p-8 md:p-10">
            <SectionTitle
              eyebrow="About"
              title="Engineering with measurable product outcomes"
              description="I work end-to-end: architecture, implementation, and delivery. My approach starts with business impact and backs it up with maintainable systems, observable pipelines, and user-centered interaction design."
            />
            <div className="mt-8 grid gap-4 text-sm text-muted md:grid-cols-3">
              <article className="rounded-2xl border border-line/70 bg-bg/45 p-4">
                <p className="font-semibold text-white">System Thinking</p>
                <p className="mt-2">I design for scale, operational clarity, and future extensibility from day one.</p>
              </article>
              <article className="rounded-2xl border border-line/70 bg-bg/45 p-4">
                <p className="font-semibold text-white">Delivery Discipline</p>
                <p className="mt-2">Automation, CI/CD, and clear handoff standards keep releases reliable and predictable.</p>
              </article>
              <article className="rounded-2xl border border-line/70 bg-bg/45 p-4">
                <p className="font-semibold text-white">Interactive UX</p>
                <p className="mt-2">Interfaces are designed for quick comprehension, fluid transitions, and purposeful motion.</p>
              </article>
            </div>
          </Reveal>
        </section>

        <section id="projects" className="container py-12 md:py-16">
          <Reveal className="space-y-8">
            <SectionTitle
              eyebrow="Featured Projects"
              title="Interactive products shipped from idea to deployment"
              description="A curated set of projects including production deployments and source repositories. The showcase below is fully interactive: select a project to inspect context, stack, and implementation highlights."
            />
            <ProjectShowcase projects={featuredProjects} />
          </Reveal>
        </section>

        <section id="experience" className="container py-12 md:py-16">
          <Reveal className="space-y-8">
            <SectionTitle
              eyebrow="Experience"
              title="Recent roles and execution scope"
              description="I’ve worked across web, cloud, and embedded systems, usually in product environments where speed and correctness are equally important."
            />
            <div className="space-y-4">
              {experiences.map((experience, index) => (
                <Reveal key={`${experience.company}-${experience.role}`} delay={index * 0.07}>
                  <article className="section-shell noise-mask p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-display text-xl font-semibold text-white">{experience.role}</h3>
                      <span className="badge-pill">{experience.period}</span>
                    </div>
                    {experience.link ? (
                      <Link href={experience.link} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 text-sm text-accent2 hover:text-white">
                        <BriefcaseBusiness size={15} />
                        {experience.company}
                      </Link>
                    ) : (
                      <p className="mt-2 inline-flex items-center gap-2 text-sm text-accent2">
                        <BriefcaseBusiness size={15} />
                        {experience.company}
                      </p>
                    )}
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                      {experience.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Sparkles size={14} className="mt-0.5 shrink-0 text-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="blog" className="container py-12 md:py-16">
          <Reveal className="space-y-8">
            <SectionTitle
              eyebrow="Blog"
              title="Engineering notes and implementation playbooks"
              description="The blog is built for SEO and long-form technical writing. Posts are managed as Markdown files for simple publishing and version control."
            />
            <div className="grid gap-4 md:grid-cols-3">
              {recentPosts.map((post) => (
                <article key={post.slug} className="section-shell noise-mask p-5">
                  {post.coverImage ? (
                    <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-2xl border border-line/70">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 380px"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <p className="text-xs uppercase tracking-[0.12em] text-muted">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-white">{post.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted">
                    <span>{post.readingTimeMinutes} min read</span>
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-accent hover:text-white">
                      Read
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="contact" className="container py-12 md:py-20">
          <Reveal className="section-shell noise-mask p-8 md:p-10">
            <SectionTitle
              eyebrow="Contact"
              title="Let’s build the next high-impact product"
              description="If you’re shipping a software product, revamping an existing platform, or need architecture support, I’m available for direct collaboration."
            />
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted">
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-accent/70 bg-accent/15 px-5 py-3 font-semibold text-white"
              >
                <Mail size={15} />
                {personalInfo.email}
              </a>
              <span className="badge-pill">{personalInfo.phone}</span>
              <span className="badge-pill">{personalInfo.location}</span>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
