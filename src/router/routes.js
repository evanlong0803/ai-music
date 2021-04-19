import Find from '@/pages/home/Find.vue';
import Rank from '@/pages/home/Rank.vue';
import SongSheet from '@/pages/home/SongSheet.vue';
import Singer from '@/pages/home/Singer.vue';
import MV from '@/pages/home/MV.vue';
import Search from '@/pages/home/Search.vue';
import Personal from '@/pages/user/Personal.vue';
import Grade from '@/pages/user/Grade.vue';
import Setting from '@/pages/user/Setting.vue';

const routes = [
	{ path: '/', name: 'Find', component: Find },
	{ path: '/rank', name: 'Rank', component: Rank },
	{ path: '/songsheet', name: 'SongSheet', component: SongSheet },
	{ path: '/singer', name: 'Singer', component: Singer },
	{ path: '/mv', name: 'MV', component: MV },
	{ path: '/personal', name: 'Personal', component: Personal },
	{ path: '/grade', name: 'Grade', component: Grade },
	{ path: '/setting', name: 'Setting', component: Setting },
	{ path: '/search', name: 'Search', component: Search },
	{
		path: '/songdetail',
		name: 'SongDetail',
		component: () => import('@/pages/detail/SongDetail.vue'),
	},
	{
		path: '/albumdetail',
		name: 'AlbumDetail',
		component: () => import('@/pages/detail/AlbumDetail.vue'),
	},
	{
		path: '/videodetail',
		name: 'VideoDetail',
		component: () => import('@/pages/detail/VideoDetail.vue'),
	},
	{
		path: '/singerdetail',
		name: 'SingerDetail',
		component: () => import('@/pages/detail/SingerDetail.vue'),
	},
];

export default routes;
