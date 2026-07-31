export default function Footer() {
  return (
    <footer className="bg-surface border-t border-gray-800 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-muted text-sm">
        <p>
          🎬 <span className="text-white font-semibold">FilmFinder</span> —
          Movie Ticket Booking &amp; Recommendation System
        </p>
        <p className="mt-2">
          Built as a college project using Next.js, TypeScript, Tailwind CSS
          &amp; PostgreSQL.
        </p>
        <p className="mt-2">&copy; {new Date().getFullYear()} FilmFinder. All rights reserved.</p>
      </div>
    </footer>
  );
}
