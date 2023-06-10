/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "400": "#D65DB1",
          "500": "#b91988",
        },
        background: {
          "400": "#5FFBF1"
        }
      },
      boxShadow: {
        0: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        1: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        3: "rgb(0 0 0 / 35%) 0px 5px 15px",
        10: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        83: "rgba(0, 0, 0, 0.2) 0px 20px 30px",
        44: "rgb(0 0 0 / 9%) 0px 2px 1px, rgb(0 0 0 / 9%) 0px 4px 2px, rgb(0 0 0 / 9%) 0px 8px 4px, rgb(0 0 0 / 9%) 0px 16px 8px, rgb(0 0 0 / 9%) 0px 32px 16px",
      }
    },
  },
  plugins: [],
}

