/**
 * Tailwind CSS v4 Configuration
 *
 * NOTE: In Tailwind v4, this config file is OPTIONAL for basic usage.
 * Tailwind v4 auto-detects your source files and uses CSS-first configuration.
 *
 * This file is kept for:
 * - Compatibility with tooling (VS Code IntelliSense, etc.)
 * - Adding JavaScript-based plugins
 * - Complex customizations not possible in CSS
 *
 * For simple customizations, prefer using @theme in your CSS file instead.
 *
 * ANGULAR COMPARISON:
 * - Similar to having a configuration file that tools can reference
 * - The actual styling config happens in the CSS file with @theme
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add custom theme extensions here if needed
      // For simple customizations, prefer using @theme in index.css
    },
  },
  plugins: [],
}
