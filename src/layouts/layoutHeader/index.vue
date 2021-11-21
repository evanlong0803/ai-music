<script lang="ts" setup>
import { useRouter } from 'vue-router';
import searchUseStore from '@/store/modules/search';
import homeUseStore from '@/store/modules/home';
const router = useRouter();
const searchStore = searchUseStore();
const homeStore = homeUseStore();
</script>

<template>
  <a-layout-header class="header">
    <a-row align="center" class="app-header">
      <a-col class="header-routing" :span="8">
        <a-space>
          <icon-left class="routing-control" @click="() => router.back()" />
          <icon-right class="routing-control" @click="() => router.go(1)" />
        </a-space>
      </a-col>
      <a-col class="header-links" :span="8">
        <a-space :size="30">
          <router-link to="/" class="link">首页</router-link>
          <router-link to="/find" class="link">发现</router-link>
          <router-link to="/library" class="link">音乐库</router-link>
        </a-space>
      </a-col>
      <a-col class="header-function" :span="8">
        <a-space :size="15">
          <a-input style="width: 240px" :placeholder="searchStore.keyWord">
            <template #prefix>
              <icon-search />
            </template>
          </a-input>
          <a-button shape="circle" @click="homeStore.night = !homeStore.night">
            <icon-moon-fill v-if="homeStore.night" />
            <icon-sun-fill v-else />
          </a-button>
          <a-dropdown position="br">
            <a-avatar round :size="33">
              <icon-user />
            </a-avatar>
            <template #content>
              <a-doption>
                <template #icon>
                  <icon-home />
                </template>
                个人中心
              </a-doption>
              <a-doption>
                <template #icon>
                  <icon-export />
                </template>
                退出登录
              </a-doption>
            </template>
          </a-dropdown>
        </a-space>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<style lang="less" scoped>
.header {
  width: 100%;
  background-color: #ffffff0d;
  backdrop-filter: blur(40px);
  position: fixed;
  top: 0;
  z-index: 10;
}
.app-header {
  width: 80%;
  margin: 0 auto;
  height: 64px;

  .header-routing {
    .routing-control {
      font-size: 25px;
      padding: 5px;
      transition: all 0.3s;
      border-radius: 5px;
      &:hover {
        background: #47474738;
        transition: all 0.3s;
      }
      &:active {
        transform: scale(0.9);
        transition: all 0.3s;
      }
    }
  }
  .header-links {
    display: flex;
    justify-content: center;
    // align-items: center;
    // 激活样式-默认class名
    .router-link-exact-active {
      color: #36ad6a !important;
    }
    .link {
      padding: 6px 10px;
      border-radius: 5px;
      color: #333;
      text-decoration: none;
      font-weight: bold;
      font-size: 18px;
      transition: all 0.3s;
      &:hover {
        background: #6460604d;
        transition: all 0.3s;
      }
    }
  }
  .header-function {
    height: 32px;
    display: flex;
    justify-content: end;
    align-items: center;
  }
}
</style>
