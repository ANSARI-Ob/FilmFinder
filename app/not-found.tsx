import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-bold text-accent mb-3">404</h1>
      <p className="text-muted mb-6">
        Sorry, we couldn&apos;t find the page (or movie) you were looking for.
      </p>
      <Link href="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
}
