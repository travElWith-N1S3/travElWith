const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 9080,
    client: {
      webSocketURL: "ws://35.162.83.137:8080/ws/chat",
    },
    proxy: {
      "/api1": {
        target: "http://" + process.env.VUE_APP_BACK_URL,
        changeOrigin: true,
      },
      "/v1": {
        target: "http://" + process.env.VUE_APP_BACK_URL,
        changeOrigin: true,
      },
    },
  },
});
