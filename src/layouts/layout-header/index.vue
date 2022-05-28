<script lang="ts" setup>
import searchUseStore from '@/store/modules/search';
import homeUseStore from '@/store/modules/home';
const router = useRouter();
const searchStore = searchUseStore();
const homeStore = homeUseStore();

const mode = useColorMode();
</script>

<template>
  <header class="w-1/1 z-10 fixed backdrop-filter backdrop-blur">
    <div class="flex m-auto h-17 w-[80%] gap-x-5 items-center">
      <div class="flex space-x-2 flex-1 text-left">
        <ic-round-chevron-left class="icon" @click="() => router.back()" />
        <ic-round-chevron-right class="icon" @click="() => router.go(1)" />
      </div>
      <div class="flex-auto font-bold space-x-7 text-center text-lg">
        <span class="menu" @click="router.push('/')">首页</span>
        <span class="menu" @click="router.push('/find')">发现</span>
        <span class="menu" @click="router.push('/library')">音乐库</span>
      </div>
      <div class="flex flex-1 text-right gap-x-4 items-center justify-end">
        <v-input :placeholder="searchStore.keyWord" />
        <v-popover />
        <button class="" @click="mode = mode === 'dark' ? 'light' : 'dark'">
          <noto-v1-full-moon-face v-if="mode === 'light'" class="text-2xl icon" />
          <fxemoji-firstquartermoonface v-else class="text-2xl icon" />
        </button>
        <a href="https://github.com/toolse/cookie-music" target="_blank">
          <line-md-github-twotone class="text-2xl icon" />
        </a>
      </div>
    </div>
  </header>
</template>
