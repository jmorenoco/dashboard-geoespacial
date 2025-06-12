<script setup>
import { ref, watch } from 'vue';
import { GoogleMap, Marker, Polyline } from 'vue3-google-map';
import { routeData } from '@/data/mockData.js';

const props = defineProps({
  selectedLocation: {
    type: Object,
    default: () => ({ lat:  4.5983, lng: -74.0764 })
  }
});

const center = ref(props.selectedLocation);
const apiKey = import.meta.env.VITE_API_KEY_GOOGLE_MAPS;


const layerVisibility = ref({
  milestones: true,
  pointsOfInterest: true,
  influenceZones: true,
  route: true,
});

//Observar cambios en la ubicación seleccionada
watch(() => props.selectedLocation, (newLocation) => {
  if (newLocation && newLocation.lat && newLocation.lng) {
    center.value = {
      lat: newLocation.lat,
      lng: newLocation.lng
    };
  }
}, { deep: true });

</script>
<template>
  <article class="map-section">
    <div class="map-container">
      <div class="map-placeholder">
        <GoogleMap
          :api-key="apiKey"
          :center="center"
          :zoom="15"
          style="width: 100%; height: 100%;"
        >
          <Marker
            v-if="center"
            :options="{
              position: center,
              title: `Ubicación seleccionada: ${props.selectedLocation.name || 'Sin nombre'}`,
            }"
          />
          <Polyline
            v-if="layerVisibility.route"
            :options="{
              path: routeData.routePoints,
              strokeColor: '#2563eb',
              strokeOpacity: 0.8,
              strokeWeight: 6,
            }" />
        </GoogleMap>
      </div>
      <!-- Map Controls -->
      <div class="map-controls">
        <div class="control-group">
          <label class="control-label">
            <input
              type="checkbox"
              class="control-checkbox"
              v-model="layerVisibility.route"
            >
            🛣️ Ruta Principal
          </label>
        </div>
        <div class="control-group">
          <label class="control-label">
            <input
              type="checkbox"
              class="control-checkbox"
              v-model="layerVisibility.milestones"
            >
            🔴 Hitos Kilométricos
          </label>
        </div>
        <div class="control-group">
          <label class="control-label">
            <input
              type="checkbox"
              class="control-checkbox"
              v-model="layerVisibility.pointsOfInterest"
            >
            ⚫ Puntos de Interés
          </label>
        </div>
        <div class="control-group">
          <label class="control-label">
            <input
              type="checkbox"
              class="control-checkbox"
              v-model="layerVisibility.influenceZones"
            >
            ⭕ Zonas de Influencia
          </label>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.map-section {
  flex: 1;
  position: relative;
  background: white;
  margin: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.map-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.map-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 500;
}

.map-controls {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.control-group {
  margin-bottom: 0.75rem;
}

.control-group:last-child {
  margin-bottom: 0;
}

.control-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #374151;
  cursor: pointer;
}

.control-checkbox {
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
}

@media (max-width: 1023px) {
  .map-section {
    display: contents;
  }
}
</style>
