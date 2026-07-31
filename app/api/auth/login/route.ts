import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { comparePassword, createSession } from "@/lib/auth";

// POST /api/auth/login
// Body: { email, password }
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    // ---- Find the user by email ----
    const result = await pool.query(
      "SELECT id, password FROM users WHERE email = $1",
      [email.toLowerCase()]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // ---- Compare entered password with the hashed password ----
    const isPasswordCorrect = await comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // ---- Correct credentials -> create a session cookie ----
    createSession(user.id);

    return NextResponse.json({ message: "Login successful!" });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
