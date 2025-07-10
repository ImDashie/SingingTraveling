var map = L.map('map', {
  worldCopyJump: false,         // importante
  maxBounds: [[-85, -180], [85, 180]], // evita que se salga del mapa
  maxBoundsViscosity: 1.0
}).setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

var visitedCountries = {
  "ARG": {
    color: "#e74c3c",
    popup: `<strong>Argentina 🇦🇷</strong><br>
            <a href="https://youtube.com/argentina" target="_blank">Video del viaje</a><br>
            ¡Me encantó Buenos Aires!`
  },
  "AFG": {
    color: "#8e44ad",
    popup: `<strong>Afganistán 🇦🇫</strong><br>
            <a href="https://youtube.com/afghanistan" target="_blank">Historias y paisajes</a>`
  },
  "ARE": {
    color: "#f39c12",
    popup: `<strong>Emiratos Árabes 🇦🇪</strong><br>
            <a href="https://youtube.com/uae" target="_blank">Dubai vlog</a>`
  },
  "ALB": {
    color: "#3498db",
    popup: "Albania 🇦🇱 - Próximo destino"
  },
  "AGO": {
    color: "#2ecc71",
    popup: "Angola 🇦🇴 - Experiencia increíble"
  }
};
L.geoJSON(countriesData, {
  style: function(feature) {
    const countryId = feature.id;
    if (visitedCountries[countryId]) {
      return {
        fillColor: visitedCountries[countryId].color,
        color: "white",
        weight: 1,
        fillOpacity: 0.7
      };
    } else {
      return {
        fillColor: "#ccc",
        color: "white",
        weight: 1,
        fillOpacity: 0.3
      };
    }
  },
  onEachFeature: function(feature, layer) {
    const countryId = feature.id;
    if (visitedCountries[countryId]) {
      layer.bindPopup(visitedCountries[countryId].popup);
    }
  }
}).addTo(map);
