import api from '@/api/config';

// 获取热搜
export const getHotSearch = () => api.get('/search/hot');

// --------------------------------

// 验证手机号
export const verifyPhone = (phone) =>
	api.get('/cellphone/existence/check', { params: { phone } });

// 发送验证码
export const getCaptcha = (phone) =>
	api.get('/captcha/sent', { params: { phone } });

// 手机登录
export const phoneLogin = (phoneForm) =>
	api.get('/login/cellphone', { params: phoneForm });

// 邮箱登录
export const emailLogin = (email, password) =>
	api.get('/login', { params: { email, password } });

// 验证验证码
export const verifyCaptcha = (phone, captcha) =>
	api.get('/captcha/verify', { params: { phone, captcha } });

// 注册
export const register = (registerForm) =>
	api.get('/register/cellphone', {
		params: registerForm,
	});
