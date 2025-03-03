const dotenv = require("dotenv");
const path = require("path");
const { defineConfig } = require("cypress");

dotenv.config()

const localEnv = process.env.LOCAL_ENV

if (localEnv) {
  const envFilePath = path.resolve(process.cwd(), `config/${localEnv}.env`)
  dotenv.config({ path: envFilePath })
}

module.exports = defineConfig({
  env: {
    apiUrl: process.env.API_URL,
  },
  fixturesFolder: "cypress/fixtures",
  screenshotOnRunFailure: false,
  e2e: {
    specPattern: "**/*.spec.js",
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportFilename: "[name]_[datetime]-[status]-report",
    timestamp: "longDate"
  },
  setupNodeEvents(on, config) {
    // implement node event listeners here
  },
});
