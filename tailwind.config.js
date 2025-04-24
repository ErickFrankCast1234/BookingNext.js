/** @type {import('tailwindcss').Config} */
// tailwind.config.js
// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'grid',
    'grid-cols-5',
    'items-center',
    'gap-2',
    'w-full',
    'text-black',
    'input',
    'input-bordered',
    'btn',
    'btn-primary',
    'rounded-lg',
    'border-yellow-400',
    'shadow-lg',
    'dropdown',
    'dropdown-content',
    'rounded-box',
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};

