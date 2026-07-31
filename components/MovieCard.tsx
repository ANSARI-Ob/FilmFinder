import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/lib/types";

// Reusable movie card used on the Home page and Recommendations section.
export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/movie/${movie.id}`} className="card block">
      <div className="relative w-full aspect-[2/3]">
        <Image
          src={movie.poster}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 200px"
        />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-white truncate">{movie.title}</h3>
        <div className="flex items-center justify-between mt-1 text-sm text-muted">
          <span>{movie.genre}</span>
          <span className="flex items-center gap-1 text-yellow-400">
            ⭐ {movie.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
