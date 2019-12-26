import Vue from 'vue'
import App from './App'
import xhr from '@/network'
import './static/styles/base.scss'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$xhr = xhr

const app = new Vue({
  ...App
})
app.$mount()
