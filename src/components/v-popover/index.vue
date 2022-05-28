<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
</script>
<template>
  <Popover class="relative">
    <PopoverButton>Solutions</PopoverButton>

    <PopoverPanel class="z-10 absolute">
      <div class="grid grid-cols-2">
        <a href="/analytics">Analytics</a>
        <a href="/engagement">Engagement</a>
        <a href="/security">Security</a>
        <a href="/integrations">Integrations</a>
      </div>
      <img src="/solutions.jpg" alt="" />
    </PopoverPanel>
  </Popover>
</template>
