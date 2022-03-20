const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/janus',{
      target: 'https://konermedia.xyz',
      changeOrigin: true,
    })
  );
};