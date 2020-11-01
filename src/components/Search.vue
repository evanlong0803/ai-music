<template>
    <div class="search">
        <!-- 背景 -->
        <div class="search-background"></div>
        <!-- 上部分 -->
        <div class="search-top">
            <!-- 搜索框 -->
            <el-input
                placeholder="搜索关键词可以多个,以空格隔开"
                v-model="searchContent"
                class="search-box"
                @keyup.enter.native="searchSingle"
                clearable
            >
                <el-button slot="append" icon="el-icon-search" @click="searchSingle"></el-button>
            </el-input>
        </div>
        <!-- 下部分 -->
        <div class="search-bottom">
            <!-- 搜索结果 -->
            <div class="search-res">
                <!-- 搜索选项 -->
                <span class="options-title">搜索结果</span>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="单曲" name="single">
                        <el-button class="single-allPlay" type="primary" round size="medium" icon="el-icon-caret-right" @click="allPlay">
                            播放全部
                        </el-button>
                        <!-- 播放列表 -->
                        <PlayList :single="single" />
                    </el-tab-pane>
                    <el-tab-pane label="歌手" name="singer">歌手</el-tab-pane>
                    <el-tab-pane label="专辑" name="album">专辑</el-tab-pane>
                    <el-tab-pane label="视频" name="video">视频</el-tab-pane>
                    <el-tab-pane label="歌单" name="songSheet">歌单</el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import PlayList from '../microComponents/PlayList'
export default {
    components: {
        PlayList
    },
    data() {
        return {
            // 动态切换组件
            activeName: 'single',
            // 搜索内容
            searchContent: '',
            // 单曲
            single: [],
            // 歌手
            singer: [],
            // 专辑
            album: [],
            // 视频
            video: [],
            // 歌单
            songSheet: []
        }
    },
    created() {
        // 监听SearchBox组件的自定义事件
        this.getAction()
        // 取临时历史
        this.getTempHistory()
    },
    methods: {
        // 监听SearchBox组件的自定义事件
        getAction() {
            this.$root.$on('getAction', () => {
                // 取临时的搜索历史
                let searchContent = sessionStorage.getItem('searchContent')
                this.searchContent = searchContent
                // 搜索单曲
                this.searchSingle()
            })
        },
        // 搜索单曲
        async searchSingle() {
            if (this.searchContent === '' || this.searchContent.startsWith(' ')) {
                return this.$notify({
                    title: '消息',
                    message: '搜索内容不能为空',
                    type: 'warning',
                    position: 'top-left'
                })
            }
            // 搜索时默认显示单曲选项
            this.activeName = 'single'
            const { data: res } = await this.$axios.post('/cloudsearch', {
                keywords: this.searchContent
            })
            if (res.code !== 200) {
                return this.$message.error('搜索失败')
            }
            this.single = res.result.songs
            // 定义音乐ID
            let singleID = res.result.songs.map(item => {
                return item.id
            })
            // 加载音乐URL
            this.loadMusicURL(singleID)
        },
        // 搜索歌手
        async searchSinger() {
            const { data: res } = await this.$axios.post('/search', {
                keywords: this.searchContent
            })
            if (res.code !== 200) {
                return this.$message.error('搜索失败')
            }
            console.log(res)
        },
        // 搜索专辑
        async searchAlbum() {
            const { data: res } = await this.$axios.post('/search', {
                keywords: this.searchContent
            })
            if (res.code !== 200) {
                return this.$message.error('搜索失败')
            }
            console.log(res)
        },
        // 搜索视频
        async searchVideo() {
            const { data: res } = await this.$axios.post('/search', {
                keywords: this.searchContent
            })
            if (res.code !== 200) {
                return this.$message.error('搜索失败')
            }
            console.log(res)
        },
        // 搜索歌单
        async searchSongSheet() {
            const { data: res } = await this.$axios.post('/search', {
                keywords: this.searchContent
            })
            if (res.code !== 200) {
                return this.$message.error('搜索失败')
            }
            console.log(res)
        },
        // 标签页点击
        handleClick(tab) {
            switch (tab.name) {
                // 单曲
                case 'single':
                    console.log(1)
                    break
                // 歌手
                case 'singer':
                    console.log(2)
                    break
                // 专辑
                case 'album':
                    console.log(3)
                    break
                // 视频
                case 'video':
                    console.log(4)
                    break
                // 歌单
                case 'songSheet':
                    console.log(5)
                    break
            }
        },
        // 加载音乐URL
        async loadMusicURL(singleID) {
            const { data: res } = await this.$axios.get(`/song/url?id=${singleID.join(',')}`)
            if (res.code !== 200) {
                return this.$message.error('音乐URL请求失败')
            }
            // 储存每首音乐的RUL
            let musicURL = res.data.map(item => {
                return { url: item.url, id: item.id }
            })
            // 将每一个音乐URL放入对象属性中
            for (const i in musicURL) {
                for (const j in this.single) {
                    // 如果歌单与歌单URL的ID一致，就把URL加入到对应的歌单中
                    if (this.single[j].id === musicURL[i].id) {
                        this.$set(this.single[j], 'url', musicURL[i].url)
                    }
                }
            }
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
        // 取临时的搜索历史
        getTempHistory() {
            let searchContent = sessionStorage.getItem('searchContent')
            this.searchContent = searchContent
            this.searchSingle()
        }
    }
}
</script>

<style lang="less">
.search {
    width: 100%;
    // 背景
    .search-background {
        margin-top: 70px;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: -10;
        background: url('../assets/image/Searchbackgroun.jpg') no-repeat;
        background-size: cover;
    }

    // 上部分
    .search-top {
        height: 200px;
        width: 750px;
        display: flex;
        align-items: center;
        margin: 0 auto;
        // 搜索框
        .search-box {
            border: none;
            outline: none;
        }
    }
    // 下部分
    .search-bottom {
        width: 100%;
        background: white;
        // 搜索结果
        .search-res {
            width: 1200px;
            margin: 0 auto;
            padding: 30px 0;
            // 选项标题
            .options-title {
                font-size: 22px;
                font-weight: 600;
                line-height: 40px;
                color: #4a4a4a;
                float: left;
                margin-right: 40px;
            }
            // 标签页
            .el-tabs__header {
                margin-bottom: 30px;
            }

            // 单曲全部播放
            .single-allPlay {
                float: right;
                margin-bottom: 20px;
            }
        }
    }
}
</style>
