const { name } = require('./package.json');

module.exports = {
  webpack: (config) => {
    // 配置 library 使其支持 qiankun 的微前端架构
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = 'umd';
    config.output.chunkLoadingGlobal = `webpackJsonp_${name}`;
    config.output.globalObject = 'window';

    return config;
  },

  devServer: (configFunction) => {
    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost);

      // 配置允许跨域
      config.headers = {
        'Access-Control-Allow-Origin': '*',
      };

      config.historyApiFallback = true;
      config.hot = false;
      config.liveReload = false;

      return config;
    };
  },
};
