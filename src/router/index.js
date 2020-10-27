import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Find from '../components/Find.vue'
import Rank from '../components/Rank.vue'
import SongList from '../components/SongList.vue'
import Vocalists from '../components/Vocalists.vue'
import Video from '../components/Video.vue'
import MV from '../components/MV.vue'
import Detail from '../components/Detail.vue'

const routes = [
    { path: '/', name: 'Find', component: Find },
    { path: '/rank', name: 'Rank', component: Rank },
    { path: '/songlist', name: 'SongList', component: SongList },
    { path: '/vocalists', name: 'Vocalists', component: Vocalists },
    { path: '/video', name: 'Video', component: Video },
    { path: '/mv', name: 'MV', component: MV },
    { path: '/detail', name: 'Detail', component: Detail }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    next()
})

export default router
