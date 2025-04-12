/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-200": "#008000",
        "primary-100": "#228B22",
        "secondary-100": "#00B050",
        "secondary-200": "#0B1A78",
      },
    },
  },
  plugins: [],
};
