// lib/auth.ts
// Simple authentication helpers for FilmFinder.
//
// NOTE (for viva/explanation): This project uses a very simple
// cookie-based session system instead of a big auth library like
// NextAuth. We store the logged-in user's ID inside an httpOnly
// cookie. This keeps things easy to understand for a college
// project while still keeping the password itself hashed and the
// cookie inaccessible to client-side JavaScript.

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "ff_session";
const SALT_ROUNDS = 10;

// Hash a plain text password before saving it to the database
export async function hashPassword(plainPassword: string): Promise<string> {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

// Compare a plain text password (from login form) with the hashed
// password stored in the database
export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

// Create a session cookie after successful login/register.
// We just store the user's id as the cookie value.
export function createSession(userId: number) {
  cookies().set(SESSION_COOKIE_NAME, String(userId), {
    httpOnly: true, // JavaScript on the browser cannot read this cookie
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

// Remove the session cookie (logout)
export function destroySession() {
  cookies().delete(SESSION_COOKIE_NAME);
}

// Read the current logged-in user's id from the cookie.
// Returns null if the user is not logged in.
export function getSessionUserId(): number | null {
  const cookieValue = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!cookieValue) return null;

  const userId = parseInt(cookieValue, 10);
  return Number.isNaN(userId) ? null : userId;
}
