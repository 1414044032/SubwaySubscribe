<script>
    import {
        requestcheckLogin
    } from '@/common/api/api'
export default {
	onLaunch: function() {
		console.log('App Launch');
		let tag = this.getTag()
        if (tag){
            requestcheckLogin({phone:tag.phone}).then(res=>{
                this.$openPage('Home')
            }).catch(error=>{
                this.$openPage('Login')
            })
        }else {
            this.setHint('用户未登录')
            this.$openPage('Login')
        }
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
*{
    margin: 0;
    padding: 0;
}
#app, .wrapper, body, html{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
page {
    height: auto;
    min-height: 100%;
    width: 100%;
    background-color: #f6f6f6;
}
/* #endif */
</style>
