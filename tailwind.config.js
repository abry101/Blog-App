/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      minHeight: {
        sm: {
          "min-height": "480px",
          height: "100%",
        },
        md: {
          "min-height": "540px",
          height: "100%",
        },
      },
      maxHeight: {
        md: {
          "max-height": "540px",
          height: "100%",
        },
      },
      height: {
        sm: {
          height: "480px",
        },
        md: {
          height: "540px",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#fe4f70",
          secondary: "#ffa387",
          accent: "#1dcdbc",
          neutral: "#8f9bad",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#16a249",
          warning: "#db7706",
          error: "#dc2828",
        },
        halloween: {
          primary: "#fe4f70",
          secondary: "#ffa387",
          accent: "#51a800",
          neutral: "#8f9bad",
          "base-100": "#142030",
          info: "#3abff8",
          success: "#16a249",
          warning: "#db7706",
          error: "#dc2828",
        },
      },
    ], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "halloween", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
