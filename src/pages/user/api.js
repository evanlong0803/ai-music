import api from '@/api/config';

// 获取用户详情
export const getUserDetail = (uid, cookie) =>
	api.get('/user/detail', { params: { uid, cookie } });

// 获取用户歌单
export const getUserSong = (uid, cookie) =>
	api.get('/user/playlist', {
		params: {
			uid,
			cookie,
			timestamp: Date.now(),
		},
	});

// 签到
export const signIn = (cookie) =>
	api.post('/daily_signin', {
		type: 1,
		cookie,
	});

// ---------------------------------------

// 更新用户信息
export const updateUserDetail = (
	// 介绍
	signature,
	// 昵称
	nickname,
	// 性别
	gender,
	cookie
) =>
	api.post('/user/update', {
		// 介绍
		signature,
		// 昵称
		nickname,
		// 性别
		gender,
		cookie,
	});
