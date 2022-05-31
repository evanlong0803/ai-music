<script lang="ts" setup>
import { searchUseStore, homeUseStore } from '@/store';
const router = useRouter();
const searchStore = searchUseStore();
const homeStore = homeUseStore();

const mode = useColorMode();

const content = ref('');

const onInput = (val: any) => {
  // console.log((<HTMLInputElement>e.target).value);
  console.log(content.value);
};
</script>

<template>
  <header class="w-1/1 z-10 fixed backdrop-filter backdrop-blur-xl">
    <div class="bg-gray-100 opacity-80">
      <div class="flex m-auto h-17 w-[80%] gap-x-5 items-center">
        <div class="flex space-x-2 flex-1 text-left">
          <ic-round-chevron-left class="icon" @click="() => router.back()" />
          <ic-round-chevron-right class="icon" @click="() => router.go(1)" />
        </div>
        <div class="flex-auto font-bold space-x-7 text-center text-lg">
          <router-link class="menu" to="/" exact>首页</router-link>
          <router-link class="menu" to="/find" exact>发现</router-link>
          <router-link class="menu" to="/library" exact>音乐库</router-link>
        </div>
        <div class="flex flex-1 text-right gap-x-4 items-center justify-end">
          <!-- 搜索框 -->
          <v-input v-model:value="content" @input="onInput" :placeholder="searchStore.keyWord">
            <template #icon>
              <ic-round-search />
            </template>
          </v-input>
          <!-- 用户信息 -->
          <v-popover />
          <!-- 功能性按钮 -->
          <button
            class="transition-all duration-500"
            @click="mode = mode === 'dark' ? 'light' : 'dark'"
          >
            <noto-v1-full-moon-face v-if="mode === 'light'" class="text-3xl icon" />
            <fxemoji-firstquartermoonface v-else class="text-3xl icon" />
          </button>
          <a href="https://github.com/toolse/cookie-music" target="_blank">
            <line-md-github-twotone class="text-3xl icon" />
          </a>
        </div>
      </div>
    </div>
  </header>
</template>
