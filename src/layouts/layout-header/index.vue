<script lang="ts" setup>
import { IOptions } from '@/components/v-dropdown/index.vue';
import { searchUseStore } from '@/store';
const router = useRouter();
const searchStore = searchUseStore();
const mode = useColorMode();

const content = ref('');

// 输入关键字进行搜索
const onSearchKeyWord = (val: string) => {};

// 按回车搜索
const onEnterSearch = () => {};

// DEV 测试用
const options = ref<IOptions[]>([
  {
    name: '个人中心',
    icon: 'ic-round-person',
    onClick: () => {
      router.push('/user');
    },
  },
  {
    name: '个人中心',
    icon: 'ic-round-person',
    onClick: () => {
      router.push('/user');
    },
  },
  {
    name: '个人中心',
    icon: 'ic-round-person',
    onClick: () => {
      router.push('/user');
    },
  },
]);
</script>

<template>
  <header class="w-1/1 z-10 fixed top-0 filter-blur">
    <div class="default-bg opacity-80">
      <div class="flex m-auto h-17 w-[80%] items-center">
        <div class="flex flex-1 space-x-2 text-left">
          <ic-round-chevron-left class="icon" @click="() => router.back()" />
          <ic-round-chevron-right class="icon" @click="() => router.go(1)" />
        </div>
        <div class="flex-2 font-bold space-x-7 text-center text-lg">
          <router-link class="menu" to="/">首页</router-link>
          <router-link class="menu" to="/find">发现</router-link>
          <router-link class="menu" to="/library">音乐库</router-link>
        </div>
        <div class="flex flex-1 text-right space-x-5 items-center justify-end">
          <!-- 搜索框 -->
          <v-input
            v-model:value="content"
            @input="onSearchKeyWord"
            @enter="onEnterSearch"
            :placeholder="searchStore.keyWord"
          >
            <template #icon>
              <ic-round-search />
            </template>
          </v-input>
          <!-- 用户信息 -->
          <v-dropdown
            coverSrc="https://p2.music.126.net/bpUDG9q4smPN8ReIl2s6cw==/109951167320600625.jpg"
            :options="options"
          />
          <!-- 消息 -->
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

<style scoped>
.router-link-active {
  @apply transition-all light:(bg-gray-300) dark:(bg-dark-300);
}

.menu {
  @apply rounded py-2 px-3 cursor-pointer transition-all light:(text-black hover: (bg-gray-300)) dark:(text-white hover: (bg-dark-300));
}
</style>
