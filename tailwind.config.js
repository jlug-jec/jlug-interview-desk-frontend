/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary' : '#A974FF',
        'bgprimary' : '#ECECEC',
        'form-input' : '#F6F6F6',
        'success' : '#2e7d32',
        'discard' : '#d32f2f',
        'discard-hv' : '#f0baba',
        'success-hv' : '#bfe7c1'
      }
    },
  },
  plugins: [],
}

