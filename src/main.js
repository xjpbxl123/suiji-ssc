import vue from 'vue';
import vueRouter from 'vue-router';
import App from './index.vue'
import routes from './routers/router.js'
import './index.css'
import 'normalize.css'
import Socket from './scripts/socket/index'
import VueResource from 'vue-resource'

vue.use(VueResource)
vue.use(vueRouter)
let socket = new Socket("ws://192.168.0.101:3201")
vue.prototype.$socket = socket

socket.createSocket()

const router = new vueRouter({ routes })


new vue({
  el: '#box',
  render: (h) => h(App),
  router
})