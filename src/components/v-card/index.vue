<template>
  <div class="card card-theme">
    <div class="default-bg opacity-80">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.card-theme {
  @apply component-color border-1 border-color backdrop-filter backdrop-blur;
}
.card {
  @apply absolute-center rounded shadow;
}
</style>
