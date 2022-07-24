import { defineConfig } from 'windicss/helpers';
import aspectRatio from 'windicss/plugin/aspect-ratio';
import colors from 'windicss/colors';

export default defineConfig({
  darkMode: 'class',
  extract: {
    include: ['src/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git'],
  },
  shortcuts: {
    'default-color': 'light:(text-dark-500) dark:(text-gray-100)',
    'default-bg': 'light:(bg-gray-100) dark:(bg-dark-500)',
    'component-color': 'light:(text-dark-500) dark:(text-gray-100)',
    'component-bg': 'light:(bg-gray-100) dark:(bg-dark-100)',
    'hover-bg': 'light:(bg-gray-200) dark:(bg-dark-50)',
    'border-color': 'light:(border-gray-100) dark:(border-dark-300)',
  },
  safelist: 'p-3 p-4 p-5 icon router-link-active',
  theme: {
    colors: { ...colors },
    extend: {
      fontFamily: {
        sans: ['Inter var'],
        serif: ['Merriweather', 'serif'],
      },
    },
    screens: {
      tablet: '640px',
      laptop: '1024px',
      desktop: '1680px',
    },
  },
  plugins: [aspectRatio],
});
