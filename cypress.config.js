import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,

  e2e: {
     baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
    },
     supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720,
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
