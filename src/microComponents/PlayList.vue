<template>
    <div class="playList">
        <el-table
            :data="single || songDetail"
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
    </div>
</template>

<script>
export default {
    props: ['single', 'songDetail'],
    methods: {
        // 当某一行被点击时
        rowClick(row) {
            let firstSong = {
                id: row.id,
                name: row.name,
                artist: row.ar[0].name,
                url: row.url,
                cover: row.al.picUrl
            }
            // 传递当前单曲歌词
            this.$root.$emit('getSingle', firstSong)
        },
        // 全部播放
        allPlay() {
            // 重新定义播放器对象结构
            let allSong = this.single.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    artist: item.ar[0].name,
                    url: item.url,
                    cover: item.al.picUrl
                }
            })
            // 传递当前歌单所有歌曲
            this.$root.$emit('getAllSong', allSong)
        },
        // 自定义索引
        indexMethod(index) {
            return index + 1 < 10 ? '0' + (index + 1) : index + 1
        }
    }
}
</script>

@<style lang="less" scoped>
.playList {
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
}
</style>
