import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          850:"hsla(240, 5.7%, 82.9%, 1)",
          900:"hsla(240, 5.9%, 90%, 1)",
          950:"hsla(240, 4.8%, 95.9%, 1)",
        },
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
