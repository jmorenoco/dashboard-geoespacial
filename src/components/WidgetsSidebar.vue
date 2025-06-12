<script setup>
import { ref, computed } from 'vue';
import { analyticsData, getPointsOfInterestSummary } from '@/data/mockData.js';

const pointsOfInterest = ref([]);

const poiSummary = computed(() => {
  return getPointsOfInterestSummary(pointsOfInterest.value);
});

</script>
<template>
<aside class="sidebar">
  <!-- <div class="widget">
    <h3 class="widget-title">📊 Resumen General</h3>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">{{ analyticsData.totalVisitors }}</div>
        <div class="stat-label">Visitantes Totales</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ milestones.length }}</div>
        <div class="stat-label">Hitos Monitoreados</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ pointsOfInterest.length }}</div>
        <div class="stat-label">Puntos de Interés</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ influenceZones.length }}</div>
        <div class="stat-label">Zonas Activas</div>
      </div>
    </div>
  </div> -->

  <!-- Age Groups Chart -->
  <div class="widget">
      <h3 class="widget-title">👥 Franjas Etarias</h3>
      <div class="chart-container">
          <div
              v-for="group in analyticsData.ageGroups"
              :key="group.range"
              class="chart-bar"
          >
              <div class="bar-label">{{ group.range }}</div>
              <div class="bar-container">
                  <div
                      class="bar-fill"
                      :style="{ width: group.percentage + '%', backgroundColor: group.color }"
                  >
                      <div class="bar-value">{{ group.count }}</div>
                  </div>
              </div>
          </div>
      </div>
      <div class="stat-label" style="text-align: center; margin-top: 1rem;">
          Visitantes: {{ analyticsData.totalVisitors }}
      </div>
  </div>

  <!-- Socioeconomic Levels Chart -->
  <div class="widget">
      <h3 class="widget-title">💰 Niveles socioeconómicos</h3>
      <div class="chart-container">
          <div
              v-for="level in analyticsData.socioeconomicLevels"
              :key="level.class"
              class="chart-bar"
          >
              <div class="bar-label">{{ level.class }}</div>
              <div class="bar-container">
                  <div
                      class="bar-fill"
                      :style="{ width: level.percentage + '%', backgroundColor: level.color }"
                  >
                      <div class="bar-value">{{ level.count }}</div>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <!-- Points of Interest -->
  <div class="widget">
      <h3 class="widget-title">📍 Puntos de interés</h3>
      <div class="poi-list">
          <div
              v-for="poi in poiSummary"
              :key="poi.name"
              class="poi-item"
          >
              <div class="poi-icon" :style="{ backgroundColor: poi.color }">
                  {{ poi.icon }}
              </div>
              <div class="poi-info">
                  <div class="poi-name">{{ poi.name }}</div>
                  <div class="poi-count">{{ poi.totalPeople }} personas</div>
              </div>
              <div class="poi-badge">{{ poi.count }}</div>
          </div>
      </div>
  </div>

  <!-- Real-time Data
  <div class="widget">
      <h3 class="widget-title">⚡ Datos en Tiempo Real</h3>
      <div class="stats-grid">
          <div class="stat-card">
              <div class="stat-value">{{ realtimeData.activeUsers }}</div>
              <div class="stat-label">Usuarios Activos</div>
          </div>
          <div class="stat-card">
              <div class="stat-value">{{ realtimeData.newVisitors }}</div>
              <div class="stat-label">Nuevos Visitantes</div>
          </div>
      </div>
      <div class="stat-card" style="margin-top: 1rem;">
          <div class="stat-value">{{ realtimeData.averageStayTime }}min</div>
          <div class="stat-label">Tiempo Promedio</div>
      </div>
      <div style="margin-top: 1rem; padding: 0.75rem; background: #f0f9ff; border-radius: 6px; border-left: 4px solid #3b82f6;">
          <div style="font-size: 0.9rem; font-weight: 600; color: #1e40af;">Zona Más Popular</div>
          <div style="font-size: 0.8rem; color: #3730a3; margin-top: 0.25rem;">{{ realtimeData.popularZone }}</div>
      </div>
  </div> -->
</aside>
</template>
<style scoped>

.sidebar {
  width: 350px;
  background: white;
  margin: 1rem 1rem 1rem 0;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  padding: 1.5rem;
}

.widget {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
}

.widget:last-child {
  margin-bottom: 0;
}

.widget-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.chart-container {
  position: relative;
  height: 200px;
}

.chart-bar {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  gap: 0.75rem;
}

.chart-bar:last-child {
  margin-bottom: 0;
}

.bar-label {
  min-width: 80px;
  font-size: 0.9rem;
  color: #374151;
  font-weight: 500;
}

.bar-container {
  flex: 1;
  height: 24px;
  background: #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.bar-fill {
  height: 100%;
  border-radius: 12px;
  transition: width 1s ease-out;
  position: relative;
}

.bar-value {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.poi-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.poi-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: white;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}

.poi-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.poi-icon {
  font-size: 1.2rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.poi-info {
  flex: 1;
}

.poi-name {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.9rem;
}

.poi-count {
  font-size: 0.8rem;
  color: #6b7280;
}

.poi-badge {
  background: #3b82f6;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.stat-card {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.stat-label {
  font-size: 0.8rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.loading {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 1023px) {
  .sidebar {
    width: 100%;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
  }

  .widget {
    margin-bottom: 1rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
