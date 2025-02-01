const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        "primary": "#161A30",   // Updated color
        "secondary": "#31304D",   // Updated color
        "accent": "#B6BBC4", // Updated color
        grey: "#F0ECE5",            // Updated color
        blendbg: "#F1F1F1",         // Updated to a neutral light color
        bgsecondary: "#F0ECE5",     // Updated to match the lighter color scheme
        formbg: "#282C2F",          // Updated to a darker form background
      },
      scale: {
        side: "",
      },
    },
    plugins: [],
    backgroundImage: {
      formImage: "url('/public/formImage.png')",
      formImage2: "url('/public/bgf.png')",
      gallery: "url('/public/gb.png')",
    },
  },
});
