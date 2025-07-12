module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          dark: '#2563eb'
        },
        accent: {
          DEFAULT: '#10b981',
          dark: '#059669'
        },
        accent2: {
          DEFAULT: '#F5A623',
          dark: '#d97706'
        },
        background: '#f9fafb'
      },
      spacing: {
        section: '1.5rem',
        page: '2rem'
      },
      fontFamily: {
        sans: ['\'Noto Sans JP\'', 'sans-serif']
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in forwards'
      }
    }
  },
  plugins: [],
};
