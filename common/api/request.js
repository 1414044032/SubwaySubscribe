const config = Symbol('config');
const isCompleteURL = Symbol('isCompleteURL');
class BaseRequest {
	[config] = {
		baseURL: '',
		header: {
			// 'content-type': 'application/x-www-form-urlencoded'
			'content-type': 'application/json;charset=UTF-8'
		},
		url: "",
		data: {},
		method: 'GET',
		dataType: 'json',
		responseType: 'text',
	};
	static[isCompleteURL](url) {
		return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
	}
	setConfig(func) {
		this[config] = func(this[config])
	};
	request(options) {
		let requestOptions = {
			header: this[config].header,
			url: this[config].baseURL + options.url,
			data: options.data,
			method: options.method || this[config].method,
			dataType: options.dataType || this[config].dataType,
			responseType: options.dataType || this[config].dataType,
		};

		uni.showLoading({
			title:'加载中'
		})
		// console.log(this[config].baseURL + options.url);
		// console.log(options.data);
		return new Promise((resolve, reject) => {
			requestOptions.success = (res) => {
				uni.hideLoading()
				if (res.statusCode === 200) {
					// 解密 代码
					// console.log("test")
					// console.log(decrypt("pULUTCzWhRSQwDEPFh5kWRsERybP2ckYVvbwRLtqPpTcqck+YiMBFqgvLFh3fo6iFiekBiiWHsgS7q9ChWZid7Tf5RkohFoUNBfaitp040KdUrfmWv3Ix/hgsPD43b/JDpfECw8vuoaeofeSf8uF4nbzcft1P8XT3C0CgspiuWT+ta/fBvtX7ZHTpGPVH1+0"));
					if (res.data.status === 1) {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						})
						reject(res.data)
					} else if(res.data.status === 0) {
						console.log(res.data)
						resolve(res.data)
					} else {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						})
					}
				} else {
					reject(res)
				}
			};
			requestOptions.fail = (res) => {
				uni.hideLoading()
				console.log("响应失败回调位置" + res);
				// 配置统一的错误请求处理
				// 抛给下一层
				reject(res)
			};
			uni.request({ ...requestOptions
			})
		})
	};

	get(url, data, options = {}) {
		// console.log(url);
		options.url = url;
		options.data = data;
		options.method = 'GET';
		return this.request(options)
	};
	post(url, data, options = {}) {
		options.url = url;
		options.data = data;
		options.method = 'POST';
		return this.request(options)
	}

}

export default function getInstance(category) {
	let minRequest = new BaseRequest();

	// 设置默认配置
	minRequest.setConfig((config) => {
		// config.baseURL = 'http://localhost:5000/' + category
		config.baseURL = 'http://119.254.155.123:5001/' + category
		return config
	});
	return minRequest
}
