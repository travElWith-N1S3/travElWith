const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 9080,
    proxy: {
      '/api1': {
        target: 'http://192.168.5.83:9090',
        changeOrigin: true,
      },
    }
  }
})
