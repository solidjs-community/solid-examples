/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grayish: "#605bff1a",
        blue: "#605BFF",
        blackish: "#030229",
        bg: "#0302290d",
      },
      fontFamily: {
        Nunito: ["Nunito"],
      },
      animation: {
        "fade-in": "fade-in 1s ease-out",
      },
    },
  },
  plugins: [],
};
