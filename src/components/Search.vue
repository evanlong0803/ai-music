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
        // 获取搜索结果
        this.getSearchRes()
    },
    methods: {
        // 获取搜索结果
        getSearchRes() {
            this.$root.$on('getSearchRes', SearchRes => {
                let searchContent = sessionStorage.getItem('searchContent')
                console.log(SearchRes, searchContent)
            })
        }
    }
}
</script>

<style></style>
