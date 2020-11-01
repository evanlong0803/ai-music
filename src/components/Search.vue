<template>
    <div class="search">
        <!-- 背景 -->
        <div class="search-background"></div>
        <!-- 上部分 -->
        <div class="search-top">
            <!-- 搜索框 -->
            <el-input placeholder="请输入内容" v-model="searchContent" class="search-box" @keyup.enter.native="defaultSearch" clearable>
                <el-button slot="append" icon="el-icon-search" @click="defaultSearch"></el-button>
            </el-input>
        </div>
        <!-- 下部分 -->
        <div class="search-bottom">
            <!-- 搜索结果 -->
            <div class="search-res">
                <!-- 搜索选项 -->
                <span class="options-title">搜索结果</span>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="单曲" name="single">单曲</el-tab-pane>
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
export default {
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
    },
    methods: {
        // 默认搜索单曲
        defaultSearch() {
            if (this.searchContent === '' || this.searchContent.startsWith(' ')) {
                return this.$notify({
                    title: '消息',
                    message: '搜索内容不能为空',
                    type: 'warning',
                    position: 'top-left'
                })
            }
            this.searchSingle()
        },
        // 监听SearchBox组件的自定义事件
        getAction() {
            this.$root.$on('getAction', () => {
                // 事件触发取搜索内容
                this.searchContent = sessionStorage.getItem('searchContent')
                // 搜索单曲
                this.searchSingle()
            })
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
        // 搜索单曲
        async searchSingle() {
            const { data: res } = await this.$axios.post('/search', {
                keywords: this.searchContent
            })
            if (res.code !== 200) {
                return this.$message.error('搜索失败')
            }
            this.single = res.result.songs
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
        background: url('../assets/image/Searchbackgroun.jpg');
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
                margin-bottom: 40px;
            }
        }
    }
}
</style>
