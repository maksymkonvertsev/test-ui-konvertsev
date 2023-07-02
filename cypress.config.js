const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,
  video: false,
  e2e: {
    baseUrl: "https://juice-shop-sanitarskyi.herokuapp.com/#/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
