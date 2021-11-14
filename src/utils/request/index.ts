import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
// import { CustomResponse } from './model';
import qs from 'qs';
import translate from '@/utils/translate';

// 定义接口
// interface PendingType {
//   url?: string;
//   method?: Method;
//   params: any;
//   data: any;
//   cancel: Function;
// }

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
    window.$notification.error({
      title: '请求失败',
      content: convertedMsg,
      duration: 3000,
      closable: false,
    });
    return;
  },
);

// axios结束拦截
request.interceptors.response.use(
  async response => {
    window.$loadingBar.finish();
    const {
      data,
      data: { message },
      status: code,
    } = response as AxiosResponse;
    // 翻译错误信息
    const convertedMsg = await translate(message);
    if (code !== 200) {
      window.$notification.info({
        title: '出问题了',
        content: convertedMsg,
        duration: 3000,
        closable: false,
      });
    }
    return data;
  },
  // async error => {
  //   window.$loadingBar.error();
  //   // 翻译错误信息
  //   const convertedMsg = await translate(error.message);
  //   return window.$notification.error({
  //     title: '响应失败',
  //     content: convertedMsg,
  //     duration: 3000,
  //     closable: false,
  //   });
  // },
);

export default request;
