<script setup lang="ts">
export interface IOptions {
  /**
   * @description 选项名称
   */
  name: string;
  /**
   * @description 选项图标
   */
  icon?: string;
  /**
   * @description 点击事件
   */
  onClick?: (e: Event) => void;
}

defineProps<{
  /**
   * @description 下拉框选项
   */
  options: IOptions[];
  /**
   * @description 头像
   * @extends coverSrc "https://picsum.photos/200/300"
   */
  coverSrc?: string;
}>();

const emit = defineEmits<{
  (event: 'click'): void;
  // (event: 'change', value: string): void;
}>();

const isOpen = ref(false);

/**
 * 打开下拉框
 * @description 通过设置 isOpen 为 true 来打开下拉框
 */
const changeState = () => {
  // const value = (<HTMLInputElement>e.target).value;
  isOpen.value = !isOpen.value;
  emit('click');
};
</script>

<template>
  <div class="relative">
    <div
      :class="[!coverSrc && 'pl-4', 'relative w-45 flex items-center cursor-pointer v-base']"
      @click.stop="changeState"
    >
      <!-- 用户头像信息 -->
      <img
        v-if="coverSrc"
        class="aspect-square w-6 mx-2 rounded-1/2 shadow"
        :src="coverSrc"
        alt="cover"
      />
      <!-- 文本 -->
      <div class="text-left mouse-hover truncate" title="jijasidjddddddddd">jijasidjddddddddd</div>
      <ic-round-arrow-left
        :class="[isOpen && '-rotate-90', 'icon ml-auto transition-all transform rotate-0']"
      />
    </div>
    <!-- 下拉内容 -->
    <div v-auto-animate>
      <div class="w-1/1 p-2 absolute z-10 top-1 v-base space-y-2" v-if="isOpen && options.length">
        <template v-for="item in options" :key="item.name">
          <button
            class="w-1/1 flex items-center p-2 rounded cursor-pointer hover:(hover-bg) checked:(hover-bg)"
            @click="item.onClick"
            @blur="isOpen = false"
          >
            <component :is="item?.icon" class="icon text-2xl default-color mr-1" />
            <span class="default-color text-sm">
              {{ item.name }}
            </span>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hover-active {
  @apply transition-all hover: (opacity-80) active:(transform duration-300 scale-98);
}

.mouse-hover {
  @apply transition-all hover: (opacity-80 duration-300);
}
</style>
