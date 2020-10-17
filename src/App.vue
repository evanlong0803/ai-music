<template>
    <div class="app">
        <el-container>
            <el-header>
                <el-row class="home-top" style="width: 1200px;" type="flex" align="middle">
                    <el-col :span="3">
                        <div class="home-logo">
                            <img src="./assets/logo.png" />
                            <span>曲奇云音乐</span>
                        </div>
                    </el-col>
                    <el-col :span="19">
                        <nav class="home-nav">
                            <!-- router-link默认被解析为a标签 -->
                            <router-link to="/find" exact-active-class="click">发现音乐</router-link>
                            <router-link to="/rank" exact-active-class="click">排行榜</router-link>
                            <router-link to="/songlist" exact-active-class="click">歌单</router-link>
                            <router-link to="/vocalists" exact-active-class="click">歌手</router-link>
                            <router-link to="/video" exact-active-class="click">视频</router-link>
                            <router-link to="/mv" exact-active-class="click">MV</router-link>
                        </nav>
                    </el-col>
                    <el-col :span="2">
                        <div class="home-login">
                            <a href="#"><i class="el-icon-search"></i></a>
                            <el-button type="primary" size="small" @click="homeLogin = true">登录</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <keep-alive>
                    <!-- 展示内容 -->
                    <router-view></router-view>
                </keep-alive>
                <!-- 登录界面 -->
                <el-collapse-transition>
                    <el-card class="box-card" v-if="homeLogin">
                        <i class="el-icon-close" @click="homeLogin = false"></i>
                    </el-card>
                </el-collapse-transition>
            </el-main>
        </el-container>
    </div>
</template>

<script>
// import Home from './components/Home.vue';

export default {
    name: 'app', // 主组件名
    components: {
        // Home
    },
    data() {
        return {
            homeLogin: false
        };
    },
    methods: {}
};
</script>

<style lang="less">
.app {
    width: 100%;
    height: 100%;
    .el-container {
        height: 100%;
        width: 100%;
        // 头部
        .el-header {
            width: 100%;
            min-height: 70px;
            // 顶部栏
            .home-top {
                height: 100%;
                width: 100%;
                margin: 0 auto;
                color: #333;
                // logo
                .home-logo {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    img {
                        height: 30px;
                    }
                    span {
                        color: #505050;
                        font-weight: bold;
                        margin-left: 5px;
                    }
                }
                // 导航
                .home-nav {
                    a {
                        color: #333;
                        text-decoration: none;
                        padding: 7px 20px;
                        border-radius: 3px;
                        font-size: 14px;
                    }
                    .click {
                        background: #ff6600;
                        color: white;
                        transition: all 0.3s ease 0s;
                    }
                }
                // 登录
                .home-login {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    color: #909399;
                    a {
                        color: #909399;
                        border-right: 1px solid #909399;
                        padding-right: 10px;
                    }
                }
            }
        }
        // 内容
        .el-main {
            background-color: #e9eef3;
            color: #333;
            .box-card {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 500px;
                height: 300px;
                i {
                    float: right;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
