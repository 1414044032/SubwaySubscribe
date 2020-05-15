<template>
    <view class="container">
        <view class="user-box">
            <uni-icons type="contact" size="100" class="user-img"></uni-icons>
            <view class="card-info">
                <view>
                    体验卡有效期：
                </view>
                <view class="info-detail">
                    2099-05-12 12:12:12  前有效
                </view>
            </view>
        </view>
        <view class="user-handle">
            <button class="danger-buttton logOut" @click="logout">退出登录</button>
        </view>
    </view>
</template>

<script>
    import uniIcons from "@/components/uni-icons/uni-icons.vue"
    export default {
        data() {
            return {

            }
        },
        components: {uniIcons},
        methods: {
            logout(){
                this.removeTag()
                this.setInfo(null)
                this.setHint('清除用户信息成功')
                setTimeout(()=>{
                    this.$openPage('Login')
                },2000)
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        padding: 20px;
        font-size: 14px;
        line-height: 24px;
        .user-box{
            margin-top: 40rpx;
            text-align: center;
            height: 50vh;
            .user-img{
                    color: $sh-color-base!important;
            }
            .card-info{
                margin-top: 20rpx;
                    color: $sh-font-color-base;
                    font-size: $sh-font-form-title-size;
                .info-detail{
                    font-size: $sh-font-form-title-size-sm;
                }
            }
        }
        .user-handle{
            height: 30vh;
            position: relative;
            .logOut{
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
            }
        }
    }
</style>
