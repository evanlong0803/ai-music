import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
Vue.use(VueRouter);

const router = new VueRouter({
	routes,
});

router.beforeEach((to, from, next) => {
	const cookie = localStorage.getItem('cookie');
	if (!cookie) {
		if (
			to.path === '/personal' ||
			to.path === '/grade' ||
			to.path === '/setting'
		) {
			return next('/');
		}
	}
	next();
});

export default router;
