// lib/utils.ts
// Small reusable helper functions.

// Flat ticket price per seat (in Rupees). Kept simple - a real
// system might vary this by movie/theatre/time, but that is not
// required for this project.
export const PRICE_PER_SEAT = 200;

// Generates a random, unique-looking ticket ID like "FF-8K2P9X4A"
export function generateTicketId(): string {
  const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `FF-${randomPart}`;
}

// Formats a duration given in minutes as "2h 15m"
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

// Formats a date string (YYYY-MM-DD) into a friendlier format
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
