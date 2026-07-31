"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Login page. Checks the entered email/password against the
// PostgreSQL "users" table via /api/auth/login.
export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Wrong email or password
        setError(data.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      // Login successful -> redirect to Home page
      router.push("/");
      router.refresh();
    } catch (err) {
      setError("Could not connect to the server. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-surface border border-gray-800 rounded-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          Login to FilmFinder
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-muted mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Your password"
            />
          </div>

          {error && (
            <p className="text-accent text-sm bg-accent/10 border border-accent/30 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-muted mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-accent hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
