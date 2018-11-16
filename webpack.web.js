const merge = require('webpack-merge');

module.exports = (env, argv) =>
  merge(require('./webpack.base')(env, argv), {
    entry: {
      'main': './src/index.ts',
      'polyfills': './polyfills.ts'
    },
    externals: {
      'vue': 'window.Vue',
      'vuetify': 'window.Vuetify'
    }
  });