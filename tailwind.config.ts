import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx, css}',
  ],
  theme: {
    extend: {
      maxWidth: {
        '3xl': '56rem',
        '4xl': '80rem',
      },
      fontFamily: {
        righteous: ['Righteous', 'cursive'],
        noto: ['Noto Sans', 'sans-serif'],
        'moirai-one': ['Moirai One', 'sans-serif'],
      },
      colors: {
        'soft-blue': {
          200: '#b2d3e2',
          400: '#8bb8d8',
          600: '#6b8fbe',
          800: '#486ba7',
          900: '#3B4F80',
        },
        mint: {
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#81E6D9',
          400: '#4FD1C5',
          500: '#34D399',
          600: '#2BB28B',
          700: '#169D73',
          800: '#0F7F5F',
          900: '#0B5A47',
        },
        'soft-violet': {
          400: '#9b59b6',
        },
        kakao: {
          container: '#FEE500',
          symbol: '#000000',
          label: '#000000',
        },
        github: {
          container: '#24292E',
          label: '#FFFFFF',
        },
        google: {
          container: '#4285F4',
          symbol: '#FFFFFF',
          label: '#FFFFFF',
        },
      },
      animation: {
        shake: 'shake 0.3s ease-in-out',
        fadeIn: 'fadeIn 0.5s ease-out',
        fadeOut: 'fadeOut 0.5s ease-out',
        slideUp: 'slideUp 0.3s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
        fliker: 'flicker 5s infinite both',
      },
      keyframes: {
        shake: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '50%': { transform: 'translateX(2px)' },
          '75%': { transform: 'translateX(-2px)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        flicker: {
          '0%': { opacity: '0.2' },
          '10%': { opacity: '0.9' },
          '20%': { opacity: '0.1' },
          '30%': { opacity: '0.8' },
          '40%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant, addUtilities }) {
      addVariant('focus-within', '&:focus-within')
      addUtilities({
        '.transition-hover:hover': {
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.15s ease-in-out 0.1s',
        },
      })
    }),
  ],
}
export default config
