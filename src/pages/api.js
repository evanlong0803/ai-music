import api from '@/api/config';

// 获取登录状态
export const getLoginStatus = (cookie) =>
	api.get('/login/status', { params: { cookie } });

// 退出登录
export const logout = () => api.get('/logout');
