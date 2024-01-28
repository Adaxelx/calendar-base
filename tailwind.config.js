import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const PRIMARY = colors.neutral
const SECONDARY = colors.yellow;
const ACCENT =colors.violet;

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
        primary: PRIMARY,
        secondary: SECONDARY,
        accent: ACCENT,
        background: PRIMARY[50],
        input: ACCENT[200],
        
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

