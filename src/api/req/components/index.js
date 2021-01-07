import URLS from '../../urls'
import api from '../../config'

// 获取轮播图
export const getHotSearch = () => api.get(URLS.hotSearch)
