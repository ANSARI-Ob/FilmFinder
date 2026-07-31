import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";

// POST /api/auth/logout
// Clears the session cookie to log the user out.
export async function POST() {
  destroySession();
  return NextResponse.json({ message: "Logged out." });
}
