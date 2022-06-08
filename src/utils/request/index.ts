import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import translate from '@/utils/translate';
import { delay } from '@/utils';

// 请求配置
export const http = axios.create({
  timeout: 1000 * 5, // 请求超时
  baseURL: (import.meta.env.MODE === 'production' ? 'https://fanyi-api.baidu.com' : null) as string, // 基础路径
  transformRequest: [data => qs.stringify(data)],
});

const source = axios.CancelToken.source();

// 请求配置
const request = axios.create({
  timeout: 1000 * 5, // 请求超时
  baseURL: 'https://musicapi.123mtr.top', // 基础路径
  responseType: 'json', // 请求响应类型
  // 只能用在 'PUT', 'POST' , 'PATCH' 请求方法
  transformRequest: [data => qs.stringify(data)],
  withCredentials: true, // 是否允许带cookie这些
} as AxiosRequestConfig);

request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // config.headers['api_access_key'] = getToken();
    return config;
  },
  async error => {
    // const convertedMsg = await translate(error.message);
    // Notification.error({
    //   title: '网络错误',
    //   content: convertedMsg,
    //   duration: 3000,
    //   closable: false,
    // });
    // await delay(2000);
  },
);

// axios结束拦截
request.interceptors.response.use(
  response => {
    const { code } = response.data;
    if (code !== 200) {
      // Notification.error({
      //   title: '提示消息',
      //   content: response.data.message,
      //   duration: 3000,
      //   closable: false,
      // });
    }
    return response;
  },
  async error => {
    // return Notification.error({
    //   title: '错误消息',
    //   content: error.message,
    //   duration: 3000,
    //   closable: false,
    // });
    // const convertedMsg = await translate(error.message);
    // Notification.error({
    //   title: '网络错误',
    //   content: convertedMsg,
    //   duration: 3000,
    //   closable: false,
    // });
    // await delay(2000);
  },
);

export default request;
