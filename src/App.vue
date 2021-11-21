<script lang="ts" setup>
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
import Layout from '@/layouts/index.vue';
</script>

<template>
  <a-config-provider :locale="zhCN">
    <Layout />
  </a-config-provider>
</template>
