/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    function({ addVariant, e }) {
      addVariant('rtl', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.rtl .${e(`rtl${separator}${className}`)}`
        })
      })
      addVariant('ltr', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.ltr .${e(`ltr${separator}${className}`)}`
        })
      })
    }
  ],
};
