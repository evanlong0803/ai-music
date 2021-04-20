// api统一导出

// pages
import * as pageApi from '@/pages/api';
import * as pageDetailApi from '@/pages/detail/api';
import * as pageHomeApi from '@/pages/home/api';
import * as pageUserApi from '@/pages/user/api';

// components
import * as componentHomeApi from '@/components/home/api';
export default {
	...pageApi,
	...pageDetailApi,
	...pageHomeApi,
	...pageUserApi,
	...componentHomeApi,
};
