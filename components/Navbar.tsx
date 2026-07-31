import Link from "next/link";
import Logo from "./Logo";
import LogoutButton from "./LogoutButton";
import SearchBar from "./SearchBar";
import { getSessionUserId } from "@/lib/auth";
import pool from "@/lib/db";

// Navbar is a Server Component so it can check the login cookie
// and fetch the user's name directly from the database.
export default async function Navbar() {
  const userId = getSessionUserId();
  let fullname: string | null = null;

  if (userId) {
    const result = await pool.query(
      "SELECT fullname FROM users WHERE id = $1",
      [userId]
    );
    if (result.rows.length > 0) {
      fullname = result.rows[0].fullname;
    }
  }

  return (
    <nav className="bg-surface border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <Logo />

        {/* Search bar - hidden on very small screens to save space */}
        <div className="order-3 w-full md:order-none md:w-auto md:flex-1 md:max-w-md">
          <SearchBar />
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Link href="/" className="text-muted hover:text-white transition-colors">
            Home
          </Link>

          {userId ? (
            <>
              <Link
                href="/my-tickets"
                className="text-muted hover:text-white transition-colors"
              >
                My Tickets
              </Link>
              <span className="hidden sm:inline text-muted">
                Hi, {fullname?.split(" ")[0]}
              </span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="btn-secondary text-sm">
                Login
              </Link>
              <Link href="/register" className="btn-primary text-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
