import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// GET /api/movies
// GET /api/movies?search=avengers
// Returns a list of movies, optionally filtered by title.
export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get("search");

    let result;
    if (search) {
      result = await pool.query(
        "SELECT * FROM movies WHERE title ILIKE $1 ORDER BY title ASC",
        [`%${search}%`]
      );
    } else {
      result = await pool.query("SELECT * FROM movies ORDER BY id ASC");
    }

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Fetch movies error:", error);
    return NextResponse.json(
      { message: "Could not fetch movies." },
      { status: 500 }
    );
  }
}
