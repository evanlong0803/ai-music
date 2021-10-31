<script setup>
import { zhCN, dateZhCN } from 'naive-ui';
import LayoutHeader from '@/layouts/layoutHeader/index.vue';
import LayoutMain from '@/layouts/LayoutMain/index.vue';
import LayoutFooter from '@/layouts/layoutFooter/index.vue';
</script>

<template>
	<n-config-provider :locale="zhCN" :date-locale="dateZhCN">
		<n-loading-bar-provider>
			<n-notification-provider>
				<n-layout style="height: 100vh">
					<LayoutHeader />
					<LayoutMain />
					<LayoutFooter />
				</n-layout>
			</n-notification-provider>
		</n-loading-bar-provider>
	</n-config-provider>
</template>
