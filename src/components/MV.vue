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
    </div>
</template>

<script>
import Videos from '../microComponents/Videos'

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
            // 请求参数
            mvParams: {
                limit: 12,
                offset: 0, // 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
                area: '全部', // 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
                type: '全部', // 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
                order: '上升最快' // 排序,可选值为上升最快,最热,最新,不填则为上升最快
            }
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
            //  area: '全部', // 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
            if (this.typeRegion === '全部') {
                this.mvParams.area = '全部'
                this.loadAllMV()
            } else if (this.typeRegion === '内地') {
                this.mvParams.area = '内地'
                this.loadAllMV()
            } else if (this.typeRegion === '港台') {
                this.mvParams.area = '港台'
                this.loadAllMV()
            } else if (this.typeRegion === '欧美') {
                this.mvParams.area = '欧美'
                this.loadAllMV()
            } else if (this.typeRegion === '日本') {
                this.mvParams.area = '日本'
                this.loadAllMV()
            } else if (this.typeRegion === '韩国') {
                this.mvParams.area = '韩国'
                this.loadAllMV()
            }
            // type: '全部', // 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
            if (this.typeEdition === '全部') {
                this.mvParams.type = '全部'
                this.loadAllMV()
            } else if (this.typeEdition === '官方版') {
                this.mvParams.type = '官方版'
                this.loadAllMV()
            } else if (this.typeEdition === '原生') {
                this.mvParams.type = '原生'
                this.loadAllMV()
            } else if (this.typeEdition === '现场版') {
                this.mvParams.type = '现场版'
                this.loadAllMV()
            } else if (this.typeEdition === '网易出品') {
                this.mvParams.type = '网易出品'
                this.loadAllMV()
            }
            // order: '上升最快' // 排序,可选值为上升最快,最热,最新,不填则为上升最快
            if (this.typeHot === '上升最快') {
                this.mvParams.order = '上升最快'
                this.loadAllMV()
            } else if (this.typeHot === '最热') {
                this.mvParams.order = '最热'
                this.loadAllMV()
            } else if (this.typeHot === '最新') {
                this.mvParams.order = '最新'
                this.loadAllMV()
            }
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
}
</style>
