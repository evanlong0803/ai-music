<template>
    <el-row type="flex" :gutter="30" style="flex-flow: row wrap;" v-loading="!album.length">
        <el-col :span="4" v-for="(item, index) in album" :key="index">
            <div class="search-album" @click="goDetail(item.id)">
                <!-- 播放统计 -->
                <el-tag><i class="el-icon-caret-right"></i>{{ item.type }}</el-tag>
                <el-image class="album-img" :src="item.picUrl + '?param=175y175'" fit="cover">
                    <div slot="placeholder" class="image-slot"></div>
                    <div slot="error" class="image-slot"></div>
                </el-image>
                <div class="album-name">{{ item.name }}</div>
                <div class="album-info">{{ item.artist.name }}</div>
                <div class="album-info">{{ item.publishTime | timeStampTwo }}</div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    props: ['album'],
    methods: {
        // 跳转专辑详情
        goDetail(id) {
            this.$router.push(`/albumdetail?id=${id}`);
        }
    }
};
</script>

<style></style>
