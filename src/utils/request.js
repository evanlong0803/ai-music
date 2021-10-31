import axios from 'axios';
import qs from 'qs';
import translate from './translate';

// 请求配置
const request = axios.create({
	timeout: 1000 * 3, // 请求超时
	baseURL: 'https://musicapi.123mtr.top', // 基础路径
	responseType: 'json', // 请求响应类型
	responseEncoding: 'utf8', // 编码格式
	// 只能用在 'PUT', 'POST' , 'PATCH' 请求方法
	transformRequest: [data => qs.stringify(data)],
});

request.interceptors.request.use(
	config => {
		window.$loadingBar.start();
		// config.headers['api_access_key'] = getToken();
		return config;
	},
	async error => {
		const convertedMsg = await translate(error.message);
		window.$notification.error({
			title: '请求失败',
			content: convertedMsg,
			duration: 3000,
			closable: false,
		});
		return;
	}
);

// axios结束拦截
request.interceptors.response.use(
	async response => {
		window.$loadingBar.finish();
		const msg = response.data.message;
		const status = response.data.code;
		const res = response.data;
		// 翻译错误信息
		const convertedMsg = await translate(msg);
		switch (status) {
			case status != 201:
				window.$notification.info({
					title: '出问题了',
					content: convertedMsg,
					duration: 3000,
					closable: false,
				});
				return res, convertedMsg;
			default:
				return res;
		}
	},
	async error => {
		window.$loadingBar.error();
		// 翻译错误信息
		const convertedMsg = await translate(error.message);
		window.$notification.error({
			title: '响应失败',
			content: convertedMsg,
			duration: 3000,
			closable: false,
		});
		return;
	}
);

export default request;
