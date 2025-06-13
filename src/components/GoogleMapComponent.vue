<script setup>
import { ref, watch, onMounted } from 'vue';
import { Circle, GoogleMap, Marker, Polyline, InfoWindow } from 'vue3-google-map';
import { generateInfluenceZones, generatePointsOfInterest, routeData, milestones } from '@/data/mockData.js';

const props = defineProps({
  selectedLocation: {
    type: Object,
    default: () => ({ lat:  4.5983, lng: -74.0764 })
  }
});

const center = ref(props.selectedLocation);
const apiKey = import.meta.env.VITE_API_KEY_GOOGLE_MAPS;

const influenceZones = ref([]);
const pointOfInterest = ref([]);
const selectedMilestone = ref(null);
const showInfoWindow = ref(false);

//Generar los datos al montar el componente
onMounted(() => {
  influenceZones.value = generateInfluenceZones();
  pointOfInterest.value = generatePointsOfInterest();
});

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


const handleMilestoneClick = (milestone) => {
  selectedMilestone.value = milestone;
  showInfoWindow.value = true;
};

const closeInfoWindow = () => {
  showInfoWindow.value = false;
  selectedMilestone.value = null;
};

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
              strokeOpacity: 1,
              strokeWeight: 6,
            }"
          />
          <div v-if="layerVisibility.milestones">
            <Marker
              v-for="milestone in milestones"
              :key="milestone.id"
              :options="{
                position: { lat: milestone.lat, lng: milestone.lng },
                title: `Hito ${milestone.id}`,
                icon: {
                  url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                },
              }"
              @click="handleMilestoneClick(milestone)"
            />
          </div>
          <div v-if="layerVisibility.pointsOfInterest">
            <Marker
              v-for="poi in pointOfInterest"
              :key="poi.id"
              :options="{
                position: { lat: poi.lat, lng: poi.lng },
                title: poi.name,
                icon: {
                  url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                },
              }"
            />
          </div>
          <div v-if="layerVisibility.influenceZones">
            <Circle
              v-for="zone in influenceZones"
              :key="zone.id"
              :options="{
                center: zone.center,
                radius: zone.radius,
                fillColor: '#10b981',
                fillOpacity: 0.1,
                strokeColor: '#10b981',
                strokeOpacity: 0.6,
                strokeWeight: 2,
              }"
            />
          </div>
          <InfoWindow
            v-if="showInfoWindow && selectedMilestone"
            :options="{
              position: { lat: selectedMilestone.lat, lng: selectedMilestone.lng },
            }"
            @closeclick="closeInfoWindow"
          >
            <div class="info-window-content">
              <h3 class="info-title">{{ selectedMilestone.name }}</h3>
              <div class="info-details">
                <p><strong>Kilómetro:</strong> {{ selectedMilestone.kilometer }}</p>
                <p><strong>Flujo estimado:</strong> {{ selectedMilestone.estimatedFlow }} personas/hora</p>
                <p><strong>Personas en área:</strong> {{ selectedMilestone.peopleCount }}</p>
                <p><strong>Descripción:</strong> {{ selectedMilestone.description }}</p>
              </div>
              <div class="street-view-container">
                <h4>Vista de Street View</h4>
                <div class="street-view-placeholder">
                  <iframe
                    :src="`https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${selectedMilestone.lat},${selectedMilestone.lng}&heading=0&pitch=0&fov=90`"
                    width="300"
                    height="200"
                    style="border: 0; border-radius: 8px;"
                    allowfullscreen
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade">
                  </iframe>
                </div>
              </div>
            </div>
          </InfoWindow>
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
            🛣️ &nbsp; Ruta Principal
          </label>
        </div>
        <div class="control-group">
          <label class="control-label">
            <input
              type="checkbox"
              class="control-checkbox"
              v-model="layerVisibility.milestones"
            >
            🔴 &nbsp; Hitos Kilométricos
          </label>
        </div>
        <div class="control-group">
          <label class="control-label">
            <input
              type="checkbox"
              class="control-checkbox"
              v-model="layerVisibility.pointsOfInterest"
            >
            ⚫ &nbsp; Puntos de Interés
          </label>
        </div>
        <div class="control-group">
          <label class="control-label">
            <input
              type="checkbox"
              class="control-checkbox"
              v-model="layerVisibility.influenceZones"
            >
            ⭕ &nbsp; Zonas de Influencia
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

.info-window-content {
  max-width: 350px;
  padding: 0rem 1rem 1rem 1rem;
}

.info-title {
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
}

.info-details {
  margin-bottom: 1rem;
}

.info-details p {
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: #374151;
}

.street-view-container h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 500;
  color: #1f2937;
}

.street-view-placeholder {
  border-radius: 8px;
  overflow: hidden;
}

@media (max-width: 1023px) {
  .map-section {
    display: contents;
  }
}
</style>
