<template>
    <el-table
        :data="single || songDetail || albumDetail"
        size="medium"
        stripe
        :header-cell-style="{ background: '#FAFAFA', color: '#606266' }"
        @row-click="rowClick"
    >
        <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="70"> </el-table-column>
        <el-table-column label="歌曲" width="220" show-overflow-tooltip>
            <template slot-scope="scope">
                <div class="songName">
                    <el-avatar shape="square" :size="35" :src="scope.row.al.picUrl"></el-avatar>
                    <div>{{ scope.row.name }}</div>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="歌手" width="150" show-overflow-tooltip>
            <template slot-scope="scope">
                <span v-for="(item, index) in scope.row.ar" :key="index">
                    {{ item.name }}
                </span>
            </template>
        </el-table-column>
        <el-table-column prop="al.name" label="专辑" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column label="时长" align="center">
            <template slot-scope="scope">
                {{ scope.row.dt | playTime }}
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    props: ['single', 'songDetail', 'albumDetail'],
    methods: {
        // 当某一行被点击时
        rowClick(row) {
            let firstSong = {
                name: row.name,
                artist: row.ar[0].name,
                url: row.url,
                cover: row.al.picUrl
            }
            // 传递当前单曲歌词
            this.$root.$emit('updata:getSingle', firstSong)
        },
        // 自定义索引
        indexMethod(index) {
            return index + 1 < 10 ? '0' + (index + 1) : index + 1
        }
        // 加载单曲歌词
        // async loadSingleLyrics(row) {
        //     const { data: res } = await this.$axios.get(`/lyric?id=${row.id}`)
        //     if (res.code !== 200) {
        //         return this.$message.error('请求歌词失败')
        //     } else if (!res.lrc || !res.lrc.lyric) {
        //         this.$message.info('当前歌曲没有歌词') // 此处不能停止函数
        //     }
        // }
    }
}
</script>

@<style lang="less" scoped>
.songName {
    width: 100%;
    display: flex;
    align-items: center;
    div {
        width: 70%;
        margin-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>
