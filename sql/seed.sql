-- =========================================================
-- FilmFinder Sample Data
-- Run this AFTER schema.sql to fill the movies table
-- with sample data so the website has content to show.
--
-- Note: Posters use placehold.co placeholder images since
-- this is a college project and we don't have real poster
-- images/licensing. Replace the "poster" URLs with real
-- image links any time.
-- =========================================================

INSERT INTO movies (title, genre, language, rating, duration, poster, description) VALUES
('The Last Horizon', 'Sci-Fi', 'English', 8.6, 142, 'https://placehold.co/400x600/1a1a1a/e50914?text=The+Last+Horizon', 'A team of astronauts race against time to save Earth from a mysterious cosmic anomaly threatening all life.'),
('Midnight Chase', 'Action', 'English', 7.9, 118, 'https://placehold.co/400x600/1a1a1a/e50914?text=Midnight+Chase', 'An undercover cop must outrun a ruthless crime syndicate through the neon streets of the city in one wild night.'),
('Laughter Therapy', 'Comedy', 'English', 7.2, 105, 'https://placehold.co/400x600/1a1a1a/e50914?text=Laughter+Therapy', 'Three childhood friends reunite for a disastrous road trip that turns into the funniest weekend of their lives.'),
('Silent Vows', 'Drama', 'Hindi', 8.3, 150, 'https://placehold.co/400x600/1a1a1a/e50914?text=Silent+Vows', 'A heartfelt story of two families whose lives intertwine through love, sacrifice, and long-held secrets.'),
('Haunted Manor', 'Horror', 'English', 6.8, 98, 'https://placehold.co/400x600/1a1a1a/e50914?text=Haunted+Manor', 'A group of friends spend a night in an abandoned manor, unaware of the dark spirits waiting inside.'),
('Kingdom of Ash', 'Fantasy', 'English', 8.9, 165, 'https://placehold.co/400x600/1a1a1a/e50914?text=Kingdom+of+Ash', 'A banished prince must reclaim his throne with the help of an unlikely army of misfits and mythical creatures.'),
('Heartbeats', 'Romance', 'Hindi', 7.5, 132, 'https://placehold.co/400x600/1a1a1a/e50914?text=Heartbeats', 'Two strangers meet on a train and share a whirlwind romance that changes the course of their lives forever.'),
('Code Red', 'Thriller', 'English', 8.1, 121, 'https://placehold.co/400x600/1a1a1a/e50914?text=Code+Red', 'A cybersecurity expert uncovers a global conspiracy that puts her and her family directly in the crosshairs.'),
('The Champion''s Run', 'Sports', 'English', 7.8, 128, 'https://placehold.co/400x600/1a1a1a/e50914?text=The+Champions+Run', 'An underdog athlete overcomes injury and doubt to chase one final shot at Olympic gold.'),
('Galaxy Raiders', 'Sci-Fi', 'English', 7.4, 138, 'https://placehold.co/400x600/1a1a1a/e50914?text=Galaxy+Raiders', 'A rogue crew of space smugglers stumble upon a weapon that could tip the balance of an interstellar war.'),
('Family Ties', 'Comedy', 'Hindi', 6.9, 112, 'https://placehold.co/400x600/1a1a1a/e50914?text=Family+Ties', 'A chaotic joint family tries to plan a wedding while hiding decades of hilarious secrets from each other.'),
('The Detective''s Ledger', 'Mystery', 'English', 8.4, 145, 'https://placehold.co/400x600/1a1a1a/e50914?text=Detectives+Ledger', 'A retired detective is pulled back for one last case when a murder mirrors his most infamous unsolved file.'),
('Shadow Warriors', 'Action', 'Hindi', 7.6, 140, 'https://placehold.co/400x600/1a1a1a/e50914?text=Shadow+Warriors', 'A special forces unit goes rogue to expose corruption at the highest levels of the government.'),
('Whispering Woods', 'Horror', 'English', 6.5, 101, 'https://placehold.co/400x600/1a1a1a/e50914?text=Whispering+Woods', 'Campers deep in the forest realize the legend of the woods watching them is terrifyingly real.'),
('Second Chances', 'Drama', 'English', 8.0, 129, 'https://placehold.co/400x600/1a1a1a/e50914?text=Second+Chances', 'A washed-up musician gets one more shot at redemption when his estranged daughter asks him to write her a song.');
