"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PRICE_PER_SEAT } from "@/lib/utils";

// Available show times to choose from (kept as a simple fixed list)
const SHOW_TIMES = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"];

interface BookingFormProps {
  movieId: number;
  movieTitle: string;
}

export default function BookingForm({ movieId, movieTitle }: BookingFormProps) {
  const router = useRouter();

  const [date, setDate] = useState("");
  const [time, setTime] = useState(SHOW_TIMES[0]);
  const [seats, setSeats] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ ticketId: string } | null>(null);

  // Total price updates automatically as the seat count changes
  const totalPrice = seats * PRICE_PER_SEAT;

  // Today's date, used as the minimum selectable date
  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!date) {
      setError("Please select a date.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieId,
          bookingDate: date,
          showTime: time,
          seats,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Booking failed. Please try again.");
        setLoading(false);
        return;
      }

      // Show a success message with the generated ticket ID
      setSuccess({ ticketId: data.ticketId });
    } catch (err) {
      setError("Could not connect to the server. Please try again.");
      setLoading(false);
    }
  }

  // ---- Success screen ----
  if (success) {
    return (
      <div className="bg-surface border border-green-700 rounded-xl p-8 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
        <p className="text-muted mb-4">
          Your ticket for <span className="text-white">{movieTitle}</span> has
          been booked successfully.
        </p>
        <p className="text-lg font-mono bg-surface2 inline-block px-4 py-2 rounded-lg">
          Ticket ID: {success.ticketId}
        </p>
        <div className="flex gap-3 justify-center mt-6">
          <button
            onClick={() => router.push("/my-tickets")}
            className="btn-primary"
          >
            View My Tickets
          </button>
          <button onClick={() => router.push("/")} className="btn-secondary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // ---- Booking form ----
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface border border-gray-800 rounded-xl p-6 space-y-5"
    >
      <div>
        <label className="block text-sm text-muted mb-1">Select Date</label>
        <input
          type="date"
          required
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm text-muted mb-1">Select Time</label>
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="input-field"
        >
          {SHOW_TIMES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-muted mb-1">
          Number of Seats
        </label>
        <input
          type="number"
          required
          min={1}
          max={10}
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          className="input-field"
        />
      </div>

      {/* Total price is calculated automatically: seats x price per seat */}
      <div className="bg-surface2 rounded-lg p-4 flex items-center justify-between">
        <span className="text-muted">Total Price</span>
        <span className="text-xl font-bold text-accent">₹{totalPrice}</span>
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
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </form>
  );
}
