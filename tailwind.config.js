/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'input',
    'input-bordered',
    'btn',
    'btn-primary',
    'btn-sm',
    'dropdown',
    'dropdown-content',
    'rounded-box',
    'shadow',
    'text-black',
    'border',
    'w-full',
    'mt-10',
    'p-4',
    'rounded-lg',
    'border-yellow-400'
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["cupcake", "dark", "light"],
  },
};

