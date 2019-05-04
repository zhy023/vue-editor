const path = require('path');
const root = path.resolve(__dirname);

module.exports = {
  runtimeCompiler: true,
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  configureWebpack: {
    devServer: {
      hot: true,
      open: true,
      port: 8848,
    },
    mode: 'development',
    resolve: {
      symlinks: false,
      alias: {
        src: `${root}/src`,
      }
    },
  },
};
