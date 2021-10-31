<template>
	<n-layout-content position="absolute" style="top: 64px; bottom: 64px" :native-scrollbar="false">
		<div class="app-main">
			<router-view />
		</div>
	</n-layout-content>
</template>

<style lang="less" scoped>
.app-main {
	width: 80%;
	margin: 0 auto;
}
</style>
