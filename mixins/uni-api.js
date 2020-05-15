import {mapGetters,mapMutations} from 'vuex'
const uniApi = {
    data(){
        return{
            clientType:{
                H5: "7e80a759-5bf3-4504-bfab-71572b025005",
                WeChat: "6653a94b-1650-4c3d-a287-f56e8ae8e943",
                YTX: "5a53bb8e-67fb-4e9a-8510-71a4f8a2210c",
                Others: ""
            }
        }
    },
    computed: {
        ...mapGetters({
            // 别名转换
            userInfo:'getUserInfo'
        })
    },
    methods:{
        ...mapMutations([
            'setInfo'// 将 `this.increment()` 映射为 `this.$store.commit('increment')`
        ]),
        setHint(title){
            uni.showToast({
                title: title,
                icon: 'none'
            })
        },
        getTag(){
            return uni.getStorageSync('glob_tag_001')
        },
        setTag(info){
            uni.setStorageSync('glob_tag_001', info);
        },
        removeTag(){
            uni.removeStorageSync('glob_tag_001');
        }
    }
}

export default uniApi
