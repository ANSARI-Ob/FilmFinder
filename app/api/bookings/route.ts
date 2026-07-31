import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { generateTicketId, PRICE_PER_SEAT } from "@/lib/utils";

// POST /api/bookings
// Body: { movieId, bookingDate, showTime, seats }
// Creates a new booking for the logged-in user.
export async function POST(req: NextRequest) {
  try {
    const userId = getSessionUserId();
    if (!userId) {
      return NextResponse.json(
        { message: "You must be logged in to book a ticket." },
        { status: 401 }
      );
    }

    const { movieId, bookingDate, showTime, seats } = await req.json();

    // ---- Basic validation ----
    if (!movieId || !bookingDate || !showTime || !seats) {
      return NextResponse.json(
        { message: "All booking fields are required." },
        { status: 400 }
      );
    }

    if (seats < 1 || seats > 10) {
      return NextResponse.json(
        { message: "You can book between 1 and 10 seats." },
        { status: 400 }
      );
    }

    // ---- Calculate total price on the server (never trust the client) ----
    const totalPrice = seats * PRICE_PER_SEAT;

    // ---- Generate a unique ticket ID ----
    const ticketId = generateTicketId();

    // ---- Save the booking in PostgreSQL ----
    const result = await pool.query(
      `INSERT INTO bookings
        (user_id, movie_id, booking_date, show_time, seats, total_price, ticket_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, ticket_id`,
      [userId, movieId, bookingDate, showTime, seats, totalPrice, ticketId]
    );

    return NextResponse.json(
      {
        message: "Booking successful!",
        ticketId: result.rows[0].ticket_id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { message: "Something went wrong while booking. Please try again." },
      { status: 500 }
    );
  }
}

// GET /api/bookings
// Returns all bookings made by the currently logged-in user,
// joined with movie details (title, poster).
export async function GET() {
  try {
    const userId = getSessionUserId();
    if (!userId) {
      return NextResponse.json(
        { message: "You must be logged in to view your tickets." },
        { status: 401 }
      );
    }

    const result = await pool.query(
      `SELECT bookings.*, movies.title, movies.poster
       FROM bookings
       JOIN movies ON bookings.movie_id = movies.id
       WHERE bookings.user_id = $1
       ORDER BY bookings.created_at DESC`,
      [userId]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json(
      { message: "Could not fetch your tickets." },
      { status: 500 }
    );
  }
}
