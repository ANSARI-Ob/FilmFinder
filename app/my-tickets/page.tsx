import Image from "next/image";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { Booking } from "@/lib/types";
import { getSessionUserId } from "@/lib/auth";
import { formatDate } from "@/lib/utils";

// My Tickets page. Shows every ticket booked by the logged-in user.
export default async function MyTicketsPage() {
  const userId = getSessionUserId();
  if (!userId) {
    redirect("/login");
  }

  const result = await pool.query(
    `SELECT bookings.*, movies.title, movies.poster
     FROM bookings
     JOIN movies ON bookings.movie_id = movies.id
     WHERE bookings.user_id = $1
     ORDER BY bookings.created_at DESC`,
    [userId]
  );
  const bookings: Booking[] = result.rows;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">🎟️ My Tickets</h1>

      {bookings.length === 0 ? (
        <div className="bg-surface border border-gray-800 rounded-xl p-8 text-center text-muted">
          You haven&apos;t booked any tickets yet.
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-surface border border-gray-800 rounded-xl p-4 flex flex-col sm:flex-row gap-4"
            >
              <div className="relative w-full sm:w-24 h-40 sm:h-32 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={booking.poster || ""}
                  alt={booking.title || "Movie poster"}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 items-center">
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-xs text-muted">Movie</p>
                  <p className="font-semibold">{booking.title}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">Date & Time</p>
                  <p>{formatDate(booking.booking_date)}</p>
                  <p className="text-sm text-muted">{booking.show_time}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">Seats</p>
                  <p>{booking.seats}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">Total Price</p>
                  <p className="text-accent font-semibold">
                    ₹{booking.total_price}
                  </p>
                </div>
              </div>

              <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-gray-800 pt-3 sm:pt-0 sm:pl-4 flex sm:flex-col justify-between sm:justify-center">
                <p className="text-xs text-muted">Ticket ID</p>
                <p className="font-mono text-sm">{booking.ticket_id}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
