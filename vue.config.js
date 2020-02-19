module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
  devServer: {
    proxy: {
      '/v1': {
        target: 'http://localhost',
        ws: true,
        changeOrigin: true
      }
    }
  }
};

