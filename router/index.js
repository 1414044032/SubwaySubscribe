// router/index.js

import modules from './modules'
import Vue from 'vue'
//这里仅示范npm安装方式的引入，其它方式引入请看最上面【安装】部分
import Router from 'uni-simple-router'
Vue.use(Router)
//初始化
const router = new Router({
    routes: [...modules]//路由表
});

export default router;
