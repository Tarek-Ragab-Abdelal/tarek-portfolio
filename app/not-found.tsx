import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container grid min-h-[70vh] place-items-center py-20">
      <section className="section-shell max-w-xl p-10 text-center">
        <p className="badge-pill">404</p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-white">Page not found</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          The page you requested does not exist. Use the homepage to navigate through projects and blog posts.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex rounded-full border border-accent/70 bg-accent/15 px-5 py-3 text-sm font-semibold text-white"
        >
          Return Home
        </Link>
      </section>
    </main>
  );
}
