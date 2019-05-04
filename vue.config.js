const path = require('path');
const root = path.resolve(__dirname);

module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    devServer: {
      hot: true,
      open: true,
      port: 8848,
    },
    mode: 'development',
    // build: {
    //   index: `${root}/dist/index.html`,
    //   assetsRoot: `${root}/dist`,
    //   assetsSubDirectory: 'public',
    //   assetPublicPath:`${root}/dist`,
    // },
    resolve: {
      symlinks: false,
      alias: {
        src: `${root}/src`,
      }
    },
  },
};
