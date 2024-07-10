const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 9080,
    proxy: {
      '/api1': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    }
  }
})

