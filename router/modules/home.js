const home = [
    {
        //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
        path: '/pages/index/index',
        aliasPath:'/',  //对于h5端你必须在首页加上aliasPath并设置为/
        name: 'home',
        meta: {
            title: '设置',
        }
    },
    {
        path: '/pages/Login',
        name: 'login',
        meta: {
            title: '登录',
        }
    },
    // {
    //     path: '/pages/code/index',
    //     name: 'code',
    //     meta: {
    //         title: '进站码',
    //     }
    // },
    {
        path: '/pages/code/index',
        name: 'code',
        component: () => import('@/pages/code/index.vue')
    },
    {
        path: '/pages/my/index',
        name: 'my',
        meta: {
            title: '我的',
        }
    }
]
export default home
