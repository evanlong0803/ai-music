<template>
    <div class="songSheet">
        <!-- 分类 -->
        <div class="songSheet-type">
            <span class="type-nav">
                <span>热门标签：</span>
                <el-radio-group v-model="typeHot" size="small" @change="changeLabel">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="华语"></el-radio-button>
                    <el-radio-button label="流行"></el-radio-button>
                    <el-radio-button label="摇滚"></el-radio-button>
                    <el-radio-button label="民谣"></el-radio-button>
                    <el-radio-button label="电子"></el-radio-button>
                    <el-radio-button label="另类/独立"></el-radio-button>
                    <el-radio-button label="轻音乐"></el-radio-button>
                    <el-radio-button label="综艺"></el-radio-button>
                    <el-radio-button label="影视原声"></el-radio-button>
                    <el-radio-button label="ACG"></el-radio-button>
                </el-radio-group>
            </span>

            <el-radio-group v-model="typeClass" size="small" @change="changeLabel">
                <el-radio-button label="热门"></el-radio-button>
                <el-radio-button label="最新"></el-radio-button>
            </el-radio-group>
        </div>
        <!-- 歌单 -->
        <div class="songSheet-component">
            <SongSheets :songSheet="songSheet" />
        </div>
        <!-- 分页 -->
        <el-pagination
            v-show="songSheet.length"
            background
            class="pagination"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="songSheetParams.limit"
            layout="total, prev, pager, next"
            :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
import SongSheets from '../microComponents/SongSheets'
export default {
    components: {
        SongSheets
    },
    data() {
        return {
            songSheet: [],
            typeHot: '全部',
            typeClass: '热门',
            type: ['全部', '华语', '流行', '摇滚', '民谣', '电子', '另类/独立', '轻音乐', '综艺', '影视原声', 'ACG', '热门', '最新'],
            // order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
            // cat:cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
            // limit: 取出歌单数量 , 默认为 50
            // offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
            total: 0,
            currentPage: 1,
            songSheetParams: {
                order: 'hot',
                cat: '全部',
                offset: 0,
                limit: 30
            }
        }
    },
    created() {
        // 加载歌单
        this.loadSongSheet()
    },
    methods: {
        // 加载歌单
        async loadSongSheet() {
            const { data: res } = await this.$axios.get('/top/playlist', {
                params: this.songSheetParams
            })
            if (res.code !== 200) {
                return this.$message.error('退出失败')
            }
            this.songSheet = res.playlists
            this.total = res.total
        },
        changeLabel() {
            let indexCat = this.type.indexOf(this.typeHot)
            let indexOrder = this.type.indexOf(this.typeClass)
            if (indexCat !== -1) {
                this.songSheetParams.cat = this.type[indexCat]
                this.loadSongSheet()
            }
            if (this.type[indexOrder] === '热门') {
                this.songSheetParams.order = 'hot'
                this.loadSongSheet()
            }
            if (this.type[indexOrder] === '最新') {
                this.songSheetParams.order = 'new'
                this.loadSongSheet()
            }
        },
        handleCurrentChange(val) {
            this.songSheetParams.offset = this.songSheetParams.limit * (val - 1)
            this.loadSongSheet()
        }
    }
}
</script>

<style lang="less" scoped>
.songSheet {
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
    .songSheet-type {
        padding: 10px;
        margin-top: 20px;
        background: #ecf5ff;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .type-nav {
            span {
                font-size: 14px;
                margin-right: 5px;
            }
        }
    }
    .songSheet-component {
        margin-top: 50px;
    }
    .pagination {
        text-align: center;
        margin: 20px 0;
    }
}
</style>
