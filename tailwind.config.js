/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        ...defaultTheme.screens,
      },

      colors: {
        background: "hsl(0, 0%, 90%)",
        background2: "hsl(206, 93%, 95%)",
        button: "hsl(141, 73%, 52%)",
        text: "hsl(180, 63%, 41%)",
        gray: "hsl(218, 11%, 65%)",
      },

      boxShadow: {
        neo: `0.3rem 0.3rem 0.5rem hsla(264, 4%, 77%, 0.9), -0.2rem -0.2rem 0.4rem hsl(0, 0%, 100%)`,

        neoRaised: `inset 0.2rem 0.2rem 0.5rem hsl(0, 0%, 100%), inset -0.2rem -0.2rem 0.5rem hsla(264, 4%, 77%, 0.9), 0.3rem 0.3rem 0.5rem hsla(264, 4%, 77%, 0.9), -0.2rem -0.2rem 0.4rem hsl(0, 0%, 100%)`,

        neoInset: `inset 0.2rem 0.2rem 0.5rem hsla(264, 4%, 77%, 0.9),
        inset -0.2rem -0.2rem 0.5rem hsl(0, 0%, 100%)`,

        buttonShadow: `inset 0.2rem 0.2rem 0.5rem hsl(141, 31%, 80%),
        inset -0.2rem -0.2rem 0.5rem hsl(141, 73%, 42%),
        0.3rem 0.3rem 0.5rem hsla(264, 4%, 77%, 0.9),
        -0.2rem -0.2rem 0.4rem hsl(0, 0%, 100%)`,

        loaderCircle: `inset -5px -5px 5px rgba(0, 0, 0, 0.2),
        inset 5px 5px 5px hsl(0, 0%, 100%)`,
      },

      backgroundImage: {
        artistInfo: `linear-gradient(180deg, rgba(0,0,0,0) 0%, hsla(0,0%,0%,0.3) 30%, hsla(0,0%,0%,1) 100%)`,
        about: `linear-gradient(180deg, rgba(0,0,0,0) 0%, hsla(0,0%,0%,0.6) 100%)`,
        seekBar: `linear-gradient(145deg, hsl(180, 63%, 41%) 0%, hsl(180, 63%, 63%) 100% )`,
        themeGrad: `linear-gradient(hsl(180, 63%, 41%) 0%, hsl(180, 63%, 50%) 100% )`,
        likedSongs: `linear-gradient(
          138deg,
          hsl(238, 100%, 49%) 0%,
          hsl(0, 0%, 100%) 100%
        )`,
      },

      keyframes: {
        loaderKeyframes: {
          "0%": {
            transform: "translateY(4.5rem)",
            filter: "hue-rotate(180deg)",
          },
          "50%": {
            transform: "translateY(0rem)",
          },
          "100%": {
            transform: "translateY(4.5rem)",
          },
        },
        openingSequence: {
          "0%": {
            filter: `blur(${4}px)`,
            opacity: 0.2,
            transform: `rotateY(${-90}deg)`,
          },
          "50%": {
            filter: `blur(${2}px)`,
            opacity: 0.6,
            transform: `rotateY(${0}deg)`,
          },
          "100%": {
            filter: `blur(${0.2}px)`,
            opacity: 0.8,
            transform: `rotateY(${0}deg) translateX(${0}em) scale(1.1)`,
          },
        },
      },

      animation: {
        "spin-slow": "spin 20s linear infinite forwards",
      },
    },
  },
  plugins: [],
};
