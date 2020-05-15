import Vue from 'vue'
import App from './App'

import store from './store'
// 引入MinRouter文件
import MinRouter from './common/router/NewMinRouter'
// 引入router文件
import minRouter from './common/router/newroute'
import uniApi from "@/mixins/uni-api";
// 注册路由
Vue.use(MinRouter);

Vue.prototype.$store = store;
Vue.config.productionTip = false
Vue.mixin(uniApi)
App.mpType = 'app'

const app = new Vue({
    store,
    ...App,
    minRouter
})
app.$mount()
