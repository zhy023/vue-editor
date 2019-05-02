const path = require('path');
const root = path.resolve(__dirname);

module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    devServer: {
      hot: true,
      open: true,
      port: 8080,
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
