/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2c3e2d",
        "on-primary": "#f0f5ee",
        "primary-container": "#c5d5bf",
        surface: "#faf8f4",
        "on-surface": "#1a2a22",
        "surface-variant": "#dee4d9",
        "on-surface-variant": "#454e47",
        "outline-variant": "#a6b0a3"
      },
      fontFamily: {
        headline: ["Playfair Display", "serif"],
        body: ["Manrope", "sans-serif"],
        label: ["Manrope", "sans-serif"]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
