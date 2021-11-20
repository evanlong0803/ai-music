import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
// import { CustomResponse } from './model';
import qs from 'qs';
import translate from '@/utils/translate';

// 请求配置
const request = axios.create({
  timeout: 1000 * 3, // 请求超时
  baseURL: 'https://musicapi.123mtr.top', // 基础路径
  responseType: 'json', // 请求响应类型
  // 只能用在 'PUT', 'POST' , 'PATCH' 请求方法
  transformRequest: [data => qs.stringify(data)],
} as AxiosRequestConfig);

request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    window.$loadingBar.start();
    // config.headers['api_access_key'] = getToken();
    return config;
  },
  async error => {
    const convertedMsg = await translate(error.message);
    return window.$notification.error({
      title: '请求失败',
      content: convertedMsg,
      duration: 3000,
      closable: false,
    });
  },
);

// axios结束拦截
request.interceptors.response.use(
  response => {
    window.$loadingBar.finish();
    return response;
  },
  async error => {
    window.$loadingBar.error();
    // 翻译错误信息
    const convertedMsg = await translate(error.message);
    return window.$notification.error({
      title: '响应失败',
      content: convertedMsg,
      duration: 3000,
      closable: false,
    });
  },
);

export default request;
