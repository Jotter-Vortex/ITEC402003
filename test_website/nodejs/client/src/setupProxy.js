const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://117.55.186.7:5000',
            changeOrigin: true,
        })
    );
};