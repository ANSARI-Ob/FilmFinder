import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { hashPassword, createSession } from "@/lib/auth";

// POST /api/auth/register
// Body: { fullname, email, password }
export async function POST(req: NextRequest) {
  try {
    const { fullname, email, password } = await req.json();

    // ---- Basic validation ----
    if (!fullname || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    // ---- Check if the email is already registered ----
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email.toLowerCase()]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 409 }
      );
    }

    // ---- Hash the password before storing it ----
    const hashedPassword = await hashPassword(password);

    // ---- Insert the new user into the database ----
    const result = await pool.query(
      `INSERT INTO users (fullname, email, password)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [fullname, email.toLowerCase(), hashedPassword]
    );

    const newUserId = result.rows[0].id;

    // ---- Log the user in immediately after registering ----
    createSession(newUserId);

    return NextResponse.json(
      { message: "Registration successful!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
