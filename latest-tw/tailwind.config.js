// tailwind.config.js
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        primary: "#05f9ff",
        "dark-bg": "#000",
        "dark-secondary": "#222",
        "gray-text": "#A0A1A5",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      spacing: {
        "82px": "82px",
        "120px": "120px",
        "280px": "280px",
      },
      transitionDuration: {
        "400": "400ms",
      },
      borderRadius: {
        "12": "12px",
      },
      boxShadow: {
        nav: "0 4px 12px rgba(0, 0, 0, 0.1)",
        submenu: "0 8px 16px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
