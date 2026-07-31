import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// GET /api/movies/[id]
// Returns one movie's details plus a list of recommended movies
// that share the same genre (simple filtering, no ML needed).
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const movieId = parseInt(params.id, 10);

    const movieResult = await pool.query(
      "SELECT * FROM movies WHERE id = $1",
      [movieId]
    );

    if (movieResult.rows.length === 0) {
      return NextResponse.json(
        { message: "Movie not found." },
        { status: 404 }
      );
    }

    const movie = movieResult.rows[0];

    // Recommended movies: same genre, excluding the current movie
    const recommendedResult = await pool.query(
      `SELECT * FROM movies
       WHERE genre = $1 AND id != $2
       LIMIT 4`,
      [movie.genre, movie.id]
    );

    return NextResponse.json({
      movie,
      recommended: recommendedResult.rows,
    });
  } catch (error) {
    console.error("Fetch movie error:", error);
    return NextResponse.json(
      { message: "Could not fetch movie details." },
      { status: 500 }
    );
  }
}
