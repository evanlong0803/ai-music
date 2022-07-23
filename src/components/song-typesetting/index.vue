<script lang="ts" setup>
import { handlePlayCount } from '@/utils';
import playerUseStore from '@/store/modules/player';
const playerStore = playerUseStore();

const props = withDefaults(
  defineProps<{
    /** 歌单标题 */
    title: string;
    /** 歌单列表 */
    lists: any[];
    /** 路由名称 */
    routerName?: string;
  }>(),
  {
    routerName: '',
  },
);

const router = useRouter();

const lists = ref<any>([]);

/** 播放歌单 */
const playSongList = async (id: string) => {
  // 获取歌单所有歌曲
  await playerStore.getAllSongList(id);
  // 获取歌单URL
  await playerStore.getUrl(playerStore.playList[0].id);
  playerStore.playAudio();
};

/** 跳转歌单列表 */
const goDetail = (id: number) => {
  router.push({
    name: 'SongList',
    query: { id },
  });
};

watchSyncEffect(() => {
  lists.value = props.lists.map(item => ({ ...item, playButtonShow: false }));
});
</script>

<template>
  <div class="my-15">
    <!-- 头部 -->
    <div class="flex mb-4 justify-between items-center">
      <div class="font-bold text-2xl default-color">{{ title }}</div>
      <ic-round-read-more class="icon" @click="() => router.push({ name: routerName })" />
    </div>

    <div class="grid gap-x-8 gap-y-3 grid-cols-5">
      <div v-for="item in lists" :key="item.id" @click="goDetail(item.id)">
        <!-- 歌单图片容器 -->
        <div
          class="relative"
          @mouseenter="item.playButtonShow = true"
          @mouseleave="item.playButtonShow = false"
        >
          <img
            class="cursor-pointer rounded-2xl shadow aspect-square"
            :src="item.picUrl ?? item.coverImgUrl"
            :alt="item.name"
            v-if="item.picUrl ?? item.coverImgUrl"
          />
          <!-- 播放按钮 -->
          <div
            v-if="item.playButtonShow"
            @click.stop="playSongList(item.id)"
            class="cursor-pointer rounded-1/2 shadow filter-blur absolute-center hover:(opacity-85 transition-all)"
          >
            <ic-round-play-arrow class="p-2 text-5xl text-gray-100" />
          </div>

          <!-- 播放数量 -->
          <div
            class="absolute top-[5%] right-[5%] shadow filter-blur text-sm p-1 px-2 rounded text-white"
            v-if="item.playCount"
          >
            {{ handlePlayCount(item.playCount) }}
          </div>
        </div>

        <!-- 歌单名称 -->
        <div class="font-bold my-2 text-lg default-color">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
