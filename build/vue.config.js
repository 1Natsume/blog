// vue.config.js
module.exports = {
    css: {
      loaderOptions: {
        scss: {
          additionalData: `@import "../src/assets/scss/variables.scss";`
        }
      }
    }
  }