import pool from "@/lib/db";
import { Movie } from "@/lib/types";
import MovieCard from "@/components/MovieCard";

// This is a Server Component - it fetches movie data directly
// from PostgreSQL on the server before the page is rendered.
export default async function HomePage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const searchQuery = searchParams.search?.trim();

  // ---- SEARCH MODE ----
  // If the user searched for something, only show matching results.
  if (searchQuery) {
    const result = await pool.query(
      "SELECT * FROM movies WHERE title ILIKE $1 ORDER BY title ASC",
      [`%${searchQuery}%`]
    );
    const movies: Movie[] = result.rows;

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          Search results for &quot;{searchQuery}&quot;
        </h1>
        {movies.length === 0 ? (
          <p className="text-muted">No movies found. Try a different search.</p>
        ) : (
          <MovieGrid movies={movies} />
        )}
      </div>
    );
  }

  // ---- NORMAL HOME PAGE ----
  // Fetch every movie once, then split it into sections in JS.
  // (Simple filtering logic - no complex queries needed.)
  const result = await pool.query("SELECT * FROM movies");
  const allMovies: Movie[] = result.rows;

  // Trending = highest rated movies
  const trending = [...allMovies]
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    .slice(0, 6);

  // Recommended = simple "newest added" list, just to show a
  // second, differently-ordered section on the home page.
  const recommended = [...allMovies].sort((a, b) => b.id - a.id).slice(0, 6);

  return (
    <div>
      {/* Hero / Intro Section */}
      <section className="bg-surface border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            Book Your Next Movie with{" "}
            <span className="text-accent">FilmFinder</span>
          </h1>
          <p className="text-muted mt-3">
            Discover trending movies, get recommendations, and book tickets
            in seconds.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        <section>
          <h2 className="text-xl font-bold mb-4">🔥 Trending Movies</h2>
          <MovieGrid movies={trending} />
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">✨ Recommended For You</h2>
          <MovieGrid movies={recommended} />
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">🎬 All Movies</h2>
          <MovieGrid movies={allMovies} />
        </section>
      </div>
    </div>
  );
}

// Small helper component to render a responsive grid of MovieCards
function MovieGrid({ movies }: { movies: Movie[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
