<script setup>
import { ref } from 'vue';
import SearchHeader from '@/components/SearchHeader.vue';
import GoogleMapComponent from '@/components/GoogleMapComponent.vue';
import WidgetsSidebar from '@/components/WidgetsSidebar.vue';

const selectedLocation = ref({
  lat: 4.5983,
  lng: -74.0764,
  name: 'Bogotá Centro'
});

const handleLocationSelected = (location) => {
  selectedLocation.value = location;
  console.log('Ubicación seleccionada:', location);
};

</script>
<template>
  <main class="dashboard-layout">
    <SearchHeader @location-selected="handleLocationSelected" />
    <section class="flex flex-[1] overflow-hidden flex-col lg:flex-row">
      <GoogleMapComponent :selected-location="selectedLocation"/>
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
