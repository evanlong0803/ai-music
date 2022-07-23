<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    /**
     * @description 滑块值
     */
    value: number;
    /**
     * @description 滑块最小值
     */
    min?: number;
    /**
     * @description 滑块最大值
     */
    max?: number;
  }>(),
  {
    // 滑块默认值
    value: 50,
    // 滑块最小值
    min: 0,
    // 滑块最大值
    max: 100,
  },
);

const emit = defineEmits<{
  (event: 'update:value', value: number): void;
}>();

const onInput = (e: Event) => {
  const value = (<HTMLInputElement>e.target).value;
  emit('update:value', +value);
};
</script>

<template>
  <input
    type="range"
    :min="min"
    :max="max"
    :value="value"
    @input="onInput"
    class="v-slider"
    ref="slider"
  />
</template>

<style scoped>
.v-slider {
  @apply appearance-none rounded bg-gray-300 'h-[5px]' cursor-pointer;
}

.v-slider::-webkit-slider-thumb {
  appearance: none;
  border: 5px solid #fff;
  height: 15px;
  width: 15px;
  position: relative;
  top: -5px;
  border-radius: 8px;
  cursor: pointer;
}

.v-slider::-webkit-slider-runnable-track {
  height: 5px;
  border-radius: 0.25rem;
}
</style>
