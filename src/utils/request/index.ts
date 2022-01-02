import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import translate from '@/utils/translate';
import { Notification } from '@arco-design/web-vue';
import { delay } from '@/utils';

// 请求配置
export const http = axios.create({
  timeout: 1000 * 5, // 请求超时
  baseURL: (import.meta.env.MODE === 'production' ? 'https://fanyi-api.baidu.com' : null) as string, // 基础路径
  transformRequest: [data => qs.stringify(data)],
});

// 请求配置
const request = axios.create({
  timeout: 1000 * 5, // 请求超时
  baseURL: 'https://musicapi.123mtr.top', // 基础路径
  responseType: 'json', // 请求响应类型
  // 只能用在 'PUT', 'POST' , 'PATCH' 请求方法
  transformRequest: [data => qs.stringify(data)],
} as AxiosRequestConfig);

request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // config.headers['api_access_key'] = getToken();
    return config;
  },
  async error => {
    await delay(1000);
    const convertedMsg = await translate(error.message);
    return Notification.error({
      title: '网络错误',
      content: convertedMsg,
      duration: 3000,
      closable: false,
    });
  },
);

// axios结束拦截
request.interceptors.response.use(
  response => {
    // console.log(response);
    // Notification.error({
    //   title: '网络错误',
    //   content: convertedMsg,
    //   duration: 3000,
    //   closable: false,
    // });
    return response;
  },
  async error => {
    await delay(1000);
    const convertedMsg = await translate(error.message);
    return Notification.error({
      title: '网络错误',
      content: convertedMsg,
      duration: 3000,
      closable: false,
    });
  },
);

export default request;
