import axios, { AxiosRequestConfig } from 'axios';
import { stringifyQuery } from 'vue-router';

// 请求配置
const request = axios.create({
  timeout: 1000 * 5, // 请求超时
  baseURL: 'https://netease-cloud-music-api-sage-ten.vercel.app', // 基础路径
  responseType: 'json', // 请求响应类型
  // 只能用在 'PUT', 'POST' , 'PATCH' 请求方法
  transformRequest: [data => stringifyQuery(data)],
  withCredentials: true, // 是否允许带cookie这些
} as AxiosRequestConfig);

request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // config.headers['xxx'] = getToken();
    return config;
  },
  async error => {
    // Notification.error({
    //   title: '网络错误',
    //   content: convertedMsg,
    //   duration: 3000,
    //   closable: false,
    // });
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
    //  Notification.error({
    //   title: '错误消息',
    //   content: error.message,
    //   duration: 3000,
    //   closable: false,
    // });
  },
);

export default request;
