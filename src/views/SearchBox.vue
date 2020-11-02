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
                    </div>
                    <el-tag
                        size="medium"
                        v-for="(item, index) in searchHistory"
                        :key="index"
                        @close="handleClose(item)"
                        @click="searchTag(item)"
                        :disable-transitions="false"
                        closable
                    >
                        {{ item }}
                    </el-tag>
                </div>
                <!-- 热搜 -->
                <div class="search-hot">
                    <div class="hot-title">
                        <span class="iconfont icon-remen"></span>
                        热门搜索
                    </div>
                    <el-tag size="medium" v-for="(item, index) in hotSearch" :key="index" @click="searchTag(item)" type="warning">
                        {{ item }}
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
            hotSearch: [],
            // 显示搜索历史
            showHistory: false
        }
    },
    // 接收父组件的数据
    props: ['showSearchBox'],
    created() {
        // 请求热搜
        this.loadHotSearch()
    },
    methods: {
        // 当搜索历史被点击的时候
        searchTag(item) {
            this.searchContent = item
            // 开始搜索
            this.goSearch()
        },
        // 关闭搜索框
        close() {
            this.$emit('update:showSearchBox', false)
        },
        // 请求热搜
        async loadHotSearch() {
            const { data: res } = await this.$axios.get('/search/hot')
            this.hotSearch = res.result.hots.map(item => {
                return item.first
            })
        },
        // 存储用户搜索历史
        saveSearchHistory() {
            // 没有重复的历史就存入
            if (this.searchHistory.indexOf(this.searchContent) < 0) {
                // 把搜索内容添加到搜索历史当中
                this.searchHistory.push(this.searchContent)
                // 以字符串的方式存入
                localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
                // 取出数组
                let searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
                // 存入历史
                this.searchHistory = searchHistory
            }
        },
        // 回车搜索
        goSearch() {
            if (this.searchContent === '' || this.searchContent.startsWith(' ')) {
                return this.$notify({
                    title: '消息',
                    message: '搜索内容前不能有空格',
                    type: 'warning',
                    position: 'top-left'
                })
            }
            // 存储用户搜索历史
            this.saveSearchHistory()
            // 存储搜索内容
            sessionStorage.setItem('searchContent', this.searchContent)
            // 已经是搜索页就不跳转页面
            if (this.$route.path === '/search') {
                // 触发事件（由Search组件接收）
                this.$root.$emit('getAction')
                return this.close()
            }
            this.$router.push('/search')
            // 触发事件（由Search组件接收）
            this.$root.$emit('getAction')
            this.close()
        },
        // 删除一个历史
        handleClose(item) {
            // 找数组中的索引
            let arrIndex = this.searchHistory.indexOf(item)
            let searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
            // 找到存储中的索引
            let localIndex = searchHistory.indexOf(item)
            // 如果都存在就删除
            if (localIndex !== -1 && localIndex !== -1) {
                this.searchHistory.splice(arrIndex, 1)
                searchHistory.splice(localIndex, 1)
                localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
            }
        },
        // 清空历史
        clearHistory() {
            localStorage.removeItem('searchHistory')
            this.searchHistory = []
        }
    },
    watch: {
        // 搜索每次被打开的时候都重新获取一下历史
        showSearchBox() {
            if (this.showSearchBox) {
                // 清空搜索内容
                this.searchContent = ''
                // 取出数组
                let searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
                // 历史为空的时候就停止
                if (searchHistory === null) return
                // 存入历史
                this.searchHistory = searchHistory
            }
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
