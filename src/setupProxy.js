const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://desktop:5001/',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug',
    })
  );
};
