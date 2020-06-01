<template>
    <view class="container">
        <div class="qrcode" ref="qrCodeUrl"></div>
    </view>
</template>

<script>
    import QRCode from 'qrcodejs2'
    import {
        requestGetCode
    } from '@/common/api/api'
    export default {
        data() {
            return {
                entryInfo:{

                }
            }
        },
        created(){
            this.initCode()
        },
        mounted() {
            this.creatQrCode();
        },
        methods:{
            initCode(){
                requestGetCode({phone:this.userInfo.phone}).then(res=>{
                    this.entryInfo = res.info
                    }
                )
            },
            creatQrCode() {
                var qrcode = new QRCode(this.$refs.qrCodeUrl, {
                    text: this.entryInfo.twoDimensionalCode,
                    width: 100,
                    height: 100,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.H
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        padding: 20px;
        font-size: 14px;
        line-height: 24px;
    }
</style>
