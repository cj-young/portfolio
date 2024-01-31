/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "title-lg": ["6.5rem", "6.5rem"],
        "title-sm": ["5rem", "5rem"],
        subtitle: ["2rem", 1],
      },
      colors: {
        purple: "#5C07C9",
        "gray-400": "#312D36",
        "gray-200": "#D9D9D9",
      },
      boxShadow: {
        "black-thin": "0 0 16px 4px rgba(0, 0, 0, 15%)",
      },
      dropShadow: {
        "black-thin": [
          "0 0 16px rgba(0, 0, 0, 15%)",
          "0 0 4px rgba(0, 0, 0, 10%)",
        ],
      },
    },
  },
  plugins: [],
};
