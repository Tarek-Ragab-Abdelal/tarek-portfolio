import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-bg px-5">
      <div className="text-center">
        <p className="text-sm font-medium text-accent">404</p>
        <h1 className="mt-3 text-3xl font-bold text-white">Page not found</h1>
        <p className="mt-3 text-sm text-muted">The page you requested does not exist.</p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
