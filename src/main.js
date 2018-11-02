import vue from 'vue';
import vueRouter from 'vue-router';
import App from './index.vue'
import routes from './routers/router.js'
import FindLive2d from 'aaaafive'
import './index.css'
vue.use(vueRouter)
vue.use(FindLive2d)
vue.prototype.$find1 = function () {
    console.log(123)
}
vue.component('blog-post', {
    render: function (createElement) {
        var header = this.$slots.header
        var body = this.$slots.default
        var footer = this.$slots.footer
        console.log(header)
        return createElement('div', {
            attrs: {
                'class': 'checkbox-wrapper'
            },
            style: {
                color: 'red',
                fontSize: '14px'
            },
        }, [
            'hahah',
            header,
            createElement('main', body),
            createElement('footer', footer)
        ])
    }
})
const router = new vueRouter({ routes })


// class Find {
//     static install(Vue, options) {
//         Vue.mixin({
//             created: function () {
//                 // 逻辑...
//             }
//         })
//     }
// }
new vue({
    el: '#box',
    render: (h) => h(App),
    router,
    find: { a: 1 }
})