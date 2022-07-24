<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /**
     * @description 显示
     */
    visible: boolean;
  }>(),
  // 默认值
  {
    visible: false,
  },
);

const emit = defineEmits<{
  (event: 'update:visible', visible: boolean): void;
}>();

const onClick = () => {
  props.visible && emit('update:visible', false);
};
</script>

<template>
  <div class="modal modal-theme">
    <div class="default-bg opacity-80">
      <div class="p-5 float-right relative z-10" @click="onClick">
        <ic-round-clear class="icon text-xl component-bg" />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.modal-theme {
  @apply component-color border-1 border-color backdrop-filter backdrop-blur;
}
.modal {
  @apply absolute-center rounded-xl shadow;
}
</style>
