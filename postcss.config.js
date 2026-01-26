/**
 * PostCSS Configuration
 *
 * WHAT IS POSTCSS?
 * - PostCSS is a CSS processor (like a compiler for CSS)
 * - It transforms CSS using plugins
 *
 * ANGULAR COMPARISON:
 * - Angular CLI has PostCSS built-in behind the scenes
 * - With Vite, we configure it explicitly
 *
 * OUR PLUGINS:
 * 1. @tailwindcss/postcss - Processes Tailwind CSS (v4+ uses separate package)
 * 2. autoprefixer - Adds vendor prefixes (-webkit-, -moz-, etc.) automatically
 */
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
