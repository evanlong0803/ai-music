<template>
  <div class="absolute-center">
    <div class="loader">
      <span>L</span>
      <span>O</span>
      <span>A</span>
      <span>D</span>
      <span>I</span>
      <span>N</span>
      <span>G</span>
    </div>
  </div>
</template>

<style scoped>
.loader span {
  font-size: 22px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 600;
  animation: blur 3s linear infinite;
  line-height: 20px;
  transition: all 0.5s;
  letter-spacing: 0.2em;
}

@keyframes blur {
  0%,
  90% {
    filter: blur(0);
  }

  50% {
    filter: blur(10px);
  }
}
</style>
