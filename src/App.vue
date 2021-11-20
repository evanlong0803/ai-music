<script lang="ts" setup>
import { zhCN, dateZhCN, darkTheme } from 'naive-ui';
import Layout from '@/layouts/index.vue';
import homeUseStore from '@/store/modules/home';
const homeStore = homeUseStore();
</script>

<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="homeStore.night ? darkTheme : undefined"
  >
    <n-loading-bar-provider>
      <n-notification-provider>
        <Layout />
      </n-notification-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
