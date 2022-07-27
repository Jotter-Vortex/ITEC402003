const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://changjinboondang.iptime.org:5000',
            changeOrigin: true,
        })
    );
};