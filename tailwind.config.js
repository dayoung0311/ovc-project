/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#1A0089",
        primaryLight: "#FE5E32",
        primarySoft: "#FFF3D6",
        primaryDark: "#B8CE52",
      },
    },
  },

  plugins: [],
}