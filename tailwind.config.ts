import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"

export default {
  darkMode: ["class"],
  content: [
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        Gray: "#e5e7eb",
        "Gray-light": "#F3F4F6",
        "Gray-blue": "#6B7280",
        "blue-lighter": "#3A424E",
        "blue-light": "#9CA3AF",
        Green: "#05C151",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config
