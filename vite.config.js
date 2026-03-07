import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/URL-Shortening-React/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  test : {
    globals: false,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    transformMode: {
      web: [/\.[jt]sx?$/] 
    },
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    esbuild: {
      loader: 'jsx',
       include: ['src/**/*.test.{js,jsx,ts,tsx}', 'src/**/*.spec.{js,jsx,ts,tsx}'],
    },
    deps: {
      inline: ['jest-axe'], // Handle jest-axe in Vitest
    },
  },
})
