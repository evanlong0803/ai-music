import { defineConfig } from 'windicss/helpers';
import formsPlugin from 'windicss/plugin/forms';
import colors from 'windicss/colors';

export default defineConfig({
  darkMode: 'class',
  extract: {
    include: ['src/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git'],
  },
  safelist: 'p-3 p-4 p-5 icon router-link-active',
  theme: {
    colors: {
      gray: colors.gray, // class="text-base-xxx"
    },
    extend: {
      fontFamily: {
        sans: ['Inter var'],
        // sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
    screens: {
      tablet: '640px',
      laptop: '1024px',
      desktop: '1680px',
    },
  },
  plugins: [formsPlugin],
});
