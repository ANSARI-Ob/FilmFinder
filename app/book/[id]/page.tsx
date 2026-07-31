import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import pool from "@/lib/db";
import { Movie } from "@/lib/types";
import { getSessionUserId } from "@/lib/auth";
import BookingForm from "@/components/BookingForm";

// Book Ticket page. Only logged-in users can book a ticket, so we
// redirect to /login if there is no active session.
export default async function BookPage({
  params,
}: {
  params: { id: string };
}) {
  const userId = getSessionUserId();
  if (!userId) {
    redirect("/login");
  }

  const movieId = parseInt(params.id, 10);

  const result = await pool.query("SELECT * FROM movies WHERE id = $1", [
    movieId,
  ]);

  if (result.rows.length === 0) {
    notFound();
  }

  const movie: Movie = result.rows[0];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Book Tickets</h1>

      <div className="flex gap-4 items-center bg-surface border border-gray-800 rounded-xl p-4 mb-6">
        <div className="relative w-20 h-28 rounded-lg overflow-hidden shrink-0">
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{movie.title}</h2>
          <p className="text-muted text-sm">
            {movie.genre} • {movie.language}
          </p>
        </div>
      </div>

      <BookingForm movieId={movie.id} movieTitle={movie.title} />
    </div>
  );
}
