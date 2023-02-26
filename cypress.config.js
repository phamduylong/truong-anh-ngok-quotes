const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    downloadsFolder: 'test/cypress/downloads',
    screenshotsFolder: 'test/cypress/screenshots',
    videosFolder: 'test/cypress/videos',
    supportFile: 'test/cypress/support/e2e.{js,jsx,ts,tsx}',
    specPattern: 'test/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    baseUrl: 'http://localhost:5173'
  }
});
