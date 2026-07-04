import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FEFCF9',
          100: '#FAF6EF',
          200: '#F5ECD8',
          300: '#EDD9BC',
        },
        sage: {
          50: '#EEF5EE',
          100: '#D4E8D4',
          200: '#A8CFA8',
          300: '#7AB57A',
          400: '#4A7B63',
          500: '#2E5D4B',
          600: '#1F4034',
          700: '#142B23',
        },
        terra: {
          50: '#FBF0EB',
          100: '#F5D5C5',
          200: '#E8A882',
          300: '#D97B4F',
          400: '#C4622D',
          500: '#A04D1F',
          600: '#7A3815',
        },
        stone: {
          warm: '#8B7355',
          light: '#C4B49A',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.8s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'blob': 'blob 10s ease-in-out infinite',
        'butterfly': 'butterflyFly 18s ease-in-out infinite',
        'wing-left': 'wingLeft 0.5s ease-in-out infinite',
        'wing-right': 'wingRight 0.5s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        blob: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '25%': { borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%' },
          '50%': { borderRadius: '30% 70% 40% 60% / 50% 40% 60% 50%' },
          '75%': { borderRadius: '70% 30% 60% 40% / 30% 60% 40% 70%' },
        },
        butterflyFly: {
          '0%':   { transform: 'translate(0px, 0px) rotate(-8deg) scaleX(1)' },
          '15%':  { transform: 'translate(60px, -50px) rotate(5deg) scaleX(1)' },
          '30%':  { transform: 'translate(120px, -20px) rotate(-5deg) scaleX(-1)' },
          '45%':  { transform: 'translate(80px, 40px) rotate(8deg) scaleX(-1)' },
          '60%':  { transform: 'translate(30px, 10px) rotate(-3deg) scaleX(1)' },
          '75%':  { transform: 'translate(-40px, -60px) rotate(6deg) scaleX(1)' },
          '100%': { transform: 'translate(0px, 0px) rotate(-8deg) scaleX(1)' },
        },
        wingLeft: {
          '0%, 100%': { transform: 'perspective(200px) rotateY(0deg)' },
          '50%':       { transform: 'perspective(200px) rotateY(70deg)' },
        },
        wingRight: {
          '0%, 100%': { transform: 'perspective(200px) rotateY(0deg)' },
          '50%':       { transform: 'perspective(200px) rotateY(-70deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
