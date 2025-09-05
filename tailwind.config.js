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
        background: 'hsl(220, 20%, 95%)',
        accent: 'hsl(160, 80%, 45%)',
        primary: 'hsl(200, 80%, 50%)',
        surface: 'hsl(220, 20%, 100%)',
        'text-primary': 'hsl(220, 15%, 25%)',
        'text-secondary': 'hsl(220, 15%, 45%)',
        'dark-bg': 'hsl(240, 15%, 8%)',
        'dark-surface': 'hsl(240, 15%, 12%)',
        'purple-primary': 'hsl(270, 80%, 60%)',
        'blue-primary': 'hsl(220, 80%, 60%)',
      },
      borderRadius: {
        'lg': '16px',
        'md': '10px',
        'sm': '6px',
      },
      boxShadow: {
        'card': '0 8px 24px hsla(220, 15%, 12%, 0.12)',
        'modal': '0 12px 32px hsla(220, 15%, 12%, 0.2)',
        'glow': '0 0 20px hsla(270, 80%, 60%, 0.3)',
      },
      spacing: {
        'lg': '20px',
        'md': '12px',
        'sm': '8px',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px hsla(270, 80%, 60%, 0.3)' },
          '50%': { boxShadow: '0 0 30px hsla(270, 80%, 60%, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
