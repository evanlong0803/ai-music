import URLS from "./urls.js";
import api from "./config.js";

// 获取轮播图
const getBanner = () => api.get(URLS.banner)

let method = {
    getBanner
}
export default {
    ...method
}