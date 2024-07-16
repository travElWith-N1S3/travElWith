const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 9080,
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
