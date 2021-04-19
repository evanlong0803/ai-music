<template>
    <div class="personal">
        <div class="personal-background"></div>
        <!-- 上部分 -->
        <div class="personal-top"></div>
        <div class="personal-bottom">
            <div>
                <el-card class="personal-left">
                    <!-- 创建的歌单 -->
                    <div v-if="createdSongSheet.length">
                        <div class="title">我创建的歌单</div>
                        <SongSheets :createdSongSheet="createdSongSheet" />
                    </div>

                    <div v-if="collectSongSheet.length">
                        <!-- 收藏的歌单 -->
                        <div class="title">我收藏的歌单</div>
                        <SongSheets :collectSongSheet="collectSongSheet" />
                    </div>
                </el-card>
                <el-card class="personal-right">
                    <!-- 上部分 -->
                    <div class="right-top"></div>
                    <!-- 下部分 -->
                    <div class="right-bottom">
                        <div class="bottom-header">
                            <el-avatar shape="square" :size="60" :src="(userDetail.profile || {}).avatarUrl"></el-avatar>
                            <span class="title">{{ (userDetail.profile || {}).nickname }}</span>
                            <el-button type="primary" size="mini" round @click="goSignIn" :disabled="signIn" v-if="independent">
                                {{ signIn ? '已签到' : '签到' }}
                            </el-button>
                        </div>
                        <ul class="bottom-info">
                            <li>等级：<i :class="`iconfont icon-icon-test${userDetail.level}`"></i></li>
                            <li>生日： {{ (userDetail.profile || {}).birthday | timeStampTwo }}</li>
                            <!-- 地区：{{ (userDetail.profile || {}).province }} {{ (userDetail.profile || {}).city }} -->
                            <li>地区：{{ (regionProvince || {}).region }} {{ regionCity }}</li>
                        </ul>
                        <div class="bottom-trend">
                            <span>
                                <div>动态</div>
                                <div>{{ (userDetail.profile || {}).eventCount }}</div>
                            </span>
                            <span>
                                <div>关注</div>
                                <div>{{ (userDetail.profile || {}).follows }}</div>
                            </span>
                            <span>
                                <div>粉丝</div>
                                <div>{{ (userDetail.profile || {}).followeds }}</div>
                            </span>
                        </div>
                        <div class="bottom-button" v-if="independent">
                            <el-button type="danger" size="medium" @click="goSetting(userId)">个人设置</el-button>
                            <el-button type="danger" size="medium" @click="goGrade">我的等级</el-button>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import SongSheets from '../../components/detail/SongSheets';
// 城市数据
import region from '../../utils/region';

export default {
    components: {
        SongSheets
    },
    data() {
        return {
            region,
            // 用户ID
            userId: null,
            // 用户详情
            userDetail: {},
            // 创建的歌单
            createdSongSheet: [],
            // 收藏的歌单
            collectSongSheet: [],
            // 是否签到
            signIn: false,
            // 个人专属
            independent: null
        };
    },
    computed: {
        // 获得省份
        regionProvince() {
            this.region.forEach(item => {
                if (item.code == (this.userDetail.profile || {}).province) {
                    (this.userDetail.profile || {}).province = item;
                }
            });
            return (this.userDetail.profile || {}).province;
        },
        // 获得城市
        regionCity() {
            // 拿到省份数据
            let one = this.regionProvince || {}; // 此处必须加分号
            // 拿到市
            (one.regionEntitys || []).forEach(item => {
                if (item.code == (this.userDetail.profile || {}).city) {
                    (this.userDetail.profile || {}).city = item.region;
                }
            });
            return (this.userDetail.profile || {}).city;
        }
    },
    created() {
        this.userId = this.$route.query.userId;
        this.independent = this.$route.query.independent;
        let cookie = localStorage.getItem('cookie');
        // 加载用户详情
        this.loadUserDetail(cookie);
        // 加载用户歌单
        this.loadUserSong(cookie);
    },
    methods: {
        // 加载用户详情
        async loadUserDetail(cookie) {
            const { data: res } = await this.$api.get('/user/detail', {
                params: {
                    uid: this.userId,
                    cookie
                }
            });
            if (res.code !== 200) {
                return this.$message.error('请求失败');
            }
            this.userDetail = res;
            // 如果已经签到
            if (res.pcSign) {
                this.signIn = true;
            }
        },
        // 加载用户歌单
        async loadUserSong(cookie) {
            const { data: res } = await this.$api.get('/user/playlist', {
                params: {
                    uid: this.userId,
                    cookie,
                    timestamp: Date.now()
                }
            });
            if (res.code !== 200) {
                return this.$message.error('请求失败');
            }
            // 如果不是收藏的歌单
            res.playlist.forEach(item => {
                if (!item.subscribed) {
                    this.createdSongSheet.push(item);
                }
            });
            // 如果是收藏的歌单
            res.playlist.forEach(item => {
                if (item.subscribed) {
                    this.collectSongSheet.push(item);
                }
            });
        },
        // 签到
        async goSignIn() {
            let cookie = localStorage.getItem('cookie');
            const { data: res } = await this.$api.post('/daily_signin', {
                type: 1,
                cookie
            });
            if (res.code !== 200) {
                return this.$message.error('签到失败');
            }
            this.signIn = true;
            // 更新用户详情
            this.loadUserDetail();
            this.$notify({
                title: '消息',
                message: '签到成功',
                position: 'top-left',
                type: 'success'
            });
        },
        // 跳转我的等级
        goGrade() {
            return this.$notify({
                title: '消息',
                message: '“我的等级” 现处于开发状态',
                type: 'info'
            });
            // if (this.$route.path === '/grade') return
            // this.$router.push('/grade')
        },
        // 跳转个人设置
        goSetting(userId) {
            if (this.$route.path === '/setting') return;
            this.$router.push({ path: '/setting', query: { userId } });
        }
    }
};
</script>

<style lang="less" scoped>
.personal {
    width: 100%;
    // 背景
    .personal-background {
        margin-top: 70px;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: -10;
        background: url('../../assets/image/Searchbackgroun.jpg') no-repeat;
        background-size: cover;
    }
    // 上部分
    .personal-top {
        height: 300px;
    }
    // 下部分
    .personal-bottom {
        background: white;
        display: flex;
        justify-content: center;
        > div {
            display: flex;
            padding: 20px 0;
        }
        // 左边
        .personal-left {
            width: 1200px;
            .title {
                border-left: 3px solid #409eff;
                padding-left: 15px;
                font-size: 15px;
                font-weight: bold;
                margin-bottom: 20px;
            }
        }
        // 右边
        .personal-right {
            border: none;
            margin-left: 20px;
            height: 450px;
            width: 350px;
            margin-top: -100px;
            background-size: cover;
            overflow: hidden;

            .right-top {
                height: 150px;
                background: url('https://p1.music.126.net/_f8R60U9mZ42sSNvdPn2sQ==/109951162868126486.jpg') no-repeat;
                margin: -20px -20px 0;
            }
            .right-bottom {
                height: 280px;
                background: white;
                .bottom-header {
                    padding: 0 20px;
                    font-size: 15px;
                    font-weight: bold;
                    display: flex;
                    align-items: flex-end;
                    position: relative;
                    top: -20px;
                    .el-button {
                        position: absolute;
                        right: 20px;
                    }
                    .el-avatar {
                        margin-right: 15px;
                    }
                }
                .bottom-info {
                    padding: 0 20px 20px 20px;
                    li {
                        height: 34px;
                        list-style-type: none;
                        font-size: 14px;
                        line-height: 34px;
                        i {
                            color: #e6a23c;
                            font-size: 20px;
                            vertical-align: middle;
                        }
                        &::before {
                            content: '💎';
                            color: #409eff;
                            margin-right: 5px;
                            font-size: 14px;
                        }
                    }
                }
                .bottom-trend {
                    display: flex;
                    justify-content: space-evenly;
                    text-align: center;
                    font-size: 14px;
                    color: #666;
                }
                .bottom-button {
                    padding: 20px;
                    text-align: center;
                    .el-button {
                        margin: 0 10px;
                    }
                }
            }
        }
    }
}
</style>
