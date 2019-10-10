const path = require('path');

const resolve = dir => path.join(__dirname, dir);

module.exports = {
  publicPath: './',
  devServer: {
    host: 'localhost',
    port: 8088,
    open: true,
    proxy: {
      '/ops': {
        target: 'http://ops.vpos.xin/ops/', //对应环境
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/ops': ''
        }
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  },
  // 上线不启用eslint
  lintOnSave: process.env.NODE_ENV === 'production' ? false : 'error',
  productionSourceMap: false,

  pluginOptions: {
    lintStyleOnBuild: process.env.NODE_ENV === 'production' ? false : true, // 添加了插件(@ascendancyy/vue-cli-plugin-stylelint), 所以需要配置
    stylelint: {
      files: ['src/**/*.vue', 'src/assets/style/*.l?(e|c)ss']
    }
  },

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'));
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap(options => {
        // 修改它的选项...
        const option = options;
        option.emitError = true;
        return options;
      });
  },
};
