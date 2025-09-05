/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(220, 20%, 95%)',
        accent: 'hsl(160, 80%, 45%)',
        primary: 'hsl(200, 80%, 50%)',
        surface: 'hsl(220, 20%, 100%)',
        'text-primary': 'hsl(220, 15%, 25%)',
        'text-secondary': 'hsl(220, 15%, 45%)',
        dark: {
          bg: 'hsl(220, 20%, 8%)',
          surface: 'hsl(220, 20%, 12%)',
          'text-primary': 'hsl(220, 15%, 95%)',
          'text-secondary': 'hsl(220, 15%, 75%)',
        }
      },
      borderRadius: {
        'lg': '16px',
        'md': '10px',
        'sm': '6px',
      },
      spacing: {
        'lg': '20px',
        'md': '12px',
        'sm': '8px',
      },
      boxShadow: {
        'card': '0 8px 24px hsla(220, 15%, 12%, 0.12)',
        'modal': '0 12px 32px hsla(220, 15%, 12%, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
