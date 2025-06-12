<script setup>
import SearchHeader from '@/components/SearchHeader.vue';
import GoogleMap from '@/components/GoogleMap.vue';
import WidgetsSidebar from '@/components/WidgetsSidebar.vue';
</script>
<template>
  <main class="dashboard-layout">
    <SearchHeader />
    <section class="flex flex-[1] overflow-hidden flex-col lg:flex-row">
      <GoogleMap />
      <WidgetsSidebar />
    </section>
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
