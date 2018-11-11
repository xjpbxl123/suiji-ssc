import vue from 'vue';
import vueRouter from 'vue-router';
import App from './index.vue'
import routes from './routers/router.js'
import './index.css'
import 'normalize.css'
vue.use(vueRouter)


const router = new vueRouter({ routes })


new vue({
    el: '#box',
    render: (h) => h(App),
    router
})