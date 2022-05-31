<script setup lang="ts">
import request from '@/utils/request';
import { formatDate, handlePlayCount } from '@/utils';
const route = useRoute() as any;

const detail = reactive<any>({});

// 获取歌单详情
const getSongListDetail = async (id: string): Promise<void> => {
  const { data } = await request.get('/playlist/detail', { params: { id } });
  Object.assign(detail, data.playlist);
  console.log(detail);
};
getSongListDetail(route.query.id);
</script>

<template>
  <header class="bg-light-500 mt-5 flex items-center tracking-wide">
    <img class="w-1/5 rounded-xl" :src="detail.coverImgUrl" alt="cover" loading="lazy" />
    <div class="mx-15">
      <div>
        <span class="text-3xl font-bold">{{ detail.name }}</span>
      </div>
      <div class="space-x-3 my-8">
        <span
          class="p-2 bg-dark-400 text-lx font-bold text-light-500 rounded"
          v-for="item in detail.tags"
        >
          {{ item }}
        </span>
      </div>
      <a href="#" class="text-lg font-bold my-3">{{ detail.creator?.nickname }}</a>
      <div class="text-gray-500 mb-5 leading-5">
        <span>
          最后更新于 {{ formatDate(detail.updateTime) }} · 共 {{ detail.trackCount }} 首 · 播放量
          {{ handlePlayCount(detail.playCount) }}
        </span>
      </div>
      <div class="text-gray-500">{{ detail.description }}</div>
    </div>
  </header>
</template>
