# 🎬 FilmFinder – Movie Ticket Booking & Recommendation System

FilmFinder is a full-stack movie ticket booking website built as a college
project. Users can register/login, browse trending movies, view movie
details, book tickets, and see genre-based movie recommendations.

---

## 📖 Project Description

FilmFinder lets a user:
1. Register and log in with an email + password.
2. Browse trending and recommended movies on the Home page.
3. Search for movies by title.
4. View a movie's full details (poster, genre, rating, duration, description).
5. Book a ticket by choosing a date, show time, and number of seats.
6. Get a unique Ticket ID after booking.
7. View all their booked tickets on the "My Tickets" page.
8. See recommended movies based on the genre of the movie they're viewing.

---

## ✨ Features

- 🔐 User Registration & Login (passwords hashed with bcrypt)
- 🏠 Home page with Trending Movies, Recommended Movies & Search
- 🎞️ Movie Details page
- 🎟️ Ticket booking with automatic price calculation
- 🆔 Unique Ticket ID generation for every booking
- 📃 "My Tickets" page listing all bookings for the logged-in user
- 🎯 Simple genre-based movie recommendation logic
- 🌙 Dark theme UI with a red accent color, fully responsive

---

## 🛠️ Tech Stack

| Layer          | Technology                       |
|-----------------|-----------------------------------|
| Framework       | Next.js (App Router)             |
| Language        | TypeScript                       |
| Styling         | Tailwind CSS                     |
| Backend         | Next.js API Routes               |
| Database        | PostgreSQL (Neon)                |
| Password Hashing| bcryptjs                         |
| DB Driver       | pg (node-postgres)               |

---

## 📁 Folder Structure

```
filmfinder/
├── app/                    # App Router pages & API routes
│   ├── page.tsx            # Home page
│   ├── layout.tsx          # Root layout (Navbar + Footer)
│   ├── register/           # Register page
│   ├── login/               # Login page
│   ├── movie/[id]/          # Movie Details page
│   ├── book/[id]/            # Book Ticket page
│   ├── my-tickets/           # My Tickets page
│   └── api/                  # API Routes
│       ├── auth/register/
│       ├── auth/login/
│       ├── auth/logout/
│       ├── movies/
│       ├── movies/[id]/
│       └── bookings/
├── components/              # Reusable UI components
├── lib/                      # DB connection, auth helpers, types, utils
├── public/                   # Static assets
├── styles/                   # Global CSS (Tailwind)
├── sql/                      # Database schema & sample data
│   ├── schema.sql
│   └── seed.sql
├── .env.example
└── README.md
```

---

## ⚙️ Installation Steps

1. **Clone or download this project**

   ```bash
   git clone <your-repo-url>
   cd filmfinder
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env` and paste your Neon PostgreSQL
   connection string:

   ```bash
   cp .env.example .env
   ```

   ```
   DATABASE_URL=postgresql://username:password@your-neon-host/neondb?sslmode=require
   ```

---

## 🗄️ Database Setup (Neon PostgreSQL)

1. Create a free account and project at [neon.tech](https://neon.tech).
2. Copy the connection string from your Neon dashboard into `.env`.
3. Run the SQL files against your Neon database (using the Neon SQL
   Editor, or `psql`, or any PostgreSQL client):

   - `sql/schema.sql` → creates the `users`, `movies`, and `bookings` tables.
   - `sql/seed.sql` → inserts 15 sample movies so the site has content.

   Using `psql`:

   ```bash
   psql "$DATABASE_URL" -f sql/schema.sql
   psql "$DATABASE_URL" -f sql/seed.sql
   ```

---

## ▶️ Run Commands

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

Other useful commands:

```bash
npm run build   # build for production
npm run start   # run the production build
```

---

## 🧠 How It Works (Quick Explanation for Viva)

- **Authentication:** Register/Login pages send data to `/api/auth/register`
  and `/api/auth/login`. Passwords are hashed with `bcryptjs` before being
  stored. On successful login/register, a simple httpOnly cookie
  (`ff_session`) storing the user's ID is set — this is how the app knows
  who is logged in on later requests.
- **Database:** All queries go through a single reusable connection pool
  in `lib/db.ts`, using the `pg` library.
- **Booking:** The Book Ticket page lets the user pick a date, time, and
  seat count. The total price (`seats × ₹200`) is calculated automatically
  in the UI and re-calculated on the server for safety. A random Ticket ID
  (e.g. `FF-8K2P9X4A`) is generated and the booking is saved to the
  `bookings` table.
- **Recommendations:** On the Movie Details page, the app queries the
  `movies` table for other movies with the *same genre* as the current
  movie — a simple `WHERE genre = $1` filter, no AI/ML involved.

---

## 📌 Notes

- Movie posters use placeholder images from `placehold.co` since this is a
  college project without licensed movie artwork — feel free to swap in
  real poster URLs in `sql/seed.sql`.
- Ticket price is a flat ₹200 per seat for simplicity.
