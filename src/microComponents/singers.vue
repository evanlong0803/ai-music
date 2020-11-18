<template>
    <div class="singers">
        <el-row :gutter="40" type="flex" style="flex-flow: row wrap;">
            <el-col :span="3" v-for="(item, index) in HotSinger || singer || artists" :key="index">
                <div class="com-singer" @click="goDetail(item.id, item.accountId)">
                    <el-image class="singer-img" :src="item.picUrl || item.img1v1Url" fit="cover"></el-image>
                    <div class="singer-name">{{ item.name }}</div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: ['HotSinger', 'singer', 'artists'],
    methods: {
        // 跳转详情页
        goDetail(id, accountId) {
            this.$router.push({ path: '/singerdetail', query: { id, accountId } });
        }
    }
};
</script>

<style lang="less" scoped>
.singers {
    // 歌手
    .com-singer {
        cursor: pointer;
        text-align: center;
        .singer-img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 1px solid #ccc;
        }
        .singer-name {
            font-size: 14px;
            font-weight: bold;
            margin: 10px 0 30px 0;
        }
    }
}
</style>
