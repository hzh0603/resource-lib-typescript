module.exports = {
    css: {
        loaderOptions: { // 向 CSS 相关的 loader 传递选项
            less: {
                modifyVars: {
                    'primary-color': '#50b0e2',
                  },
                javascriptEnabled: true
            }
        }
    },
    productionSourceMap: false,
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        https: false,
        // 以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: {// 配置跨域
            '/resourcelib': {
                // target: 'http://192.168.11.115:80/resourcelib', // 这里后台的地址模拟的;应该填写你们真实的后台接口
                // target: 'http://192.168.11.50:8082/resourcelib', // 这里后台的地址模拟的;应该填写你们真实的后台接口
                // target: 'http://192.168.11.40:8082/resourcelib', // 这里后台的地址模拟的;应该填写你们真实的后台接口
                target: 'http://47.111.118.36:88/resourcelib', // 这里后台的地址模拟的;应该填写你们真实的后台接口
                ws: true,
                changOrigin: true, // 允许跨域
                pathRewrite: {
                    '^/resourcelib': '' // 请求的时候使用这个api就可以
                }
            },
            '/rslstatic': {
                target: 'http://47.111.118.36:88/rslstatic', // 这里后台的地址模拟的;应该填写你们真实的后台接口
                ws: true,
                changOrigin: true, // 允许跨域
                pathRewrite: {
                    '^/rslstatic': '' // 请求的时候使用这个api就可以
                }
            }
        }
    }
}
