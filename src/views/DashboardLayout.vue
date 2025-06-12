<script setup>
import SearchHeader from '@/components/SearchHeader.vue';
</script>
<template>
  <main class="dashboard-layout">
    <SearchHeader />
  </main>
</template>
<style scoped>
.dashboard-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f2f5;
}
</style>
