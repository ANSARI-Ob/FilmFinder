// lib/types.ts
// Shared TypeScript types used across the FilmFinder app.

export interface Movie {
  id: number;
  title: string;
  genre: string;
  language: string;
  rating: string; // numeric columns come back as strings from "pg"
  duration: number;
  poster: string;
  description: string;
}

export interface Booking {
  id: number;
  user_id: number;
  movie_id: number;
  booking_date: string;
  show_time: string;
  seats: number;
  total_price: string;
  ticket_id: string;
  created_at: string;
  // extra fields joined in from the movies table
  title?: string;
  poster?: string;
}

export interface User {
  id: number;
  fullname: string;
  email: string;
}
