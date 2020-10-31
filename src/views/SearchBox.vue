<template>
    <div class="home-searchBox">
        <el-collapse-transition>
            <!-- 搜索框 -->
            <div class="search-box" v-show="showSearchBox">
                <!-- 搜索栏 -->
                <div class="search-bar">
                    <div class="searchInput-barrier">
                        <el-input
                            class="search-input"
                            placeholder="请输入关键词并按回车..."
                            v-model="searchContent"
                            @keyup.enter.native="goSearch"
                            clearable
                        ></el-input>
                    </div>
                </div>
                <!-- 搜索历史 -->
                <div class="search-history" v-show="searchHistory.length">
                    <div class="history-title">
                        <span class="iconfont icon-lishi"></span>
                        搜索历史
                        <el-link :underline="false" class="clearHistory" @click="clearHistory" icon="el-icon-delete">清空</el-link>
                        <!-- <span ></span> -->
                    </div>
                    <el-tag size="medium" v-for="(item, index) in searchHistory" :key="index" closable>
                        {{ item }}
                    </el-tag>
                </div>
                <!-- 热搜 -->
                <div class="search-hot">
                    <div class="hot-title">
                        <span class="iconfont icon-remen"></span>
                        热门搜索
                    </div>
                    <el-tag size="medium" v-for="(item, index) in hotSearch" :key="index">
                        {{ item.name }}
                    </el-tag>
                </div>
                <!-- 关闭图标 -->
                <i class="el-icon-close" @click="close"></i>
            </div>
        </el-collapse-transition>
        <!-- 搜索框屏障 -->
        <transition name="el-fade-in-linear">
            <div class="searchBox-barrier" v-show="showSearchBox"></div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 搜索内容
            searchContent: '',
            // 搜索历史
            searchHistory: [],
            // 热搜
            hotSearch: []
        }
    },
    // 接收父组件的数据
    props: ['showSearchBox'],
    created() {
        // 加载热搜
        this.loadHotSearch()
        // 页面重新获取历史
        this.getSearchHistory()
    },
    methods: {
        close() {
            this.$emit('update:showSearchBox', false)
            this.searchContent = ''
        },
        // 加载热搜
        async loadHotSearch() {
            const { data: res } = await this.$axios.get('/search/hot')
            this.hotSearch = res.result.hots.map(item => {
                return {
                    name: item.first
                }
            })
        },
        // 回车搜索
        goSearch() {
            // 存储用户搜索历史
            if (this.searchContent) {
                // 把搜索内容添加到搜索历史当中
                this.searchHistory.push(this.searchContent)
                // 以字符串的方式存入
                localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
                // 以对象的方式取出
                let searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
                // 有重复的历史就不再存入

                // 存入历史
                this.searchHistory = searchHistory
            }
            // 回车跳转搜索页
            if (this.$route.path === '/search') {
                this.$emit('update:showSearchBox', false)
                return // 直接搜索
            }
            this.$router.push('/search')
            this.$emit('update:showSearchBox', false)
            this.searchContent = ''
        },
        // 页面重新获取历史
        getSearchHistory() {
            // 以对象的方式取出
            let searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
            // 有重复的历史就不再存入
            // 存入历史
            this.searchHistory = searchHistory
        },
        // 清空历史
        clearHistory() {
            this.searchHistory = []
            localStorage.removeItem('searchHistory')
        }
    }
}
</script>

<style lang="less" scoped>
.home-searchBox {
    // 登录窗口
    .search-box {
        background: white;
        border-radius: 5px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 750px;
        z-index: 99;

        // 搜索栏
        .search-bar {
            border-radius: 5px 5px 0 0;
            background: url('../assets/image/Searchbackgroun.jpg') no-repeat;
            background-size: cover;
            height: 200px;
            line-height: 200px;
            overflow: hidden;
            position: relative;
            // 搜索遮罩
            .searchInput-barrier {
                padding: 0 50px;
                position: absolute;
                width: 100%;
                backdrop-filter: blur(5px);
            }
        }
        // 搜索历史和热门搜索
        .search-history,
        .search-hot {
            padding: 20px 50px;
            // 标签
            .el-tag {
                margin: 0 10px 10px 0;
                cursor: pointer;
            }
            // 标题
            .history-title,
            .hot-title {
                font-size: 15px;
                margin-bottom: 20px;
                // 图标
                .icon-lishi {
                    margin-right: 5px;
                    color: #409eff;
                }
                .icon-remen {
                    margin-right: 5px;
                    color: #fa2800;
                }
            }
            // 清空历史
            .clearHistory {
                float: right;
                cursor: pointer;
                color: #f56c6c;
                font-size: 14px;
            }
        }
        // 关闭搜索框图标
        .el-icon-close {
            width: 30px;
            height: 30px;
            line-height: 30px;
            background: white;
            cursor: pointer;
            color: #999;
            text-align: center;
            border-radius: 50%;
            position: absolute;
            bottom: -50px;
            left: 50%;
            transform: translate(-50%);
        }
    }
    // 登录屏障
    .searchBox-barrier {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 55;
        backdrop-filter: blur(15px);
    }
}
</style>
