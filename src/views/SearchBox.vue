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
                <div class="search-history">
                    <div class="history-title">
                        <span class="iconfont icon-lishi"></span>
                        搜索历史
                    </div>
                    <el-tag size="medium" v-for="tag in tags" :key="tag.name" closable :type="tag.type">
                        {{ tag.name }}
                    </el-tag>
                </div>
                <!-- 热搜 -->
                <div class="search-hot">
                    <div class="hot-title">
                        <span class="iconfont icon-remen"></span>
                        热门搜索
                    </div>
                    <el-tag size="medium" v-for="tag in tags" :key="tag.name" :type="tag.type">
                        {{ tag.name }}
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
            // 热搜
            hotSearch: [],
            tags: [
                { name: '标签一', type: '' },
                { name: '标签二', type: 'success' },
                { name: '标签三', type: 'info' },
                { name: '标签四', type: 'warning' },
                { name: '标签五', type: 'danger' }
            ]
        }
    },
    // 接收父组件的数据
    props: ['showSearchBox'],
    created() {
        // 加载热搜
        // this.loadHotSearch()
    },
    methods: {
        close() {
            this.$emit('update:showSearchBox', false)
            this.searchContent = ''
        },
        // 加载热搜
        // async loadHotSearch() {
        //     const { data: res } = await this.$axios.get('/search/hot')
        //     this.hotSearch = res.result.hots.map(item => {
        //         return {
        //             name: item.first
        //         }
        //     })
        //     this.restaurants = this.loadAll()
        // }
        goSearch() {
            if (this.$route.path === '/search') {
                this.$emit('update:showSearchBox', false)
                return // 直接搜索
            }
            this.$router.push('/search')
            this.$emit('update:showSearchBox', false)
        }
    }
}
</script>

<style lang="less" scoped>
.home-searchBox {
    // 登录窗口
    .search-box {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 750px;
        z-index: 99;
        // 标签
        .el-tag {
            margin-right: 10px;
        }
        // 关闭图标
        .el-icon-close {
            width: 30px;
            background: white;
            height: 30px;
            line-height: 30px;
            display: block;
            margin: 20px auto;
            cursor: pointer;
            color: #666;
            text-align: center;
            border-radius: 50%;
        }
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
            background: white;
            padding: 20px 50px;
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
        }
        .search-hot {
            border-radius: 0 0 5px 5px;
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
