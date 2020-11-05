<template>
    <div class="singer">
        <div class="type-region">
            <el-radio-group v-model="typeRegion" size="small" @change="changeLabel">
                <el-radio-button label="全部"></el-radio-button>
                <el-radio-button label="华语"></el-radio-button>
                <el-radio-button label="欧美"></el-radio-button>
                <el-radio-button label="日本"></el-radio-button>
                <el-radio-button label="韩国"></el-radio-button>
                <el-radio-button label="其他"></el-radio-button>
            </el-radio-group>
        </div>
        <div class="type-singer">
            <el-radio-group v-model="typeSinger" size="small" @change="changeLabel">
                <el-radio-button label="全部"></el-radio-button>
                <el-radio-button label="男歌手"></el-radio-button>
                <el-radio-button label="女歌手"></el-radio-button>
                <el-radio-button label="乐队"></el-radio-button>
            </el-radio-group>
        </div>
        <div class="type-hot">
            <el-radio-group v-model="typeHot" size="small" @change="changeLabel">
                <el-radio-button label="热门"></el-radio-button>
                <el-radio-button :label="item" v-for="(item, index) in letter" :key="index" class="letter"></el-radio-button>
                <el-radio-button label="其他"></el-radio-button>
            </el-radio-group>
        </div>
        <div class="artists">
            <singers :artists="artists" />
        </div>
    </div>
</template>

<script>
import singers from '../microComponents/singers'
export default {
    components: {
        singers
    },
    data() {
        return {
            // 歌手
            artists: [],
            letter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z'],
            typeRegion: '全部',
            typeSinger: '全部',
            typeHot: '热门',

            // 请求参数
            SingerParams: {
                limit: 32,
                offset: 0, // 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值
                type: -1, // -1:全部 1:男歌手 2:女歌手 3:乐队
                area: -1, // -1:全部 7:华语 96:欧美 8:日本 16:韩国 0:其他
                initial: -1 // 按首字母索引查找参数  name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传0
            }
        }
    },
    created() {
        // 加载歌手分类列表
        this.loadSingerType()
    },
    methods: {
        // 加载歌手分类列表
        async loadSingerType() {
            const { data: res } = await this.$axios.get('/artist/list', {
                params: this.SingerParams
            })
            if (res.code !== 200) {
                return this.$message.error('退出失败')
            }
            this.artists = res.artists
        },
        changeLabel() {
            // offset: 0, // 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值
            // area: -1, // -1:全部 7:华语 96:欧美 8:日本 16:韩国 0:其他
            // type: -1, // -1:全部 1:男歌手 2:女歌手 3:乐队
            // initial: -1 // 按首字母索引查找参数  name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传0
            if (this.typeRegion === '全部') {
                this.SingerParams.area = -1
                // 加载歌手分类列表
                this.loadSingerType()
            } else if (this.typeRegion === '华语') {
                this.SingerParams.area = 7
                // 加载歌手分类列表
                this.loadSingerType()
            } else if (this.typeRegion === '欧美') {
                this.SingerParams.area = 96
                // 加载歌手分类列表
                this.loadSingerType()
            } else if (this.typeRegion === '日本') {
                this.SingerParams.area = 8
                // 加载歌手分类列表
                this.loadSingerType()
            } else if (this.typeRegion === '韩国') {
                this.SingerParams.area = 16
                // 加载歌手分类列表
                this.loadSingerType()
            } else if (this.typeRegion === '其他') {
                this.SingerParams.area = 0
                // 加载歌手分类列表
                this.loadSingerType()
            }

            if (this.typeSinger === '全部') {
                this.SingerParams.type = -1
                // 加载歌手分类列表
                this.loadSingerType()
            } else if (this.typeSinger === '男歌手') {
                this.SingerParams.type = 1
                // 加载歌手分类列表
                this.loadSingerType()
            } else if (this.typeSinger === '女歌手') {
                this.SingerParams.type = 2
                // 加载歌手分类列表
                this.loadSingerType()
            } else if (this.typeSinger === '乐队') {
                this.SingerParams.type = 3
                // 加载歌手分类列表
                this.loadSingerType()
            }

            if (this.typeHot === '热门') {
                this.SingerParams.initial = -1
                // 加载歌手分类列表
                this.loadSingerType()
            } else if (this.letter.indexOf(this.typeHot) > 0) {
                let index = this.letter.indexOf(this.typeHot)
                this.SingerParams.initial = this.letter[index]
                // 加载歌手分类列表
                this.loadSingerType()
            } else if (this.typeHot === '其他') {
                this.SingerParams.initial = 0
                // 加载歌手分类列表
                this.loadSingerType()
            }
        }
    }
}
</script>

<style lang="less" scoped>
.singer {
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
    .type-region,
    .type-singer,
    .type-hot {
        margin-bottom: 20px;
    }
    .artists {
        margin-top: 50px;
    }
    .letter {
        margin-right: 10px;
        width: 30px;
    }
}
</style>
