import axios from 'axios';
import qs from 'qs';
import md5 from 'md5';

// 请求配置
const http = axios.create({
  timeout: 1000 * 3, // 请求超时
  baseURL: (import.meta.env.MODE === 'production' ? 'https://fanyi-api.baidu.com' : null) as string, // 基础路径
  transformRequest: [data => qs.stringify(data)],
});

const path = '/api/trans/vip/translate';
const from = 'en';
const to = 'zh';
const appid = '20200731000530374';
const translate = async (q: string) => {
  const salt = Date.now();
  let sign = md5(appid + q + salt + 'm0sg8AlMb3JxAEJ5uCZY');
  const { data } = await http.post(path, { q, from, to, appid, salt, sign });
  switch (data.error_code) {
    case '52001':
      return '翻译错误：请求超时';
    case '52002':
      return '翻译错误：系统错误';
    case '52003':
      return '翻译错误：未授权用户';
    case '54000':
      return '翻译错误：必填参数为空';
    case '54001':
      return '翻译错误：签名错误';
    case '54003':
      return '翻译错误：访问频率受限';
    case '54004':
      return '翻译错误：账户余额不足';
    case '54005':
      return '翻译错误：长query请求频繁';
    case '58000':
      return '翻译错误：客户端IP非法';
    case '58001':
      return '翻译错误：译文语言方向不支持';
    case '58002':
      return '翻译错误：服务当前已关闭';
    case '90107':
      return '翻译错误：认证未通过或未生效';
  }
  return data.trans_result[0].dst;
};
export default translate;
