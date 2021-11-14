<script lang="ts" setup>
import { zhCN, dateZhCN } from 'naive-ui';
import Layout from '@/layouts/index.vue';
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-loading-bar-provider>
      <n-notification-provider>
        <Layout />
      </n-notification-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
