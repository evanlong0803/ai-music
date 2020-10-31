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
                console.log(SearchRes)
            })
        }
    }
}
</script>

<style></style>
