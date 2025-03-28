/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#334155', // slate-700
            a: {
              color: '#0f5a5e',
              '&:hover': {
                color: '#003366',
              },
            },
            h2: {
              color: '#0f5a5e',
              fontWeight: '700',
            },
            h3: {
              color: '#0f5a5e',
              fontWeight: '600',
            },
            blockquote: {
              borderLeftColor: '#003366',
              color: '#64748b', // slate-500
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
} 