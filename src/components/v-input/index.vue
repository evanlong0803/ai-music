<script lang="ts">
export default {
  inheritAttrs: false,
};

interface Props {
  value: string;
}

interface Emits {
  (event: 'update:value', value: string): void;
  (event: 'on-update', value: string): void;
}
</script>

<script setup lang="ts">
withDefaults(defineProps<Props>(), {
  // 默认值
  value: '',
});

const emit = defineEmits<Emits>();

const onInput = (e: Event) => {
  const value = (<HTMLInputElement>e.target).value;
  emit('update:value', value);
  emit('on-update', value);
};

const onClear = () => {
  emit('update:value', '');
};
</script>

<template>
  <div class="relative">
    <!-- icon -->
    <span class="absolute-top-center left-2 text-gray-700 text-xl" v-if="$slots?.icon">
      <slot name="icon"></slot>
    </span>
    <!-- clear -->
    <ic-round-clear
      :class="`absolute-top-center right-3 p-1 bg-gray-300 rounded-1/2 ${
        value ? null : 'hidden'
      } hover:(cursor-pointer text-gray-700 text-opacity-80 transition-all duration-300)`"
      @click="onClear"
    />
    <input
      v-bind="$attrs"
      :value="value"
      @input="onInput"
      :class="`bg-gray-100 placeholder-gray-500 py-2 px-4 ${
        $slots?.icon ? 'pl-8' : null
      } rounded shadow text-sm`"
    />
  </div>
</template>
