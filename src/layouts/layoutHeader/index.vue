<script lang="ts" setup>
import { RendererNode } from 'vue';
import { h } from 'vue-demi';
import { useRouter } from 'vue-router';
import { NIcon, NAvatar, NText } from 'naive-ui';
import { AngleLeft, AngleRight, Search, UserCircle, SignOutAlt, User } from '@vicons/fa';
import searchUseStore from '@/store/modules/search';
const router = useRouter();
const searchStore = searchUseStore();

const renderCustomHeader = () => {
  return h(
    'div',
    {
      style: 'display: flex; align-items: center; padding: 8px 12px;',
    },
    [
      h(NAvatar, {
        round: true,
        style: 'margin-right: 12px;',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/demo1.JPG',
      }),
      h('div', null, [
        h('div', null, [h(NText, { depth: 2 }, { default: () => '打工仔' })]),
        h('div', { style: 'font-size: 12px;' }, [
          h(NText, { depth: 3 }, { default: () => '毫无疑问，你是办公室里最亮的星' }),
        ]),
      ]),
    ],
  );
};

const renderIcon = (icon: RendererNode) => () => h(NIcon, null, { default: () => h(icon) });

const options = [
  {
    key: 'header',
    type: 'render',
    render: renderCustomHeader,
  },
  {
    label: '个人中心',
    key: 'profile',
    icon: renderIcon(User),
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(SignOutAlt),
  },
];
</script>

<template>
  <n-layout-header class="header">
    <div class="app-header">
      <n-grid :cols="3">
        <n-grid-item class="header-routing">
          <n-icon
            size="25"
            class="routing-control"
            style="margin-right: 15px"
            @click="() => router.back()"
          >
            <AngleLeft />
          </n-icon>
          <n-icon size="25" class="routing-control" @click="() => router.go(1)">
            <AngleRight />
          </n-icon>
        </n-grid-item>
        <n-grid-item class="header-links">
          <n-space inline :size="30">
            <router-link to="/" class="link">首页</router-link>
            <router-link to="/find" class="link">发现</router-link>
            <router-link to="/library" class="link">音乐库</router-link>
          </n-space>
        </n-grid-item>
        <n-grid-item class="header-function">
          <n-input
            class="search"
            :placeholder="searchStore.keyWord"
            :theme-overrides="{ color: 'transparent' }"
          >
            <template #prefix>
              <n-icon>
                <Search />
              </n-icon>
            </template>
          </n-input>

          <n-dropdown :options="options" placement="bottom-start">
            <n-avatar round>
              <n-icon>
                <UserCircle />
              </n-icon>
            </n-avatar>
          </n-dropdown>
        </n-grid-item>
      </n-grid>
    </div>
  </n-layout-header>
</template>

<style lang="less" scoped>
.header {
  background-color: #ffffff0d;
  backdrop-filter: blur(20px);
}
.app-header {
  width: 80%;
  margin: 0 auto;
  // padding: 20px 0;
  line-height: 64px;

  .header-routing {
    display: flex;
    justify-content: start;
    align-items: center;
    .routing-control {
      padding: 5px;
      transition: all 0.3s;
      border-radius: 5px;
      &:hover {
        background: #cccc;
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
      padding: 10px;
      border-radius: 5px;
      color: #cccccc;
      text-decoration: none;
      font-weight: bold;
      font-size: 18px;
      transition: all 0.3s;
      &:hover {
        background: #f2f2f4;
        transition: all 0.3s;
      }
    }
  }
  .header-function {
    display: flex;
    flex-flow: row nowrap;
    justify-content: end;
    align-items: center;
    .search {
      width: 50%;
      margin-right: 20px;
    }
  }
}
</style>
