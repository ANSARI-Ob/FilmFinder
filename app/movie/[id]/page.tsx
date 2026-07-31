import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import pool from "@/lib/db";
import { Movie } from "@/lib/types";
import { formatDuration } from "@/lib/utils";
import MovieCard from "@/components/MovieCard";

// Movie Details page. Shows poster, name, genre, rating, duration,
// description, a "Book Ticket" button, and genre-based recommendations.
export default async function MovieDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const movieId = parseInt(params.id, 10);

  const movieResult = await pool.query("SELECT * FROM movies WHERE id = $1", [
    movieId,
  ]);

  if (movieResult.rows.length === 0) {
    notFound();
  }

  const movie: Movie = movieResult.rows[0];

  // Simple genre-based recommendation: same genre, different movie
  const recommendedResult = await pool.query(
    "SELECT * FROM movies WHERE genre = $1 AND id != $2 LIMIT 4",
    [movie.genre, movie.id]
  );
  const recommended: Movie[] = recommendedResult.rows;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Poster */}
        <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden border border-gray-800">
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
            priority
          />
        </div>

        {/* Details */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold">{movie.title}</h1>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
            <span className="bg-surface2 px-3 py-1 rounded-full">
              {movie.genre}
            </span>
            <span className="bg-surface2 px-3 py-1 rounded-full">
              {movie.language}
            </span>
            <span className="bg-surface2 px-3 py-1 rounded-full">
              {formatDuration(movie.duration)}
            </span>
            <span className="flex items-center gap-1 text-yellow-400">
              ⭐ {movie.rating} / 10
            </span>
          </div>

          <p className="text-muted mt-6 leading-relaxed">
            {movie.description}
          </p>

          <Link href={`/book/${movie.id}`} className="btn-primary inline-block mt-8">
            Book Ticket
          </Link>
        </div>
      </div>

      {/* Recommendations */}
      {recommended.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold mb-4">
            More {movie.genre} Movies You Might Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {recommended.map((rec) => (
              <MovieCard key={rec.id} movie={rec} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
