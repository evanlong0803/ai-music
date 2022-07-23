<script lang="ts" setup>
import { playerUseStore } from '@/store';
const playerStore = playerUseStore();

// 播放歌单
const onPlayList = async (id: string): Promise<void> => {
  // 获取歌单URL
  await playerStore.getUrl(id);
  playerStore.playAudio();
};
</script>

<template>
  <div class="play-list-theme" v-show="playerStore.playListState">
    <div class="default-bg opacity-80 p-4 space-y-2" v-if="playerStore.playList.length">
      <template
        v-for="item in playerStore.playList"
        :key="item.id"
        v-memo="[item.id === playerStore.playInfo.id]"
      >
        <div
          :class="[
            playerStore.playInfo.id === item.id && 'hover-bg',
            'default-color flex items-center tracking-wide truncate p-2 rounded cursor-pointer transition-all',
            'hover:(hover-bg) active:(transform duration-100 scale-98)',
          ]"
          @click.stop="onPlayList(item.id)"
        >
          <img class="aspect-square h-10 m-2 rounded" alt="avatar" :src="item?.al.picUrl" />
          <div class="truncate mx-2">
            <!-- 歌曲名 -->
            <div class="truncate font-bold" :title="item.name">
              {{ item.name }}
            </div>
            <!-- 歌手 -->
            <div
              class="text-sm truncate light:(text-gray-500) dark:(text-gray-400)"
              :title="item?.al.name"
            >
              {{ item?.al.name || '***' }}
            </div>
          </div>
          <!-- 播放位置 -->
          <ic-twotone-auto-awesome
            class="text-2xl ml-auto mx-2"
            v-if="playerStore.playInfo.id === item.id"
          />
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped>
.play-list-theme {
  @apply 'h-[70%]' 'w-1/3' fixed bottom-17 right-0 rounded-xl rounded-b-l-none shadow component-color border-1 border-color backdrop-filter backdrop-blur-xl overflow-x-hidden overflow-y-visible;
}
</style>
