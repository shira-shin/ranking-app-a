module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4A90E2',
          dark: '#3076c7'
        },
        accent: {
          DEFAULT: '#F5A623',
          dark: '#d9880e'
        },
        background: '#F8F9FA',
        surface: '#FFFFFF',
        textPrimary: '#212529',
        textSecondary: '#6C757D',
        border: '#DEE2E6'
      },
      spacing: {
        section: '1.5rem',
        page: '2rem'
      },
      fontFamily: {
        sans: ['Inter', '\'Noto Sans JP\'', 'sans-serif']
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in forwards'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')],
};
