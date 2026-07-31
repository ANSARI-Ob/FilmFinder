"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

// Search bar that redirects to the home page with a ?search= query.
// The Home page reads this query param and filters movies server-side.
export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim() === "") {
      router.push("/");
    } else {
      router.push(`/?search=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="input-field text-sm py-1.5"
      />
      <button type="submit" className="btn-primary text-sm py-1.5 whitespace-nowrap">
        Search
      </button>
    </form>
  );
}
