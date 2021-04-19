<template>
	<div class="detail">
		<el-row :gutter="20">
			<!-- 左侧 -->
			<el-col :span="17">
				<!-- 左侧卡片 -->
				<el-card class="left-card">
					<!-- 左侧上部分 -->
					<el-row class="card-top">
						<el-col :span="7">
							<el-image
								class="top-left-img"
								:src="detail.blurPicUrl"
								fit="cover"
							>
								<div slot="placeholder" class="image-slot"></div>
								<div slot="error" class="image-slot"></div>
							</el-image>
						</el-col>
						<el-col :span="17">
							<div class="top-right">
								<h2 class="top-right-title">{{ detail.name }}</h2>
								<div class="top-right-release">
									<el-image
										class="release-avatar"
										:src="(detail.artist || {}).picUrl"
										fit="cover"
									>
									</el-image>
									<div class="release-name">
										{{ (detail.artist || {}).name }}
									</div>
									<div class="release-time">
										发行时间：{{ detail.publishTime | timeStampTwo }}
									</div>
								</div>
								<div class="release-company">
									发行公司：{{ detail.company }}
								</div>
								<div class="release-description">{{ detail.description }}</div>
								<el-link
									type="danger"
									:underline="false"
									@click="descriptionDialog = true"
								>
									全部<i class="el-icon-arrow-right"></i>
								</el-link>
							</div>
						</el-col>
					</el-row>
					<!-- 左侧下部分 -->
					<div class="card-bottom">
						<div class="bottom-button">
							<el-button
								type="primary"
								round
								size="medium"
								icon="el-icon-caret-right"
								@click="allPlay"
								>播放全部</el-button
							>
						</div>
						<!-- 播放歌单 -->
						<div class="bottom-song" v-loading="!albumDetail.length">
							<PlayList :albumDetail="albumDetail" />
						</div>
					</div>
				</el-card>
			</el-col>
			<!-- 右侧 -->
			<el-col :span="7">
				<!-- 热门专辑 -->
				<el-card class="right-card" shadow="hover">
					<div class="card-title">热门专辑</div>
					<div
						class="card-recommend"
						v-for="(item, index) in hotAlbum"
						:key="index"
						@click="reload(item.id)"
					>
						<div class="recommend-left">
							<el-image
								class="recommend-avatar"
								:src="item.picUrl"
								fit="cover"
							></el-image>
						</div>
						<div class="recommend-right">
							<div class="recommend-title">{{ item.name }}</div>
							<div class="recommend-name">By. {{ item.artist.name }}</div>
						</div>
					</div>
				</el-card>
				<!-- 精彩评论 -->
				<el-card class="right-card" shadow="hover">
					<div class="card-title">精彩评论</div>
					<div
						class="card-comments"
						v-for="(item, index) in hotComments"
						:key="index"
					>
						<!-- 左侧 -->
						<div class="comments-left">
							<el-avatar :size="40" :src="item.user.avatarUrl"></el-avatar>
						</div>
						<!-- 右侧 -->
						<div class="comments-right">
							<div class="right-name">
								{{ item.user.nickname }}
								<span>{{ item.time | time }}</span>
							</div>
							<div class="right-content">{{ item.content }}</div>
						</div>
					</div>
				</el-card>
			</el-col>
			<!-- 查看全部描述对话框 -->
			<el-dialog
				:title="detail.name"
				:visible.sync="descriptionDialog"
				width="30%"
			>
				<pre class="dialog-content">{{ detail.description }}</pre>
			</el-dialog>
		</el-row>
	</div>
</template>

<script>
import PlayList from '../../components/detail/PlayList';
export default {
	components: {
		PlayList,
	},
	data() {
		return {
			// 歌单ID
			albumId: '',
			// 专辑信息
			detail: {},
			// 热门专辑
			hotAlbum: [],
			// 精彩评论
			hotComments: [],
			// 专辑歌曲详情
			albumDetail: [],
			// 音乐URL
			musicURL: [],
			// 歌词
			songLyrics: [],
			// 查看全部描述对话框
			descriptionDialog: false,
			// 自定义索引
			indexMethod(index) {
				return index + 1 < 10 ? '0' + (index + 1) : index + 1;
			},
		};
	},
	created() {
		this.albumId = this.$route.query.id;
		this.loadAlbumContent();
		this.loadComments();
	},
	methods: {
		// 加载专辑内容
		async loadAlbumContent() {
			const { data: res } = await this.$api.getAlbum(this.albumId);
			if (res.code !== 200) {
				return this.$message.error('专辑内容请求失败');
			}
			this.albumDetail = res.songs;
			this.detail = res.album;
			// 储存音乐ID
			let trackIds = res.songs.map((item) => {
				return item.id;
			});
			this.loadSongDetail(trackIds);
			// 加载热门专辑
			this.loadHotAlbum(res.album.artist);
		},
		// 加载热门专辑
		async loadHotAlbum(item) {
			const { data: res } = await this.getHotAlbum(item.id);
			if (res.code !== 200) {
				return this.$message.error('热门专辑请求失败');
			} else if (res.hotAlbums.length >= 5) {
				res.hotAlbums.length = 5;
			}
			this.hotAlbum = res.hotAlbums;
		},
		// 加载精彩评论
		async loadComments() {
			const { data: res } = await this.getComments(this.albumId);
			if (res.code !== 200) {
				return this.$message.error('精彩评论请求失败');
			}
			// 如果没有精彩评论就给普通评论
			this.hotComments =
				res.hotComments.length === 0 ? res.comments : res.hotComments;
		},
		// 加载歌曲详情
		async loadSongDetail(trackIds) {
			// 限制数量
			if (trackIds.length >= 200) {
				trackIds.length = 200;
			}
			const trackId = trackIds.join(',');
			const { data: res } = await this.$api.get(trackId);
			if (res.code !== 200) {
				return this.$message.error('歌曲详情请求失败');
			}
			this.albumDetail = res.songs;
			this.loadMusicURL(trackIds);
		},
		// 加载音乐URL
		async loadMusicURL(trackIds) {
			// 限制数量
			if (trackIds.length >= 200) {
				trackIds.length = 200;
			}
			const trackId = trackIds.join(',');
			const { data: res } = await this.getMusicURL(trackId);
			if (res.code !== 200) {
				return this.$message.error('音乐URL请求失败');
			}
			// 储存每首音乐的RUL
			let musicURL = res.data.map((item) => {
				return { url: item.url, id: item.id };
			});
			// 将每一个音乐URL放入对象属性中
			for (const i in musicURL) {
				for (const j in this.albumDetail) {
					// 如果歌单与歌单URL的ID一致，就把URL加入到对应的歌单中
					if (this.albumDetail[j].id === musicURL[i].id) {
						this.$set(this.albumDetail[j], 'url', musicURL[i].url);
					}
				}
			}
		},
		// 全部播放
		allPlay() {
			// 重新定义播放器对象结构
			let allSong = this.albumDetail.map((item) => {
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
		// 重新跳转详情
		reload(id) {
			// 防止出现路由冗余
			if (this.albumId === id) return;
			this.albumId = id;
			this.$router.push(`/albumdetail?id=${id}`);
			this.loadAlbumContent();
			this.loadComments();
		},
	},
};
</script>

<style lang="less" scoped>
.detail {
	width: 1200px;
	margin: 0 auto;
	padding: 20px 0;
	// 左边
	.left-card {
		height: 100%;
		border-radius: 10px;
		// 左侧上部分
		.card-top {
			.top-left-img {
				width: 200px;
				height: 200px;
				border-radius: 8px;
				box-shadow: 5px 5px 5px #999;
				.image-slot {
					width: inherit;
					height: inherit;
					display: flex;
					justify-content: center;
					align-items: center;
					background: url('../../assets/image/rainbow.png') no-repeat;
					background-size: cover;
				}
			}

			.top-right {
				height: 200px;
				display: flex;
				flex-flow: column nowrap;
				align-items: flex-start;
				justify-content: space-between;
				.top-right-title {
					color: #4a4a4a;
				}

				.top-right-release {
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					justify-content: flex-start;
					.release-avatar {
						width: 30px;
						height: 30px;
						border-radius: 50%;
						margin-right: 10px;
					}
					.release-name {
						color: #f56c6c;
						font-size: 14px;
						margin-right: 20px;
					}
					.release-time {
						font-size: 14px;
						color: #999;
					}
				}
				// 发行信息
				.release-company,
				.release-description {
					width: 70%;
					font-size: 14px;
					color: #4a4a4a;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
		// 左侧下部分
		.card-bottom {
			.bottom-button {
				margin: 20px 0;
				text-align: right;
			}
			.bottom-song {
				width: 100%;
				height: 100%;
				// 歌曲样式
				.songName {
					width: 100%;
					display: flex;
					align-items: center;
					div {
						width: 70%;
						margin-left: 10px;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
		}
	}
	// 右边
	.right-card {
		border-radius: 10px;
		height: 100%;
		margin-bottom: 20px;
		.card-title {
			font-size: 15px;
			font-weight: bold;
			padding-left: 10px;
			border-left: 3px solid #409eff;
			margin-bottom: 20px;
		}

		// 相关推荐
		.card-recommend {
			width: 100%;
			height: 50px;
			display: flex;
			align-items: center;
			margin-top: 20px;

			// 左边
			.recommend-left {
				width: 50px;
				height: 100%;
				margin-right: 20px;
				.recommend-avatar {
					width: 50px;
					height: 50px;
					border-radius: 5px;
					cursor: pointer;
				}
			}
			// 右边
			.recommend-right {
				cursor: pointer;
				width: 220px;
				.recommend-title {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 15px;
					font-weight: bold;
					margin-bottom: 10px;
					&:hover {
						color: #f56c6c;
					}
				}
				.recommend-name {
					font-size: 12px;
					color: #999;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}

		// 精彩评论
		.card-comments {
			height: 100%;
			display: flex;
			margin-top: 30px;

			.comments-left {
				margin-right: 12px;
				cursor: pointer;
			}
			.comments-right {
				.right-name {
					font-size: 15px;
					font-weight: bold;
					margin-bottom: 10px;
					cursor: pointer;
					span {
						font-size: 12px;
						font-weight: normal;
						color: #999;
						margin-left: 5px;
					}
				}
				.right-content {
					background: #f5f5f5;
					border-radius: 5px;
					font-size: 12px;
					padding: 5px 10px;
					line-height: 1.6;
				}
			}
		}
	}

	// 对话框内容
	.dialog-content {
		margin-bottom: 20px;
		color: #666;
		white-space: pre-wrap;
		font-family: 'Microsoft YaHei';
	}
}
</style>
