// api统一导出

// pages
import * as pageDetailApi from '@/pages/detail/api';
import * as pageHomeApi from '@/pages/home/api';
import * as pageUserApi from '@/pages/user/api';

// components
import * as componentDetailApi from '@/components/detail/api';
import * as componentHomeApi from '@/components/home/api';
export default {
	...pageDetailApi,
	...pageHomeApi,
	...pageUserApi,
	...componentDetailApi,
	...componentHomeApi,
};
