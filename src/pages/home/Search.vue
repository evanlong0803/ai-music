<template>
	<div class="search">
		<!-- 背景 -->
		<div class="search-background"></div>
		<!-- 上部分 -->
		<div class="search-top">
			<!-- 搜索框 -->
			<el-input
				placeholder="搜索关键词可以多个,以空格隔开"
				v-model="searchContent"
				@keyup.enter.native="searchSingle"
				clearable
			>
				<el-button
					slot="append"
					icon="el-icon-search"
					@click="searchSingle"
				></el-button>
			</el-input>
		</div>
		<!-- 下部分 -->
		<div class="search-bottom">
			<!-- 搜索结果 -->
			<div class="search-res">
				<!-- 搜索选项 -->
				<span class="options-title">搜索结果</span>
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="单曲" name="single" v-loading="!single.length">
						<el-button
							class="single-allPlay"
							type="primary"
							round
							size="medium"
							icon="el-icon-caret-right"
							@click="allPlay"
						>
							播放全部
						</el-button>
						<!-- 播放列表 -->
						<PlayList :single="single" />
					</el-tab-pane>

					<!-- 搜索歌手 -->
					<el-tab-pane label="歌手" name="singer">
						<singers :singer="singer" />
					</el-tab-pane>

					<!-- 搜索专辑 -->
					<el-tab-pane label="专辑" name="album">
						<Albums :album="album" />
					</el-tab-pane>

					<!-- 搜索视频 -->
					<el-tab-pane label="视频" name="video">
						<Videos :video="video" />
					</el-tab-pane>

					<!-- 搜索歌单 -->
					<el-tab-pane label="歌单" name="songSheet">
						<SongSheets :songSheet="songSheet" />
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>

<script>
import PlayList from '../../components/detail/PlayList';
import Videos from '../../components/detail/Videos';
import SongSheets from '../../components/detail/SongSheets';
import singers from '../../components/detail/singers';
import Albums from '../../components/detail/Albums';
export default {
	name: 'search',
	components: {
		PlayList,
		Videos,
		SongSheets,
		singers,
		Albums,
	},
	data() {
		return {
			// 动态切换组件
			activeName: 'single',
			// 搜索内容
			searchContent: '',
			// 单曲
			single: [],
			// 歌手
			singer: [],
			// 专辑
			album: [],
			// 视频
			video: [],
			// 歌单
			songSheet: [],
			// 搜索历史
			searchHistory: [],
		};
	},
	created() {
		// 监听SearchBox组件的自定义事件
		this.getAction();
		// 取临时历史
		this.getTempHistory();
	},
	methods: {
		// 监听SearchBox组件的自定义事件
		getAction() {
			this.$root.$on('getAction', () => {
				// 取出临时记录
				this.getHistory();
				// 搜索单曲
				this.searchSingle();
			});
		},
		// 搜索单曲
		async searchSingle() {
			if (this.searchContent === '' || this.searchContent.startsWith(' ')) {
				return this.$notify({
					title: '消息',
					message: '搜索内容前不能有空格',
					type: 'warning',
					position: 'top-left',
				});
			}
			sessionStorage.setItem('searchContent', this.searchContent);
			// 搜索时默认显示单曲选项
			this.activeName = 'single';
			const { data: res } = await this.$api.searchSingle(this.searchContent);
			if (res.code !== 200) {
				return this.$message.error('搜索单曲失败');
			}
			this.single = res.result.songs;
			// 定义音乐ID
			let singleID = res.result.songs.map((item) => {
				return item.id;
			});
			// 加载音乐URL
			this.loadMusicURL(singleID);
			this.saveSearchHistory();
		},
		// 搜索歌手
		async searchSinger() {
			const { data: res } = await this.$api.searchSinger(this.searchContent);
			if (res.code !== 200) {
				return this.$message.error('搜索歌手失败');
			}
			this.singer = res.result.artists;
		},
		// 搜索专辑
		async searchAlbum() {
			const { data: res } = await this.$api.searchAlbum(this.searchContent);
			if (res.code !== 200) {
				return this.$message.error('搜索专辑失败');
			}
			this.album = res.result.albums;
		},
		// 搜索视频
		async searchVideo() {
			const { data: res } = await this.$api.searchVideo(this.searchContent);
			if (res.code !== 200) {
				return this.$message.error('搜索视频失败');
			}
			this.video = res.result.videos;
		},
		// 搜索歌单
		async searchSongSheet() {
			const { data: res } = await this.$api.searchSongSheet(this.searchContent);
			if (res.code !== 200) {
				return this.$message.error('搜索视频失败');
			}
			this.songSheet = res.result.playlists;
		},
		// 取出临时记录
		getHistory() {
			let searchContent = sessionStorage.getItem('searchContent');
			// 临时记录和之前的不一样
			if (this.searchContent !== searchContent) {
				this.searchContent = searchContent;
			}
		},
		// 标签页点击
		handleClick(tab) {
			switch (tab.name) {
				// 单曲
				case 'single':
					// 取出临时记录
					this.getHistory();
					// 搜索单曲
					this.searchSingle();
					break;
				// 歌手
				case 'singer':
					// 取出临时记录
					this.getHistory();
					// 搜索歌手
					this.searchSinger();
					break;
				// 专辑
				case 'album':
					// 取出临时记录
					this.getHistory();
					// 搜索专辑
					this.searchAlbum();
					break;
				// 视频
				case 'video':
					// 取出临时记录
					this.getHistory();
					// 搜索视频
					this.searchVideo();
					break;
				// 歌单
				case 'songSheet':
					// 取出临时记录
					this.getHistory();
					// 搜索歌单
					this.searchSongSheet();
					break;
			}
		},
		// 加载音乐URL
		async loadMusicURL(trackIds) {
			const trackId = trackIds.join(',');
			const { data: res } = await this.$api.getMusicURL(trackId);
			if (res.code !== 200) {
				return this.$message.error('音乐URL请求失败');
			}
			// 储存每首音乐的RUL
			let musicURL = res.data.map((item) => {
				return { url: item.url, id: item.id };
			});
			// 将每一个音乐URL放入对象属性中
			for (const i in musicURL) {
				for (const j in this.single) {
					// 如果歌单与歌单URL的ID一致，就把URL加入到对应的歌单中
					if (this.single[j].id === musicURL[i].id) {
						this.$set(this.single[j], 'url', musicURL[i].url);
					}
				}
			}
		},
		// 全部播放
		allPlay() {
			// 重新定义播放器对象结构
			let allSong = this.single.map((item) => {
				return {
					name: item.name,
					artist: item.ar[0].name,
					url: item.url,
					cover: item.al.picUrl,
				};
			});
			// 传递当前歌单所有歌曲
			this.$root.$emit('updata:getAllSong', allSong);
		},
		// 取临时的搜索历史
		getTempHistory() {
			let searchContent = sessionStorage.getItem('searchContent');
			this.searchContent = searchContent;
			this.searchSingle();
		},
		// 存储用户搜索历史
		saveSearchHistory() {
			// 取出数组
			let searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
			this.searchHistory = searchHistory;
			// 没有重复的历史就存入
			if (this.searchHistory.indexOf(this.searchContent) === -1) {
				// 把搜索内容添加到搜索历史当中
				this.searchHistory.push(this.searchContent);
				// 以字符串的方式存入
				localStorage.setItem(
					'searchHistory',
					JSON.stringify(this.searchHistory)
				);
			}
		},
	},
};
</script>

<style lang="less">
.search {
	width: 100%;
	// 背景
	.search-background {
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
	.search-top {
		height: 250px;
		width: 720px;
		display: flex;
		align-items: center;
		margin: 0 auto;
		// 搜索框
		.el-input__inner {
			border: none;
			height: 50px;
			border-radius: 3px 0 0 3px;
		}
	}
	// 下部分
	.search-bottom {
		width: 100%;
		min-height: 617px;
		background: white;
		// 搜索结果
		.search-res {
			width: 1200px;
			margin: 0 auto;
			padding: 30px 0;
			// 选项标题
			.options-title {
				font-size: 22px;
				font-weight: 600;
				line-height: 40px;
				color: #4a4a4a;
				float: left;
				margin-right: 40px;
			}
			// 标签页
			.el-tabs__header {
				margin-bottom: 30px;
			}
			// 单曲全部播放
			.single-allPlay {
				float: right;
				margin-bottom: 20px;
			}
			// 歌手
			.search-singer {
				cursor: pointer;
				text-align: center;
				.singer-img {
					width: 100px;
					height: 100px;
					border-radius: 50%;
					border: 1px solid #ccc;
				}
				.singer-name {
					font-size: 14px;
					font-weight: bold;
					margin: 10px 0 30px 0;
				}
			}
		}
	}
}
</style>
