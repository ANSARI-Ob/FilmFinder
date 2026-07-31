"use client";

import { useRouter } from "next/navigation";

// A small client component just for the logout button,
// since it needs to call an API route and then refresh the page.
export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh(); // re-fetch server components so navbar updates
  }

  return (
    <button onClick={handleLogout} className="btn-secondary text-sm">
      Logout
    </button>
  );
}
