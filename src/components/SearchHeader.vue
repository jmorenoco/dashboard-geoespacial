<script setup>
import { ref, computed } from 'vue';
import { searchSuggestions } from '@/data/mockData.js';

const searchQuery = ref('');
const showSuggestions = ref(false);

const handleSearch = () => {
  showSuggestions.value = searchQuery.value.length > 0;
};

const filteredSuggestions = computed(() => {
  if (!searchQuery.value) return [];
  return searchSuggestions.filter(suggestion =>
    suggestion.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).slice(0, 5);
});

</script>
<template>
  <header class="header">
    <div class="flex flex-col gap-4 lg:flex-row items-center lg:justify-between relative z-10">
        <div class="flex justify-between items-center space-x-6 w-full lg:w-auto lg:justify-normal">
          <img
            src="@/assets/logo_servinformacion.webp"
            alt="Logo"
            class="h-12 w-auto"
          />
          <h1 class="text-xl font-bold text-gray-600">
            Dashboard Geoespacial
          </h1>
        </div>
        <div class="relative w-full lg:max-w-lg">
            <input
                type="text"
                class="search-input"
                placeholder="Buscar ubicación..."
                v-model="searchQuery"
                @input="handleSearch"
                @focus="showSuggestions = true"
            >
            <span class="search-icon">🔍</span>
            <div
                v-if="showSuggestions && filteredSuggestions.length > 0"
                class="suggestions"
            >
                <div
                    v-for="suggestion in filteredSuggestions"
                    :key="suggestion.name"
                    class="suggestion-item"
                    @click="selectLocation(suggestion)"
                >
                    {{ suggestion.name }}
                </div>
            </div>
        </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  padding: 1rem 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  position: relative;
}

.header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.3;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  background: white;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.7);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: 0.5rem;
}

.suggestion-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.2s;
}

.suggestion-item:hover {
  background: #f1f5f9;
}

.suggestion-item:last-child {
  border-bottom: none;
}
</style>
