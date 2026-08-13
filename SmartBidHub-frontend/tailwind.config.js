/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        // High-end Professional Palette
        burgundy: "#4a0404",    // Deep background accent
        primary: {
          DEFAULT: "#fb6376",   // Your brand accent color
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#2563eb",   // Trust Blue
          foreground: "#ffffff",
        },
        background: "#0a0a0a",  // Dark background
        foreground: "#f9f9f9",  // Off-white text
        muted: {
          DEFAULT: "#1a1a1a",
          foreground: "#a1a1aa",
        },
        border: "#27272a",      // Subtle borders
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
      },
      
    },
  },
  plugins: [],
};
