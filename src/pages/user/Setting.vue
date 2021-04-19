<template>
    <div class="setting">
        <h2>个人设置</h2>
        <el-tabs type="border-card">
            <el-tab-pane label="基本设置">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="small">
                    <!-- 头像功能暂未完成 -->
                    <el-form-item label="修改头像">
                        <el-upload
                            class="avatar-uploader"
                            :action="uploadUrl()"
                            :headers="{
                                'Content-Type': 'multipart/form-data'
                            }"
                            :data="updata()"
                            with-credentials
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <el-tooltip class="item" effect="dark" content="点我修改头像" placement="right">
                                <img v-if="ruleForm.avatarUrl" :src="ruleForm.avatarUrl" class="avatar" />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-tooltip>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="昵称" prop="nickname">
                        <el-input v-model="ruleForm.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="介绍">
                        <el-input
                            type="textarea"
                            v-model="ruleForm.signature"
                            maxlength="300"
                            show-word-limit
                            :autosize="{ minRows: 4, maxRows: 6 }"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="ruleForm.gender">
                            <el-radio :label="0">保密</el-radio>
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="2">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="绑定设置">开发中</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: '基本设置',
            // 用户ID
            userId: null,
            // 用户详情
            ruleForm: {
                // 用户头像
                avatarUrl: '',
                // 介绍
                signature: '',
                // 昵称
                nickname: '',
                // 性别
                gender: 0
            },
            rules: {
                nickname: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    {
                        pattern: /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
                        message: '只含有汉字、数字、字母、下划线不能以下划线开头和结尾',
                        trigger: 'blur'
                    },
                    { min: 3, max: 16, message: '用户名长度应为3～16个字符', trigger: 'blur' }
                ]
            }
        };
    },
    created() {
        this.userId = this.$route.query.userId;
        let cookie = localStorage.getItem('cookie');
        // 加载用户详情
        this.loadUserDetail(cookie);
    },
    methods: {
        // 更新头像
        uploadUrl() {
            let cookie = localStorage.getItem('cookie');
            return `https://musicapi.123mtr.top/avatar/upload?cookie=${cookie}`;
        },
        // 携带额外参数
        updata(file) {
            var formData = new FormData();
            formData.append('imgFile', file);
            return {
                formData
            };
        },
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
            this.ruleForm = res.profile;
        },
        // 保存
        submitForm(formName) {
            let cookie = localStorage.getItem('cookie');
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    const { data: res } = await this.$api.get('/user/update', {
                        params: {
                            // 介绍
                            signature: this.ruleForm.signature,
                            // 昵称
                            nickname: this.ruleForm.nickname,
                            // 性别
                            gender: this.ruleForm.gender,
                            cookie
                        }
                    });
                    if (res.code !== 200) {
                        return this.$message.error('更新失败');
                    }
                    this.$notify({
                        title: '更新成功',
                        message: `数据更新时间较为缓慢，5秒后跳转至首页`,
                        type: 'success',
                        position: 'top-left'
                    });
                    setTimeout(() => {
                        if (this.$route.path === '/') return;
                        this.$router.push('/');
                    }, 5000);
                } else {
                    return false;
                }
            });
        },
        handleAvatarSuccess(res, file) {
            this.ruleForm.avatarUrl = URL.createObjectURL(file.raw);
            console.log('头像更新成功');
        },
        async beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式！');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB！');
            }

            return isJPG && isLt2M;
        }
    }
};
</script>

<style lang="less">
.setting {
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
    h2 {
        margin-bottom: 30px;
        color: #4a4a4a;
    }
    .el-tabs__content {
        width: 50%;
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            &:hover {
                border-color: #409eff;
                opacity: 0.7;
                transition: all 1s ease;
            }
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 100px;
            height: 100px;
            line-height: 100px;
            text-align: center;
        }
        .avatar {
            width: 100px;
            height: 100px;
            display: block;
        }
    }
    .el-button {
        float: right;
    }
}
</style>
