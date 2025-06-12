// mockData.js - Datos simulados para el dashboard geoespacial

export const routeData = {
  // Ruta desde el Aeropuerto El Dorado hasta el centro de Bogotá
  startPoint: {
    lat: 4.7016,
    lng: -74.1469,
    name: "Aeropuerto El Dorado"
  },
  endPoint: {
    lat: 4.5981,
    lng: -74.0758,
    name: "Plaza Bolívar"
  },
  // Puntos que definen la ruta completa
  routePoints: [
    { lat: 4.7016, lng: -74.1469 },
    { lat: 4.7000, lng: -74.1400 },
    { lat: 4.6950, lng: -74.1300 },
    { lat: 4.6800, lng: -74.1200 },
    { lat: 4.6650, lng: -74.1100 },
    { lat: 4.6500, lng: -74.1000 },
    { lat: 4.6350, lng: -74.0950 },
    { lat: 4.6200, lng: -74.0900 },
    { lat: 4.6050, lng: -74.0850 },
    { lat: 4.5981, lng: -74.0758 }
  ]
};

// Hitos kilométricos (puntos rojos) generados a lo largo de la ruta
export const milestones = [
  {
    id: 1,
    lat: 4.7016,
    lng: -74.1469,
    kilometer: 0,
    name: "Km 0 - Aeropuerto El Dorado",
    estimatedFlow: 245,
    description: "Punto de inicio - Terminal Aeroportuario",
    peopleCount: 145
  },
  {
    id: 2,
    lat: 4.6950,
    lng: -74.1300,
    kilometer: 2.1,
    name: "Km 2.1 - Av. El Dorado",
    estimatedFlow: 180,
    description: "Intersección principal Av. El Dorado",
    peopleCount: 89
  },
  {
    id: 3,
    lat: 4.6800,
    lng: -74.1200,
    kilometer: 4.3,
    name: "Km 4.3 - Fontibón",
    estimatedFlow: 320,
    description: "Zona comercial Fontibón",
    peopleCount: 234
  },
  {
    id: 4,
    lat: 4.6650,
    lng: -74.1100,
    kilometer: 6.8,
    name: "Km 6.8 - Av. de las Américas",
    estimatedFlow: 425,
    description: "Cruce Av. de las Américas",
    peopleCount: 312
  },
  {
    id: 5,
    lat: 4.6500,
    lng: -74.1000,
    kilometer: 9.2,
    name: "Km 9.2 - Kennedy",
    estimatedFlow: 380,
    description: "Centro comercial Kennedy",
    peopleCount: 198
  },
  {
    id: 6,
    lat: 4.6350,
    lng: -74.0950,
    kilometer: 11.5,
    name: "Km 11.5 - Puente Aranda",
    estimatedFlow: 290,
    description: "Zona industrial Puente Aranda",
    peopleCount: 167
  },
  {
    id: 7,
    lat: 4.6200,
    lng: -74.0900,
    kilometer: 13.8,
    name: "Km 13.8 - Av. NQS",
    estimatedFlow: 510,
    description: "Avenida NQS - Alto tráfico",
    peopleCount: 445
  },
  {
    id: 8,
    lat: 4.6050,
    lng: -74.0850,
    kilometer: 16.1,
    name: "Km 16.1 - Zona Rosa",
    estimatedFlow: 650,
    description: "Zona Rosa - Centro financiero",
    peopleCount: 523
  },
  {
    id: 9,
    lat: 4.5981,
    lng: -74.0758,
    kilometer: 18.5,
    name: "Km 18.5 - Centro Histórico",
    estimatedFlow: 720,
    description: "Plaza Bolívar - Destino final",
    peopleCount: 612
  }
];

// Función para generar zonas de influencia (círculos) alrededor de cada hito
export const generateInfluenceZones = () => {
  return milestones.map(milestone => ({
    id: `zone_${milestone.id}`,
    center: { lat: milestone.lat, lng: milestone.lng },
    radius: Math.floor(Math.random() * 300) + 200, // Radio entre 200-500 metros
    milestoneId: milestone.id
  }));
};

// Función para generar puntos de interés aleatorios dentro de las zonas
export const generatePointsOfInterest = () => {
  const poiTypes = [
    { type: 'restaurant', name: 'Restaurante', icon: '🍽️', color: '#FF6B6B' },
    { type: 'store', name: 'Tienda', icon: '🏪', color: '#4ECDC4' },
    { type: 'park', name: 'Parque', icon: '🌳', color: '#45B7D1' },
    { type: 'hospital', name: 'Hospital', icon: '🏥', color: '#96CEB4' },
    { type: 'school', name: 'Escuela', icon: '🏫', color: '#FFEAA7' },
    { type: 'bank', name: 'Banco', icon: '🏦', color: '#DDA0DD' },
    { type: 'gas_station', name: 'Gasolinera', icon: '⛽', color: '#F7B731' }
  ];

  const points = [];

  milestones.forEach(milestone => {
    // Generar entre 3-8 puntos por zona
    const pointCount = Math.floor(Math.random() * 6) + 3;

    for (let i = 0; i < pointCount; i++) {
      const poiType = poiTypes[Math.floor(Math.random() * poiTypes.length)];
      // Generar coordenadas aleatorias cerca del hito (±0.005 grados aprox)
      const lat = milestone.lat + (Math.random() - 0.5) * 0.01;
      const lng = milestone.lng + (Math.random() - 0.5) * 0.01;

      points.push({
        id: `poi_${milestone.id}_${i}`,
        lat: lat,
        lng: lng,
        type: poiType.type,
        name: `${poiType.name} ${i + 1}`,
        icon: poiType.icon,
        color: poiType.color,
        milestoneId: milestone.id,
        peopleCount: Math.floor(Math.random() * 50) + 10
      });
    }
  });

  return points;
};

// Datos analíticos para los widgets
export const analyticsData = {
  ageGroups: [
    { range: '0-17 años', count: 145, percentage: 15.2, color: '#FF6B6B' },
    { range: '18-35 años', count: 423, percentage: 44.3, color: '#4ECDC4' },
    { range: '36-55 años', count: 298, percentage: 31.2, color: '#45B7D1' },
    { range: '56+ años', count: 89, percentage: 9.3, color: '#96CEB4' }
  ],

  socioeconomicLevels: [
    { class: 'Clase A', count: 67, percentage: 7.0, color: '#2D3436' },
    { class: 'Clase B', count: 189, percentage: 19.8, color: '#636E72' },
    { class: 'Clase C', count: 445, percentage: 46.6, color: '#74B9FF' },
    { class: 'Clase D', count: 198, percentage: 20.7, color: '#A29BFE' },
    { class: 'Clase E', count: 56, percentage: 5.9, color: '#E84393' }
  ],

  totalVisitors: 955,
  lastUpdate: new Date().toISOString()
};

// Función para obtener resumen de puntos de interés
export const getPointsOfInterestSummary = (points) => {
  const summary = {};

  points.forEach(point => {
    if (summary[point.type]) {
      summary[point.type].count++;
      summary[point.type].totalPeople += point.peopleCount;
    } else {
      summary[point.type] = {
        name: point.name.split(' ')[0], // Tomar solo el tipo
        icon: point.icon,
        color: point.color,
        count: 1,
        totalPeople: point.peopleCount
      };
    }
  });

  return Object.values(summary).sort((a, b) => b.count - a.count);
};

// Datos para autocompletado de búsqueda (simulando Google Places)
export const searchSuggestions = [
  { name: 'Aeropuerto El Dorado', lat: 4.7016, lng: -74.1469, type: 'Aeropuerto' },
  { name: 'Plaza Bolívar', lat: 4.5981, lng: -74.0758, type: 'Plaza' },
  { name: 'Zona Rosa', lat: 4.6655763, lng: -74.0565685, type: 'Zona Comercial' },
  { name: 'Centro Comercial Andino', lat: 4.666965621229094, lng: -74.0518215850157, type: 'Centro Comercial' },
  { name: 'Universidad Nacional', lat: 4.6356, lng: -74.0833, type: 'Universidad' },
  { name: 'Parque Simón Bolívar', lat: 4.6579, lng: -74.0910, type: 'Parque' },
  { name: 'Terminal de Transporte', lat: 4.653338, lng: -74.112472, type: 'Terminal' },
  { name: 'Maloka', lat: 4.655619931293772, lng: -74.10886108871424, type: 'Museo' },
  { name: 'Salitre Plaza', lat: 4.653418104973757, lng: -74.1088826776189, type: 'Centro Comercial' },
  { name: 'Estadio El Campín', lat: 4.644771, lng: -74.07755, type: 'Estadio' }
];

// Función utilitaria para calcular distancia entre dos puntos
export const calculateDistance = (point1, point2) => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLng = (point2.lng - point1.lng) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Función para generar datos en tiempo real (simulación)
export const generateRealtimeData = () => {
  return {
    timestamp: new Date().toISOString(),
    activeUsers: Math.floor(Math.random() * 100) + 850,
    newVisitors: Math.floor(Math.random() * 20) + 5,
    averageStayTime: Math.floor(Math.random() * 30) + 15, // minutos
    popularZone: milestones[Math.floor(Math.random() * milestones.length)].name
  };
};
