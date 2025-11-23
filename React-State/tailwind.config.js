/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f9ff',
          100: '#e0eeff',
          200: '#b8d9ff',
          300: '#7cbaff',
          400: '#3491fa',
          500: '#0d6efd',
          600: '#0551c4',
          700: '#043f96',
          800: '#062f6e',
          900: '#082955'
        }
      }
    }
  },
  plugins: []
};
