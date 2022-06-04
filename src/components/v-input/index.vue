<script setup lang="ts">
withDefaults(
  defineProps<{
    /**
     * @description 双向绑定输入框的值
     */
    value: string;
    /**
     * @description 占位符
     */
    placeholder?: string;
  }>(),
  // 默认值
  {
    value: '',
  },
);

const emit = defineEmits<{
  (event: 'update:value', value: string): void;
  (event: 'input', value: string): void;
  (event: 'enter', value: string): void;
}>();

const onInput = (e: Event) => {
  const value = (<HTMLInputElement>e.target).value;
  emit('update:value', value);
  emit('input', value);
};

const onEnter = (e: Event) => {
  const value = (<HTMLInputElement>e.target).value;
  emit('enter', value);
};

const onClear = () => {
  emit('update:value', '');
};
</script>

<template>
  <div class="relative">
    <!-- icon -->
    <span class="absolute-top-center z-10 left-3 text-gray-700 text-xl" v-if="$slots?.icon">
      <slot name="icon"></slot>
    </span>
    <input
      :value="value"
      :placeholder="placeholder"
      @input="onInput"
      @keyup.enter.stop="onEnter"
      :class="`bg-gray-100 placeholder-gray-500 py-2 px-4 ${
        $slots?.icon ? 'pl-10' : null
      } v-base text-sm`"
    />
    <!-- clear -->
    <ic-round-clear
      :class="`absolute-top-center right-3 p-1 bg-gray-300 rounded-1/2 ${
        value ? null : 'hidden'
      } hover:(cursor-pointer text-gray-700 text-opacity-80 transition-all duration-300)`"
      @click="onClear"
    />
  </div>
</template>
