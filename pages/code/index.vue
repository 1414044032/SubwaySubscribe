<template>
    <view class="container">
        <div>
            <div class="qrcode" ref="qrCodeUrl"></div>
        </div>
        <!--        appointmentTime:"2020-06-01 08:18"
        arrivalTime:"2020-06-02 08:00~08:10"
        id:"0004b320"
        invalidSeconds:55316
        invalidTime:"15小时21分钟56秒"
        lineName:"昌平线"
        stationEntrance:"A2口"
        stationName:"沙河站"
        twoDimensionalCode:"o2F5cryn_KblLtGbevmcVpRUXdS6o0JMads3wwAHeAU"
        type:1
        -->
        <view class="setting-box">
            <view class="setting-item">
                <view>预约站点：</view>
                <view>
                    {{entryInfo.stationName + entryInfo.stationEntrance}}
                </view>
            </view><view class="setting-item">
                <view>预约时间段：</view>
                <view>
                    {{entryInfo.arrivalTime}}
                </view>
            </view>
            <view class="setting-item">
                <view>剩余有效期：</view>
                <view>
                    {{entryInfo.invalidTime}}
                </view>
            </view>
        </view>
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
                entryInfo: {}
            }
        },
        mounted() {
            // this.creatQrCode();
            this.initCode()
        },
        methods: {
            initCode() {
                if(this.userInfo){
                    requestGetCode({phone: this.userInfo.phone}).then(res => {
                            this.entryInfo = res.info
                            this.creatQrCode()
                        }
                    )
                }else if (this.$Route.query.phone){
                    requestGetCode({phone: this.$Route.query.phone}).then(res => {
                            this.entryInfo = res.info
                            this.creatQrCode()
                        }
                    )
                }

            },
            creatQrCode() {
                var qrcode = new QRCode(this.$refs.qrCodeUrl, {
                    text: this.entryInfo.twoDimensionalCode,
                    width: 220,
                    height: 220,
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

        .qrcode {
            display: flex;
            flex-direction: row;
            justify-content: center;
        }

        .setting-box {
            padding: 10 rpx;
            margin-top: 20rpx;
            .setting-item {
                color: $sh-font-color-base1;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                font-size: $sh-font-form-title-size;
                margin: 20 rpx 0;

                .picker-setting {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }

                .status-succcess {
                    color: $sh-color-success;
                }

                .status-error {
                    color: $sh-color-danger;
                }
            }
        }
    }
</style>
