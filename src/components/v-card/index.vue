<template>
  <div class="h-1/1 w-1/1 card card-theme">
    <slot></slot>
  </div>
</template>

<style scoped>
.card-theme {
  @apply 'component-color' border-1 'border-color' backdrop-filter backdrop-blur-xl;
}
.card {
  @apply rounded-xl shadow;
}
</style>
