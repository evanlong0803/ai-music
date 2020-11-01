<template>
    <div>
        搜索页面
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    created() {
        // 监听SearchBox事件
        this.getAction()
    },
    methods: {
        // 请求搜索结果
        async Search() {
            const { data: res } = await this.$axios.post('/search', {
                keywords: this.searchContent,
                type: 1018
            })
            if (res.code !== 200) {
                return this.$message.error('搜索失败')
            }
        },
        // 监听SearchBox事件
        getAction() {
            this.$root.$on('getAction', () => {
                let searchContent = sessionStorage.getItem('searchContent')
                console.log(searchContent)
            })
        }
    }
}
</script>

<style></style>
