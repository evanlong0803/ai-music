<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
defineProps<{
  value: string | null;
}>();

defineEmits<{
  value: string | null;
}>();
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
      @click="$emit('update:value', null)"
    />
    <input
      v-bind="$attrs"
      v-bind:value="value"
      v-on:input="$emit('update:value', ($event.target as HTMLInputElement).value)"
      :class="`bg-gray-100 placeholder-gray-500 py-2 px-4 ${
        $slots?.icon ? 'pl-8' : null
      } rounded shadow text-sm`"
    />
  </div>
</template>
