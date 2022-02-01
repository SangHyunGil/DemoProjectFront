const createProxyMiddleware = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    "/ws-stomp",
    createProxyMiddleware({ target: "ws://koner.kr:8080", ws: true })
  );
};