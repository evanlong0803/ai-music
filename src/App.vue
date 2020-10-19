<template>
    <div class="app">
        <el-container>
            <el-header height="70px">
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
                            <el-button type="primary" size="small" @click="openLogin = true">登录</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <keep-alive>
                    <!-- 展示内容 -->
                    <router-view></router-view>
                </keep-alive>
            </el-main>
            <el-footer height="240px">
                <div class="home-bottom">
                    <div class="bottom-title">曲奇云音乐</div>
                    <p>个人项目</p>
                </div>
                <div class="bottom-copyright">
                    <div class="copyright">
                        <span>Copyright © 2020</span>
                        <span> 曲奇云音乐 </span>
                        <span><a href="#">演示站</a></span>
                        <span>Designed by </span>
                        <span><a href="https://123mtr.top">123木头人</a></span>
                    </div>
                </div>
            </el-footer>
        </el-container>
        <Login :openLogin.sync="openLogin" />
    </div>
</template>

<script>
import Login from './views/Login';

export default {
    name: 'app', // 主组件名
    components: {
        Login
    },
    data() {
        return {
            openLogin: false
        };
    },
    methods: {}
};
</script>

<style lang="less">
.app {
    height: 100%;
    // 头部
    .el-header {
        box-shadow: 0 1px 5px #ddd;
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
                    background: #333;
                    color: white;
                    transition: all 0.3s ease 0s;
                }
            }
            // 登录按钮以及搜索
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
    // 底部
    .el-footer {
        background: #161e27;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        .home-bottom {
            width: 1200px;
            margin: 0 auto;
            .bottom-title {
                font-size: 14px;
                font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                color: white;
                padding-left: 10px;
                border-left: 3px solid #fa2800;
                margin-top: 35px;
            }
            p {
                font-size: 14px;
                margin: 15px 0;
                color: white;
            }
        }
        .bottom-copyright {
            color: white;
            border-top: 1px solid #232a31;
            .copyright {
                color: #6d7685;
                font-size: 12px;
                width: 1200px;
                margin: 0 auto;
                padding: 20px 0;
                a {
                    color: #6d7685;
                    text-decoration: none;
                    margin-right: 5px;
                    &:hover {
                        color: white;
                    }
                }
            }
        }
    }
}
</style>
