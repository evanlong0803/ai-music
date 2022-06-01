<script setup lang="ts"></script>
<template>
  <div class="flex items-center cursor-pointer bg-gray-100 shadow rounded-lg">
    <div class="relative hover-active">
      <img
        class="aspect-square w-7 m-2 rounded-xl shadow"
        src="https://p2.music.126.net/bpUDG9q4smPN8ReIl2s6cw==/109951167320600625.jpg"
        alt="cover"
        sizes="(max-width: 320px) 280px,(max-width: 480px) 440px,800px"
        loading="lazy"
      />
      <span class="p-1 rounded-1/2 bg-green-500 shadow absolute top-7 left-7 animate-wiggle"></span>
    </div>
    <div class="mouse-hover" title="jijasidj">jijasidj</div>
    <ic-round-arrow-left
      class="icon ml-auto transition-all active:(transform rotate-0 -rotate-90)"
    />
  </div>
</template>

<style scoped>
.hover-active {
  @apply transition-all hover: (opacity-80) active:(transform duration-300 scale-90);
}

.mouse-hover {
  @apply transition-all hover: (opacity-80 duration-300);
}
</style>
