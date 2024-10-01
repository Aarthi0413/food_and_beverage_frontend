/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-gray': '0 4px 10px rgba(128, 128, 128, 0.5)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

