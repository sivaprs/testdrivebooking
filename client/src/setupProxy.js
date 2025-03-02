const { createProxyMiddleware } = require("http-proxy-middleware");

const TARGET = "http://localhost:9000";

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: TARGET,
      changeOrigin: false,
      secure: false,
      logLevel: "debug",
    })
  );
};
