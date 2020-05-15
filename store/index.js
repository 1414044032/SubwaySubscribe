import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo:uni.getStorageSync('glob_tag_001')
	},
	getters: { // 添加getters
		getUserInfo: (state) => {
			return state.userInfo
		}
	},
	mutations: {
		setInfo(state,userInfo){
			state.userInfo = userInfo;
		}

	},
	actions: {

	}
})

export default store
