const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const isModern = process.env.BROWSERSLIST_ENV === 'modern';

module.exports = (env, argv) => {
  return merge(baseConfig(env, argv), {
    entry: {
      'main': './src/index.ts',
      'polyfills': isModern ? './polyfills.modern.ts' : './polyfills.legacy.ts'
    },
    externals: {
      'vue': 'window.Vue',
      'vuetify': 'window.Vuetify'
    }
  });
};