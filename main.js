import Vue from 'vue'
import App from './App'

import store from './store'
// 引入MinRouter文件
// import MinRouter from './common/router/NewMinRouter'
// 引入router文件
// import minRouter from './common/router/newroute'
import uniApi from "@/mixins/uni-api";
// 注册路由
// Vue.use(MinRouter);
import router from './router'
import { RouterMount } from 'uni-simple-router'
import {requestcheckLogin} from "@/common/api/common";


Vue.prototype.$store = store;
Vue.config.productionTip = false
Vue.mixin(uniApi)
App.mpType = 'app'


//全局路由前置守卫
router.beforeEach((to, from, next) => {
    // 路由拦截 针对登录页以及扫码页 不拦截
    console.log(to)
    if(to.name === 'login' || to.name === 'code'){
        next()
    }else {
        let tag = uni.getStorageSync('glob_tag_001')
        if (tag){
            requestcheckLogin({phone:tag.phone}).then(res=>{
                next()
            }).catch(error=>{
                router.push({ name: 'login'})
            })
        }else {
            uni.showToast({
                title: '用户未登录',
                icon: 'none'
            })
            router.push({ name: 'login'})
        }
    }
})
// 全局路由后置守卫
router.afterEach((to, from) => {
})

const app = new Vue({
    store,
    ...App,
    // minRouter
})
// app.$mount()

RouterMount(app,'#app');
