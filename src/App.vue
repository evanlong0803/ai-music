<script lang="ts" setup>
import LayoutHeader from '@/layouts/layout-header/index.vue';
import LayoutFooter from '@/layouts/layout-footer/index.vue';

// 统一加载 other 数据
import { searchUseStore } from '@/store';
const searchStore = searchUseStore();
searchStore.getDefaultKeyWord();
</script>

<template>
  <main class="default-bg">
    <LayoutHeader />

    <router-view v-slot="{ Component }" class="m-auto py-10 w-[80%]">
      <template v-if="Component">
        <transition mode="in-out">
          <keep-alive>
            <Suspense>
              <!-- 主要内容 -->
              <component :is="Component"></component>
              <!-- 加载中状态 -->
              <template #fallback>
                <v-loading />
              </template>
            </Suspense>
          </keep-alive>
        </transition>
      </template>
    </router-view>
    <LayoutFooter />
  </main>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
  position: absolute;
  z-index: 99;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
