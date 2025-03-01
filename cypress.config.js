const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    apiUrl: "http://localhost:3000/api/v1",
    integrationFolder: "cypress/integration",
    testFiles: "**/*.spec.js"
  },
});
