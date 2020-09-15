module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {},
  variants: {
    backgroundClip: ["responsive", "hover", "focus"],
    backgroundImage: ["responsive", "hover", "focus"],
  },
  plugins: [require("@tailwindcss/ui"), require("@tailwindcss/typography")],
};
