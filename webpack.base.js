const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isModern = process.env.BROWSERSLIST_ENV === 'modern';
const buildRoot = path.resolve(__dirname, './dist');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HappyPack = require('happypack');
const os = require('os');
const threadCount = Math.min(4, os.cpus().length - 1);
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const styleLoaders = [
  MiniCssExtractPlugin.loader, {
    loader: 'css-loader',
    options: {
      importLoaders: 2
    }
  }, {
    loader: 'postcss-loader',
    options: {
      plugins: () => [
        require('autoprefixer')({ grid: !isModern })
      ]
    }
  }];

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';

  let config = {
    output: {
      path: path.join(buildRoot, isModern ? 'modern' : 'legacy'),
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.vue', '.ts', '.js', '.scss', '.css'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=babel-loader'
      }, {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          'happypack/loader?id=babel-loader',
          'happypack/loader?id=ts-loader'
        ]
      }, {
        test: /\.vue$/,
        use: 'vue-loader'
      }, {
        test: /\.scss$/,
        use: [...styleLoaders, {
          loader: 'sass-loader',
          options: {
            sourceMap: !devMode,
            outputStyle: devMode ? 'expanded' : 'compressed'
          }
        }]
      }, {
        test: /\.css$/,
        use: styleLoaders
      }]
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new HappyPack({
        id: 'ts-loader',
        threads: threadCount,
        loaders: [{
          loader: 'ts-loader',
          query: {
            happyPackMode: true,
            appendTsSuffixTo: [/\.vue$/]
          }
        }]
      }),
      new HappyPack({
        id: 'babel-loader',
        threads: threadCount,
        loaders: ['babel-loader']
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: true,
        statsFilename: path.join(buildRoot, isModern ? 'modern' : 'legacy', './stats.json'),
        statsOptions: {
          hash: false,
          version: false,
          timings: false,
          chunkOrigins: false,
          modules: false,
          cachedAssets: false,
          children: false,
          source: false,
          errors: false,
          errorDetails: false,
          warnings: false,
          exclude: []
        }
      }),
    ]
  };

  if (devMode) {
    config.devtool = 'source-map';
  }

  return config;
};
