module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {},
  variants: {
    backgroundClip: ["responsive", "hover", "focus", "group-hover"],
    backgroundImage: ["responsive", "hover", "focus", "group-hover"],
    gradientColorStops: ["responsive", "hover", "focus", "group-hover"],
    scale: ["responsive", "hover", "focus"],
  },
  plugins: [require("@tailwindcss/ui"), require("@tailwindcss/typography")],
};
