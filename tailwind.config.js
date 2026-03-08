/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0c1f3f',
        royal: '#163a70',
        gold: '#d8b36a',
        goldSoft: '#f2dfb1',
        ink: '#eef3ff'
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        script: ['Great Vibes', 'cursive'],
        body: ['Cormorant Garamond', 'serif'],
      },
      boxShadow: {
        soft: '0 14px 40px rgba(0, 0, 0, 0.24)',
        gold: '0 0 0 1px rgba(216,179,106,.3), 0 12px 40px rgba(0,0,0,.25)'
      },
      backgroundImage: {
        stars: 'radial-gradient(circle at 18% 16%, rgba(255,255,255,.18) 0 1px, transparent 2px), radial-gradient(circle at 74% 22%, rgba(255,255,255,.14) 0 1.2px, transparent 2.2px), radial-gradient(circle at 30% 62%, rgba(255,255,255,.16) 0 1.4px, transparent 2.4px), radial-gradient(circle at 82% 68%, rgba(255,255,255,.15) 0 1px, transparent 2px), radial-gradient(circle at 52% 40%, rgba(216,179,106,.10) 0 2px, transparent 10%), linear-gradient(180deg, #07142a 0%, #0c1f3f 44%, #132f59 100%)'
      }
    },
  },
  plugins: [],
}
