<script lang="ts" setup>
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
import Layout from '@/layouts/index.vue';
import homeUseStore from '@/store/modules/home';
import { ref, watch } from 'vue-demi';
const homeStore = homeUseStore();
const color = ref<string>('');
const backdrop = ref<string>('');
// 临时监听，待优化
watch(
  () => homeStore.night,
  val => {
    if (val) {
      color.value = '#ffffff';
      backdrop.value = '#232324';
    } else {
      color.value = '#000';
      backdrop.value = '#fff';
    }
  },
);
</script>

<template>
  <a-config-provider :locale="zhCN">
    <Layout class="dark" />
  </a-config-provider>
</template>

<style lang="less" scoped>
@import '@arco-design/web-vue/es/style/theme/global.less';
.dark {
  background: v-bind(backdrop);
  color: v-bind(color);
}
</style>
