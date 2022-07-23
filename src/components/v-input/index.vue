<script setup lang="ts">
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
    <span class="absolute-top-center z-10 left-3 default-color text-xl" v-if="$slots?.icon">
      <slot name="icon"></slot>
    </span>
    <input
      :value="value"
      :placeholder="placeholder"
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
        'absolute-top-center right-3 p-1 component-color component-bg light:(bg-black bg-gray-300) dark:(bg-dark-300) rounded-1/2 hover:(cursor-pointer text-opacity-80 transition-all duration-300)',
      ]"
      @click="onClear"
    />
  </div>
</template>
