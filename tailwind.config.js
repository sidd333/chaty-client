const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.18)",
        "overlay-color": "rgba(1,1,1,0.4)",
        grey: "#efeded",
        blendbg: "rgb(241,241,241);",
        bgsecondary: "#ECEADA",
        formbg: "rgb(40,44,47)",
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
