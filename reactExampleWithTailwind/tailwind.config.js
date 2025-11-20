export default {
  darkMode: 'class', // Manuel class toggle ile dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'card-hover': 'linear-gradient(to right, var(--tw-gradient-stops))'
      }
    },
  },
  plugins: [],
}