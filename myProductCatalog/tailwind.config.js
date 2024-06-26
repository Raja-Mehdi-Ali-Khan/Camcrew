/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        heading: "rgb(24 24 29)",
        text: "rgba(29 ,29, 29, .8)",
        white: "#fff",
        // black: " #212529",
        helper: "#8490ff",
        bgimage: "#ffd278ff",
        bgdarkimage: "#ffae00ff",
        text_2: "#8490ff",
        bg: "#FEF6F6",
        footer_bg: "#201D1D",
        btn: "#e40046",
        border: "rgba(98, 84, 243, 0.5)",
        hr: "#ffffff",
        gradient:
          "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
        shadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
        shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
      },
    },
  },
  plugins: [],
};
