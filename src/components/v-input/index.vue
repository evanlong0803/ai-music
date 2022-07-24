<script setup lang="ts">
const isBlur = ref(false);

withDefaults(
  defineProps<{
    /**
     * @description 输入框的值
     */
    value: string;
    /**
     * @description 占位符
     */
    placeholder?: string;
    /**
     * @description 是否显示loading
     */
    loading: boolean;
  }>(),
  {
    value: '',
    loading: false,
  },
);

const emit = defineEmits<{
  (event: 'update:value', value: string): void;
  (event: 'input', value: string): void;
  (event: 'enter', value: string): void;
}>();

// 输入事件
const onInput = (e: Event) => {
  const value = (<HTMLInputElement>e.target).value;
  emit('update:value', value);
  emit('input', value);
};

// 回车事件
const onEnter = (e: Event) => {
  const value = (<HTMLInputElement>e.target).value;
  emit('enter', value);
};

// 清空输入框的值
const onClear = () => {
  emit('update:value', '');
};

// 失去焦点
const onBlur = () => {
  isBlur.value = false;
};

// 获得焦点
const onFocus = () => {
  isBlur.value = true;
};
</script>

<template>
  <div class="relative">
    <!-- 搜索框 -->
    <div class="relative">
      <!-- icon -->
      <span class="absolute-y-center z-10 left-3 default-color text-xl" v-if="$slots?.icon">
        <slot name="icon"></slot>
      </span>
      <input
        :value="value"
        :loading="loading"
        :placeholder="placeholder"
        @blur="onBlur"
        @focus="onFocus"
        @input="onInput"
        @keyup.enter.stop="onEnter"
        :class="[
          $slots?.icon && 'pl-10',
          'v-base text-sm placeholder-gray-500 dark:(placeholder-gray-300) py-2 px-4',
        ]"
      />
      <!-- clear -->
      <ic-round-clear
        :class="[
          !value && 'hidden',
          'absolute-y-center right-3 p-1 component-color component-bg light:(bg-black bg-gray-300) dark:(bg-dark-300) rounded-1/2 hover:(cursor-pointer text-opacity-80 transition-all duration-300)',
        ]"
        @click="onClear"
      />

      <!-- loading -->
      <div class="absolute-y-center right-7 z-20 scale-45" v-if="loading">
        <div class="loader"></div>
      </div>
    </div>

    <!-- 搜索内容 -->
    <div
      class="w-1/1 max-h-100 overflow-y-auto absolute top-10 component-color border border-color backdrop-filter backdrop-blur rounded shadow"
      v-if="$slots?.result && !loading && isBlur && value"
    >
      <div class="default-bg opacity-80 text-left">
        <slot name="result"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid rgb(255, 255, 255, 0.2);
  border-top-color: transparent;
  animation: rot1 1.2s linear infinite;
}

@keyframes rot1 {
  to {
    transform: rotate(360deg);
  }
}
</style>
