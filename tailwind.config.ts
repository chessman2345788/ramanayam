import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)',    'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)',    'monospace'],
        hindi:   ['var(--font-hindi)',   'sans-serif'],
      },
      colors: {
        page:     '#F5F0E8',
        surface:  '#FFFFFF',
        wash:     '#EDE8DF',
        primary:  '#E8660A',
        'primary-hover': '#C9570A',
        gold:     '#A8822A',
        maroon:   '#6B1010',
        night:    '#1A0F0A',
        cream:    '#F5E6D0',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      screens: {
        sm:  '640px',
        md:  '768px',
        lg:  '1024px',
        xl:  '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};

export default config;
