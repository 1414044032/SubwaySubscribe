<template>
	<view class="container">
		<view class="current-setting">
			<view class="setting-title">当前设置：</view>
			<text class="tip-text">* 进站码状态将在每日开放抢码的12点以及20点更新状态</text>
			<view class="setting-box">
				<view class="setting-item">
					<picker @change="bindPickerChangeStation" :value="indexStation" :range="arrayStation" style="width: 100%">
						<view class="picker-setting">
							<view>进站站点</view>
							<view class="uni-input">{{currentStation?currentStation:'暂无'}}</view>
						</view>
					</picker>
				</view>
				<view class="setting-item">
<!--					<view>8:00-8:10</view>-->
					<picker @change="bindPickerChange" :value="index" :range="array" style="width: 100%">
						<view class="picker-setting">
							<view>进站区间：(点击选择乘车区间)</view>
							<view class="uni-input">{{currentTimeSolt?currentTimeSoltShow:'暂无'}}</view>
						</view>
					</picker>
				</view>
				<view class="setting-item">
					<view>抢码状态：</view>
					<view :class="[currentTimeSolt?'status-succcess':'status-error']">
						{{currentTimeSolt?'正常':'暂无'}}
					</view>
				</view>
				<view class="setting-item">
					<view>进站码状态：</view>
					<view :class="[passCode?'status-succcess':'status-error']">
						{{passCode?'已获取':'暂无'}}</view>
				</view>
				<view class="setting-item" v-if="passCode">
					<view>进站码绑定手机号：</view>
					<view :class="[passCode?'status-succcess':'status-error']">
						{{codeData[0]}}</view>
				</view>
				<view class="setting-item" v-if="passCode">
					<view>进站码进入日期：</view>
					<view :class="[passCode?'status-succcess':'status-error']">
						{{codeData[5]+'-'+formatCodeData(codeData[9])}}</view>
				</view>

			</view>
		</view>
		<view class="setting-title">修改设置：</view>
		<view class="setting-handle">
<!--			<button class="success-button" @click="getSetting">刷新设置</button>-->
			<text class="tip-text" v-show="showTag">* 重新选择区间后需要点击修改按钮更新设置</text>
			<button class="primary-button" @click="updateSetting">修改/添加</button>
<!--			<button class="danger-buttton" @click="deleteSetting">删除</button>-->
			<uni-popup ref="popup" type="bottom">
				<view>

				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import {
		requestSetting,
		requestsetSetting,
		requestdelSetting,
		requestcheckPassCode
		} from '@/common/api/api'
	export default {
		data() {
			return {
				array: [
						'07:00-07:10',
						'07:10-07:20',
						'07:20-07:30',
						'07:30-07:40',
						'07:40-07:50',
						'07:50-08:00',
						'08:00-08:10',
						'08:10-08:20',
						'08:20-08:30',
						'08:30-08:40',
						'08:40-08:50',
						'08:50-09:00'
				],
				arrayStation:[
						'沙河站',
						'天通苑站',
						'草房站'
				],
				index: 0,
				showTag:false,
				indexStation:0,
				currentTimeSolt: null,
				currentStation: null,
				currentTimeSoltShow: null,
				passCode:null,
				codeData:[]
			}
		},
		onShow(){
			this.getSetting()
			this.checkPassCode()
		},
		methods: {
			checkPassCode(){
				requestcheckPassCode({phone:this.userInfo.phone}).then(res=>{
					this.passCode = res.info
					this.codeData =this.passCode.split('@')
				})
			},
			formatCodeData(item){
				return 	item.slice(0,2)+':'+item.slice(2,7)+':'+item.slice(7,9)
			},
			getSetting(){
				requestSetting({phone:this.userInfo.phone}).then(res=>{
					// 分配站点以及时间
					[this.currentStation, this.currentTimeSolt] = res.info.split('@@@')
					this.currentTimeSoltShow = this.formatCodeData(this.currentTimeSolt)
				})
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				this.currentTimeSoltShow = (this.array[this.index])
				this.currentTimeSolt = (this.array[this.index]).replace(/:/g,'')
				this.showTag = true
			},
			bindPickerChangeStation: function(e) {
				this.index = e.target.value
				this.currentStation = (this.arrayStation[this.index])
				this.currentStation = (this.arrayStation[this.index])
				this.showTag = true
			},
			updateSetting(){
				requestsetSetting({
					phone:this.userInfo.phone,
					timeSolt:this.currentTimeSolt?this.currentTimeSolt:'0800-0810',
					station:this.currentStation?this.currentStation:'沙河站'}).then(res=>{
					this.setHint('设置成功')
					setTimeout(()=>{
						this.getSetting()
					},1000)
				})
			},
			pauseSetting(){
				this.setHint('暂停')
			},
			deleteSetting(){
				requestdelSetting({phone:this.userInfo.phone}).then(res=>{
					this.setHint(res.info)
					this.getSetting()
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
	.setting-title{
		font-size: $sh-font-form-title-size;
		color: $sh-font-color-base;
		border-bottom: 2rpx solid $sh-border-color-base;
		padding: 20rpx 0;
		font-weight: 600;
	}
	.setting-box{
		padding: 10rpx;
		.setting-item{
			color: $sh-font-color-base1;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			font-size: $sh-font-form-title-size;
			margin: 20rpx 0;
			.picker-setting{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
			}
			.status-succcess{
				color: $sh-color-success;
			}
			.status-error{
				color: $sh-color-danger;
			}
		}
	}
	.setting-handle{
		uni-button{
			margin: 20rpx 0;
		}
	}
</style>
