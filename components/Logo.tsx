import Link from "next/link";

// Simple text-based logo for FilmFinder.
// Kept as plain text + emoji instead of an image file to keep
// the project easy to set up (no extra image assets needed).
export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 select-none">
      <span className="text-2xl">🎬</span>
      <span className="text-xl font-bold text-white">
        Film<span className="text-accent">Finder</span>
      </span>
    </Link>
  );
}
