<template>
    <view class="login-box">
        <view class="login-box-img">
            <image src="../static/sh.jpg" style="width: 100%;"></image>
        </view>
        <form @submit="formSubmit" @reset="formReset" >
            <view class="uni-form-item">
                <view class="uni-form-title">手机号：</view>
                <input class="uni-form-input" name="phone" v-model="phone" placeholder="手机号" />
            </view>
            <view class="uni-form-item code-item">
                <view class="uni-form-title">验证码：</view>
                <input class="uni-form-input" name="checkCode" v-model="checkCode" placeholder="验证码" />
                <button class="code-box" @click="sendCode" :disabled="codeTag <60">{{codeTag ===60?'获取验证码': '('+ codeTag + ')重新获取'}}</button>
            </view>
            <view class="uni-form-submit">
                <button type="primary" form-type="submit" :disabled="userAllInfo.new === userAllInfo.count">登录</button>
            </view>
        </form>
        <text class="tip-text">* 内测版本，登录后选择抢码区间即可</text>
        <view>
            <text class="tip-text">* 内测用户数：{{this.userAllInfo.new}}</text>
        </view>
        <view>
            <text class="tip-text">* 最大用户数：{{this.userAllInfo.count}}</text>
        </view>
        <view>
            <text class="tip-text">* 不保存隐私敏感信息，只保留抢码必要信息</text>
        </view>
        <view>
            <text class="tip-text">* 未在官网注册用户，请点击下方链接前往注册登录后再返回登录</text>
        </view>
        <view class="outlink-box">
            <uni-icons type="arrowdown" size="20"></uni-icons>
            <uni-icons type="arrowdown" size="20"></uni-icons>
            <uni-icons type="arrowdown" size="20"></uni-icons>
            <a href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI4NjAyNTA2Ng==&scene=124#wechat_redirect">北京地铁预约出行官方公众号</a>
        </view>
    </view>
</template>

<script>
    import {
        requestSendCode,
        requestLogin,
        requestcheckUserCount,
    } from '@/common/api/api'
    import uniIcons from "@/components/uni-icons/uni-icons.vue"
    export default {
        components: {uniIcons},
        data() {
            return {
                checkCode:'',
                phone:'',
                codeTag:60,
                timer:null,
                userAllInfo:{
                    new: 0,
                    count: 0
                }
            }
        },
        onShow(){
            this.checkUserCount()
        },
        methods: {
            checkUserCount(){
                requestcheckUserCount().then(res=>{
                    this.userAllInfo = res.info
                })
            },
            sendCode(){
                if (this.phone.length != 11) {
                    this.setHint('请输入正确的手机号')
                }else {
                    if(this.userAllInfo.new < this.userAllInfo.count){
                        this.timer = setInterval(() => {
                            if (this.codeTag > 0) {
                                this.codeTag--;
                            } else {
                                console.log('卸载定时器');
                                clearInterval(this.timer);
                                this.timer = null;
                                this.codeTag = 60
                            }
                        }, 1000)
                        requestSendCode({
                            phone:this.phone
                        }).then(res=>{
                            this.setHint('发送成功')
                        })
                    }else {
                        this.setHint('抱歉已达到最大内测数')
                    }
                }
            },
            formSubmit: function(e) {
                let formdata = e.detail.value
                if (formdata.phone.length != 11) {
                    this.setHint('请输入正确的手机号')

                }
                if (formdata.checkCode.length == 0) {
                    this.setHint('请输入手机验证码')
                }
                else{
                    if(this.userAllInfo.new< this.userAllInfo.count){
                        requestLogin(formdata).then(res => {
                                console.log(res)
                                if(res.info === 'login'){
                                    this.setHint('请先前往地铁预约官方公众号注册并绑定该手机号')
                                    //https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI4NjAyNTA2Ng==&scene=124#wechat_redirect
                                }else{
                                    this.setHint('登录成功')
                                    this.setTag({
                                        phone:formdata.phone,
                                        token:res.info
                                    })
                                    this.setInfo({
                                        phone:formdata.phone,
                                        token:res.info
                                    })
                                    setTimeout(()=>{
                                        this.$Router.push({ name: 'home'})
                                    },2000)
                                }
                            }
                        )
                    }
                    else {
                        this.setHint('抱歉已达到最大内测数')
                    }
                }

            },
            formReset: function(e) {
                console.log('清空数据')
            }
        },
        onHide(){
            if(this.timer){
                console.log('卸载定时器');
                clearInterval(this.timer);
                this.timer = null
            }
        },
    }
</script>

<style scoped lang="scss">
    .login-box{
        /*background-size: 100% 100%;*/
        /*background-image: url("~@/static/background.jpg");*/
        padding: 10rpx;
        .login-box-img{
            margin-bottom: 20rpx;
            box-shadow: 0 2rpx 12rpx 0 rgba(0,0,0,.1);
        }
    }
    .uni-form-item{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: #ffffff;
        margin-bottom: 20rpx;
        box-shadow: 0 2rpx 12rpx 0 rgba(0,0,0,.1);
        padding: 10rpx 0;
        .uni-form-title{
            font-size: $sh-font-form-title-size;
            margin-left: 20rpx;
            width: 20%;
        }
        .uni-form-input{
            width: 80%;
            padding: 20rpx;
        }
    }
    .code-item{
        position: relative;
        .code-box{
            position: absolute;
            background-color: rgba(0, 0, 0, 0.7);
            color: #ffffff;
            font-size: $sh-font-form-title-size-sm;
            right: 20rpx;
        }
    }
    .uni-form-submit{
        margin-top: 30rpx;
    }
    .outlink-box{
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>
