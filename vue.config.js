'use strict'
const path = require('path')
const keyBy = require('lodash/keyBy')
const argv = require('yargs').argv
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const moment = require('moment')
const assign = require('lodash/assign')

function resolve(dir) {
  return path.join(__dirname, dir)
}

function getGlobalDefine() {
  const gitRevisionPlugin = new GitRevisionPlugin()
  const globalConfig = { PATHNAME: appPath }
  const config = {
    VERSION: JSON.stringify(require('./package.json').version),
    COMMIT_HASH: JSON.stringify(`${moment().format('YYYYMMDD')}(${gitRevisionPlugin.commithash().slice(0, 8)})`)
  }
  Object.keys(globalConfig).forEach(k => { config[k] = `"${globalConfig[k]}"` })
  return config
}


const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const isDevelopment = process.env.NODE_ENV === 'development'

const backEndServer = 'http://cim.rd.mt'
const appPath = argv.path || '/adm_api/'
const proxyTable = keyBy(['s', 'f'].map(sub => {
  return {
    key: appPath + sub,
    target: backEndServer,
    changeOrigin: true
  }
}), 'key')

module.exports = {
  lintOnSave: true,
  runtimeCompiler: true,
  productionSourceMap: false,
  css: {
    sourceMap: isDevelopment
  },
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join('/public/', 'index.html') },
      ],
    },
    host: HOST || 'local.rd.mt',
    hot: true,
    port: PORT || 3000,
    open: false,
    proxy: proxyTable,
  },
  configureWebpack: {
    devtool: isDevelopment ? 'cheap-module-eval-source-map' : false,
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp|ico)(\?.*)?$/)

    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => assign(options, { limit: 10000 }))

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        assign(options, {
          cssSourceMap: isDevelopment ? true : false,
          cacheBusting: true,
        })
        return options
      })

    config
      .plugin('define')
      .tap(options => {
        const config = getGlobalDefine()
        options[0] = assign(options[0], config)
        return options
      })
  }
}