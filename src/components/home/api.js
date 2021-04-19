import api from '@/api/config';

// 获取轮播图
export const getBanner = () => api.get('/banner');

// 获取热搜
export const getHotSearch = () => api.get('/search/hot');
