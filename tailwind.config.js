/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#e6f4f9',
          100: '#b3d9eb',
          200: '#80bedc',
          300: '#4da3ce',
          400: '#2690c5',
          500: '#0B4F6C',
          600: '#094560',
          700: '#073a52',
          800: '#052e41',
          900: '#032130',
        },
        sky: {
          400: '#60a8fb',
          500: '#3A86FF',
          600: '#1a6bff',
        },
        emerald: {
          400: '#34e8b8',
          500: '#06D6A0',
          600: '#05b888',
        },
        amber: {
          400: '#ffd94d',
          500: '#FFD166',
          600: '#ffc933',
        },
        coral: {
          400: '#ff8c5a',
          500: '#FF6B35',
          600: '#ff4d0d',
        },
        dark: {
          900: '#0D1B2A',
          800: '#112233',
          700: '#1a3045',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
        accent: ['Manrope', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-ocean': 'linear-gradient(135deg, #0B4F6C 0%, #3A86FF 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #FF6B35 0%, #FFD166 100%)',
        'gradient-emerald': 'linear-gradient(135deg, #06D6A0 0%, #3A86FF 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0D1B2A 0%, #1a3045 100%)',
        'hero-overlay': 'linear-gradient(to bottom, rgba(13,27,42,0.3) 0%, rgba(13,27,42,0.7) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glow-blue': '0 0 30px rgba(58, 134, 255, 0.4)',
        'glow-emerald': '0 0 30px rgba(6, 214, 160, 0.4)',
        'glow-orange': '0 0 30px rgba(255, 107, 53, 0.4)',
        'card': '0 20px 60px rgba(0,0,0,0.1)',
        'card-hover': '0 30px 80px rgba(0,0,0,0.2)',
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      screens: {
        'xs': '375px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}
