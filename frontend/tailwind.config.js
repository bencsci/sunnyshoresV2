/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: "#FDF5E6",
        teal: "#009688",
        darkTeal: "#007A6E",
      },
      keyframes: {
        loading: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        loading: "loading 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
