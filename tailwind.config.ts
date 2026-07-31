import type { Config } from "tailwindcss";

// Tailwind CSS configuration for FilmFinder
// Theme: Dark background with a red accent color (like a cinema theme)
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette used across the site
        background: "#0d0d0d", // main dark background
        surface: "#1a1a1a", // cards / navbar background
        surface2: "#242424", // slightly lighter surface (inputs, hover)
        accent: "#e50914", // red accent color (buttons, highlights)
        "accent-hover": "#f6121d", // lighter red for hover state
        muted: "#a3a3a3", // muted gray text
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};

export default config;
