import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default { 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      fontHeaders: '"Sedgwick Ave Display"',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        primary: colors.slate,
        secondary: colors.yellow,
        accent: colors.violet,
      },
    },
  },
  safelist: [
    {
      pattern: /grid-cols-[0-9]/,
    },
    {
      pattern: /grid-rows-[0-9]/,
    },
    {
      pattern: /bg-[\w-]+-300/,
    },
  ],
  plugins: [],
} satisfies Config;

