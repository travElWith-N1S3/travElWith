const { defineConfig } = require("@vue/cli-service");

const backUrl = process.env.VUE_APP_BACK_URL;

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 9080,
    client: {
      webSocketURL: "ws://35.162.83.137:8080/ws/chat",
      // WebSocketURL: "ws://back.service-connect:8080/ws/chat",
      // webSocketURL:
    },
    proxy: {
      "/api1": {
        target: backUrl,
        changeOrigin: true,
      },
      "/v1": {
        target: backUrl,
        changeOrigin: true,
      },
    },
  },
});
