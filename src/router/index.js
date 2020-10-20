import Vue from 'vue';
import VueRouter from 'vue-router';

import Find from '../components/Find.vue';
import Rank from '../components/Rank.vue';
import SongList from '../components/SongList.vue';
import Vocalists from '../components/Vocalists.vue';
import Video from '../components/Video.vue';
import MV from '../components/MV.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/find' },
    { path: '/find', name: 'Find', component: Find },
    { path: '/rank', name: 'Rank', component: Rank },
    { path: '/songlist', name: 'SongList', component: SongList },
    { path: '/vocalists', name: 'Vocalists', component: Vocalists },
    { path: '/video', name: 'Video', component: Video },
    { path: '/mv', name: 'MV', component: MV }
];

const router = new VueRouter({
    routes
});


export default router;
