/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F6B4F",
          light: "#E6F2EC",
          dark: "#0A4D38",
        },
        ink: "#16201C",
        muted: "#6B7872",
        bg: "#F7F8F6",
        card: "#FFFFFF",
        border: "#E3E8E5",
        amber: {
          DEFAULT: "#D98A2B",
          light: "#FBEACB",
        },
        success: "#0F6B4F",
        warning: "#D98A2B",
        error: "#C53030",
        info: "#2B6CB0",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        btn: "20px",
      },
      maxWidth: {
        app: "430px",
      },
    },
  },
  plugins: [],
};
