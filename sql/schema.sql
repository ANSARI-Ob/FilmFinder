-- =========================================================
-- FilmFinder Database Schema
-- Run this file first on your Neon PostgreSQL database.
-- =========================================================

-- Drop old tables if they exist (useful while developing)
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS users;

-- ---------------------------------------------------------
-- USERS TABLE
-- Stores registered users for login/register system
-- ---------------------------------------------------------
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password TEXT NOT NULL,             -- stores the HASHED password, never plain text
    created_at TIMESTAMP DEFAULT NOW()
);

-- ---------------------------------------------------------
-- MOVIES TABLE
-- Stores movie details shown on the website
-- ---------------------------------------------------------
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    genre VARCHAR(100) NOT NULL,        -- e.g. Action, Comedy, Drama
    language VARCHAR(50) NOT NULL,
    rating NUMERIC(2, 1) NOT NULL,      -- e.g. 8.5
    duration INTEGER NOT NULL,          -- duration in minutes
    poster TEXT NOT NULL,               -- poster image URL
    description TEXT NOT NULL
);

-- ---------------------------------------------------------
-- BOOKINGS TABLE
-- Stores ticket bookings made by users
-- ---------------------------------------------------------
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    movie_id INTEGER NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
    booking_date DATE NOT NULL,         -- date of the show
    show_time VARCHAR(20) NOT NULL,     -- e.g. "07:00 PM"
    seats INTEGER NOT NULL,             -- number of seats booked
    total_price NUMERIC(10, 2) NOT NULL,
    ticket_id VARCHAR(50) NOT NULL UNIQUE, -- randomly generated unique ticket code
    created_at TIMESTAMP DEFAULT NOW()
);

-- Helpful indexes for faster lookups
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_movies_genre ON movies(genre);
