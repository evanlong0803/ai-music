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

<style lang="less" scoped>
// 专辑
.search-album {
    cursor: pointer;
    margin-bottom: 20px;
    .album-img {
        width: 175px;
        height: 175px;
        border-radius: 5px;
        background: #ccc;
        margin-bottom: 10px;
        .image-slot {
            width: inherit;
            height: inherit;
            display: flex;
            justify-content: center;
            align-items: center;
            background: url('../../assets/image/rainbow.png') no-repeat;
            background-size: cover;
        }
    }
    // 播放总数
    .el-tag {
        position: absolute;
        z-index: 1;
        margin: 8px;
        height: 20px;
        padding: 0;
        line-height: 18px;
        padding: 0 3px;
        text-align: center;
        background: black;
        color: white;
    }
    .album-name {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .album-info {
        font-size: 12px;
        color: #666;
    }
}
</style>
