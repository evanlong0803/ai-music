<script setup lang="ts">
import request from '@/utils/request';
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
  <header class="bg-light-500 py-5 flex items-center tracking-wide">
    <img class="w-1/5 rounded-xl" :src="detail.coverImgUrl" alt="cover" />
    <div class="mx-15">
      <div class="text-3xl font-bold">
        {{ detail.name }}
        {{ detail.playCount }}
      </div>
      <div class="text-lg font-bold mt-5">撒大大飒飒 · {{ detail.trackCount }} 首</div>
      <div class="text-gray-500 mb-5">
        最后更新于 {{ detail.updateFrequency }}
        <span>{{ detail.updateTime }}</span>
      </div>
      <div class="text-gray-500">{{ detail.description }}</div>
    </div>
  </header>
</template>
