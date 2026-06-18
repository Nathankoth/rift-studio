import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f0e0d",
        surface: "#1a1916",
        border: "#2a2825",
        accent: "#FF4D00",
        "accent-dim": "#cc3d00",
        primary: "#F5F0EB",
        muted: "#7a7672",
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-dm-serif)", "serif"],
      },
      fontSize: {
        "mega": "clamp(4rem, 15vw, 16rem)",
        "huge": "clamp(3rem, 8vw, 8rem)",
      },
      animation: {
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
