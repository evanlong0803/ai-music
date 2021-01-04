<template>
    <div class="mv">
        <div class="type-region">
            <el-radio-group v-model="typeRegion" size="small" @change="changeLabel">
                <el-radio-button label="全部"></el-radio-button>
                <el-radio-button label="内地"></el-radio-button>
                <el-radio-button label="港台"></el-radio-button>
                <el-radio-button label="欧美"></el-radio-button>
                <el-radio-button label="日本"></el-radio-button>
                <el-radio-button label="韩国"></el-radio-button>
            </el-radio-group>
        </div>
        <div class="type-edition">
            <el-radio-group v-model="typeEdition" size="small" @change="changeLabel">
                <el-radio-button label="全部"></el-radio-button>
                <el-radio-button label="官方版"></el-radio-button>
                <el-radio-button label="原生"></el-radio-button>
                <el-radio-button label="现场版"></el-radio-button>
                <el-radio-button label="网易出品"></el-radio-button>
            </el-radio-group>
        </div>
        <div class="type-hot">
            <el-radio-group v-model="typeHot" size="small" @change="changeLabel">
                <el-radio-button label="上升最快"></el-radio-button>
                <el-radio-button label="最热"></el-radio-button>
                <el-radio-button label="最新"></el-radio-button>
            </el-radio-group>
        </div>
        <div class="videos">
            <Videos :video="video" />
        </div>
        <!-- 分页 -->
        <el-pagination
            v-show="video.length"
            background
            class="pagination"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="mvParams.limit"
            layout="total, prev, pager, next"
            :total="200"
        >
        </el-pagination>
    </div>
</template>

<script>
import Videos from '../../components/detail/Videos'

export default {
    components: {
        Videos
    },
    data() {
        return {
            // 视频
            video: [],
            typeRegion: '全部',
            typeEdition: '全部',
            typeHot: '上升最快',
            type: ['全部', '内地', '港台', '欧美', '日本', '韩国', '官方版', '原生', '现场版', '网易出品', '上升最快', '最热', '最新'],
            // 请求参数
            mvParams: {
                limit: 20,
                offset: 0, // 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
                area: '全部', // 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
                type: '全部', // 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
                order: '上升最快' // 排序,可选值为上升最快,最热,最新,不填则为上升最快
            },
            currentPage: 1
        }
    },
    created() {
        // 加载全部MV
        this.loadAllMV()
        // 加载MV
    },
    methods: {
        // 加载歌手分类列表
        async loadAllMV() {
            const { data: res } = await this.$axios.get('/mv/all', {
                params: this.mvParams
            })
            if (res.code !== 200) {
                return this.$message.error('加载歌手分类列表失败')
            }
            this.video = res.data
        },

        changeLabel() {
            let indexArea = this.type.indexOf(this.typeRegion)
            let indexType = this.type.indexOf(this.typeEdition)
            let indexOrder = this.type.indexOf(this.typeHot)
            //  area: '全部', // 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
            if (indexArea !== -1) {
                this.mvParams.area = this.type[indexArea]
                this.loadAllMV()
            }
            // type: '全部', // 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
            if (indexType !== -1) {
                this.mvParams.type = this.type[indexType]
                this.loadAllMV()
            }
            // order: '上升最快' // 排序,可选值为上升最快,最热,最新,不填则为上升最快
            if (indexOrder !== -1) {
                this.mvParams.order = this.type[indexOrder]
                this.loadAllMV()
            }
        },
        handleCurrentChange(val) {
            this.mvParams.offset = this.mvParams.limit * (val - 1)
            this.loadAllMV()
        }
    }
}
</script>

<style lang="less" scoped>
.mv {
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
    .type-region,
    .type-edition,
    .type-hot {
        margin-bottom: 20px;
    }
    .videos {
        margin-top: 50px;
    }
    .pagination {
        text-align: center;
        margin: 20px 0;
    }
}
</style>
