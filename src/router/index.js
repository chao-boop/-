import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            name: 'index',
            component: () =>
                import ('@/components/index.vue'),
            meta: {
                token: false,
                title: '首页'
            }
        },
        {
            path: '/facerigter',
            name: 'facerigter',
            component: () =>
                import ('@/components/facerigter.vue'),
            meta: {
                token: false,
                title: '刷脸建档'
            }
        },
        {
            path: '/adult',
            name: 'adult',
            component: () =>
                import ('@/components/adult.vue'),
            meta: {
                token: false,
                title: '成人建档'
            }
        },
        {
            path: '/children',
            name: 'children',
            component: () =>
                import ('@/components/children.vue'),
            meta: {
                token: false,
                title: '儿童建档'
            }
        },
        {
            path: '/guahao',
            name: 'guahao',
            component: () =>
                import ('@/components/guahao.vue'),
            meta: {
                // token:true,
                title1: '当日挂号',

            }
        },
        {
            path: '/jiaofei',
            name: 'jiaofei',
            component: () =>
                import ('@/components/jiaofei.vue'),
            meta: {
                // token: true,
                title: '自助缴费'
            }
        },
        {
            path: '/baogao',
            name: 'baogao',
            component: () =>
                import ('@/components/baogao.vue'),
            meta: {
                // token: true,
                title: '检验检查报告'
            }
        },
        {
            path: '/yaopin',
            name: 'yaopin',
            component: () =>
                import ('@/components/yaopin.vue'),
            meta: {
                token: false,
                title: '药品查询'
            }
        },
        {
            path: '/paySelect',
            name: 'paySelect',
            component: () =>
                import ('@/components/paySelect.vue'),
            meta: {
                token: true,
                title: '请选择现金支付方式'
            }
        },
        {
            path: '/payAliFace',
            name: 'payAliFace',
            component: () =>
                import ('@/components/payAliFace.vue'),
            meta: {
                token: true,
                title: '支付宝扫脸支付'
            }
        },
        {
            path: '/payWechat',
            name: 'payWechat',
            component: () =>
                import ('@/components/payWechat.vue'),
            meta: {
                token: true,
                title: '微信扫码支付'
            }
        },
        {
            path: '/payAliCode',
            name: 'payAliCode',
            component: () =>
                import ('@/components/payAliCode.vue'),
            meta: {
                token: true,
                title: '支付宝扫码支付'
            }
        }
    ]
})
router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.token)) {
        if (store.state.token != '') {
            next()
        } else {
            next({
                path: '/',
            })
        }
    } else {
        next()
    }
})
export default router