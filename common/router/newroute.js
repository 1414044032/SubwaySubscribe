import MinRouter from './NewMinRouter'
// 配置路由
const router = new MinRouter({
    routes: [
        {
            path: 'pages/index/index',
            // type必须是以下的值['navigateTo', 'switchTab', 'reLaunch', 'redirectTo']
            // 跳转方式(默认跳转方式)
            type: 'switchTab',
            name: 'Home'
        },
        {
            path: 'pages/Login',
            type: 'navigateTo',
            name: 'Login'
        },{
            path: 'pages/my/index',
            type: 'switchTab',
            name: 'My'
        },

    ]
})
export default router
