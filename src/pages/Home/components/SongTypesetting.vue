<script setup>
defineProps({
	title: String,
	playLists: Array,
});
</script>

<template>
	<div class="title">{{ title }}</div>
	<n-grid :x-gap="20" :y-gap="8" :cols="5">
		<n-grid-item v-for="item in playLists">
			<div class="song-sheet">
				<img class="cover" :src="item.picUrl" :alt="item.name" />
				<div class="name">{{ item.name }}</div>
				<div class="playCount">{{ item.playCount }}</div>
			</div>
		</n-grid-item>
	</n-grid>
</template>

<style lang="less" scoped>
.title {
	font-weight: bold;
	font-size: 24px;
	margin-bottom: 14px;
}
.song-sheet {
	position: relative;
	.cover {
		width: 100%;
		height: 100%;
		border-radius: 10px;
		cursor: pointer;
	}
	.name {
		font-weight: bold;
		font-size: 17px;
	}
	.playCount {
		position: absolute;
		top: 10px;
		left: 10px;
		color: #fff;
		background: #ffffff0d;
		backdrop-filter: blur(15px);
		padding: 0 5px;
		border-radius: 5px;
		border: 1px solid #ffffff0d;
	}
}
</style>
