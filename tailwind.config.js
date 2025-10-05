/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B3202E',
        coral: '#F28B82',
        teal: '#008080',
        mustard: '#FFD166',
        bg: '#FBE9E7',
        'bg-alt': '#FDF6F0',
        text: '#333333',
        muted: '#666666',
      },
    },
  },
  plugins: [],
}
