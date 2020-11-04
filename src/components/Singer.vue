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
                <el-radio-button :label="item" v-for="(item, index) in arr" :key="index"></el-radio-button>
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
            arr: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z'],
            typeRegion: '全部',
            typeSinger: '全部',
            typeHot: '热门',
            artists: []
        }
    },
    created() {
        // 加载歌手分类列表
        this.loadSingerType()
    },
    methods: {
        // 加载歌手分类列表
        async loadSingerType() {
            const { data: res } = await this.$axios.post('/artist/list', {
                limit: 32,
                type: -1,
                area: -1,
                initial: -1
            })
            if (res.code !== 200) {
                return this.$message.error('退出失败')
            }
            this.artists = res.artists
        },
        changeLabel(val) {
            console.log(val)
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
}
</style>
