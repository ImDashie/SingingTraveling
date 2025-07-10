// Configuración del mapa con mejor estilo
var map = L.map('map', {
  worldCopyJump: false,
  maxBounds: [[-85, -180], [85, 180]],
  maxBoundsViscosity: 1.0,
  zoomControl: false
}).setView([20, 0], 2);

// Control de zoom personalizado
L.control.zoom({
  position: 'topright'
}).addTo(map);

// Tile layer con mejor estilo
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '© OpenStreetMap contributors, © CARTO',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

// Datos de países visitados con información más detallada
var visitedCountries = {
  "ARG": {
    color: "#e74c3c",
    country: "Argentina",
    flag: "🇦🇷",
    artist: "María González",
    song: "Tango en Buenos Aires",
    description: "Una hermosa colaboración de tango moderno con una artista local increíble",
    videoUrl: "https://youtube.com/watch?v=argentina-tango",
    type: "Colaboración reciente"
  },
  "AFG": {
    color: "#8e44ad",
    country: "Afganistán",
    flag: "🇦🇫",
    artist: "Ahmad Zahir Tribute",
    song: "Gul-e-Surkh (Cover)",
    description: "Un emotivo cover de una canción clásica afgana, honrando la rica tradición musical",
    videoUrl: "https://youtube.com/watch?v=afghanistan-cover",
    type: "Cover especial"
  },
  "ARE": {
    color: "#f39c12",
    country: "Emiratos Árabes Unidos",
    flag: "🇦🇪",
    artist: "Amira Al-Zahra",
    song: "Desert Dreams",
    description: "Fusión única de música árabe tradicional con pop moderno en Dubai",
    videoUrl: "https://youtube.com/watch?v=uae-fusion",
    type: "Proyecto destacado"
  },
  "ALB": {
    color: "#3498db",
    country: "Albania",
    flag: "🇦🇱",
    artist: "Elsa Lila",
    song: "Balkan Harmony",
    description: "Próxima colaboración con una de las voces más reconocidas de los Balcanes",
    videoUrl: "#",
    type: "Próxima colaboración"
  },
  "AGO": {
    color: "#2ecc71",
    country: "Angola",
    flag: "🇦🇴",
    artist: "Paulo Flores Jr.",
    song: "Semba Moderno",
    description: "Una experiencia musical increíble explorando los ritmos tradicionales angoleños",
    videoUrl: "https://youtube.com/watch?v=angola-semba",
    type: "Experiencia única"
  },
  "BRA": {
    color: "#e67e22",
    country: "Brasil",
    flag: "🇧🇷",
    artist: "Caetano Veloso Jr.",
    song: "Bossa Nova Dreams",
    description: "Colaboración especial con bossa nova contemporánea en Río de Janeiro",
    videoUrl: "https://youtube.com/watch?v=brasil-bossa",
    type: "Colaboración reciente"
  },
  "JPN": {
    color: "#9b59b6",
    country: "Japón",
    flag: "🇯🇵",
    artist: "Yuki Tanaka",
    song: "Sakura Fusion",
    description: "Fusión de J-Pop con elementos latinos, grabado en Tokio",
    videoUrl: "https://youtube.com/watch?v=japan-fusion",
    type: "Cover especial"
  },
  "IND": {
    color: "#1abc9c",
    country: "India",
    flag: "🇮🇳",
    artist: "Priya Sharma",
    song: "Bollywood Beats",
    description: "Colaboración vibrante mezclando Bollywood con ritmos latinos",
    videoUrl: "https://youtube.com/watch?v=india-bollywood",
    type: "Proyecto destacado"
  }
};

// Función para crear popup personalizado
function createCustomPopup(countryData) {
  const isComingSoon = countryData.videoUrl === "#";
  const buttonText = isComingSoon ? "🔜 Próximamente" : "🎵 Ver Video";
  const buttonClass = isComingSoon ? "popup-link coming-soon" : "popup-link";
  
  return `
    <div class="custom-popup">
      <div class="popup-title">${countryData.country} ${countryData.flag}</div>
      <div class="popup-artist"><strong>Artista:</strong> ${countryData.artist}</div>
      <div class="popup-song"><strong>Canción:</strong> "${countryData.song}"</div>
      <div class="popup-description">${countryData.description}</div>
      <div class="popup-type"><em>${countryData.type}</em></div>
      ${isComingSoon ? 
        `<div class="${buttonClass}" style="background: #95a5a6; cursor: default;">${buttonText}</div>` :
        `<a href="${countryData.videoUrl}" target="_blank" class="${buttonClass}">${buttonText}</a>`
      }
    </div>
  `;
}

// Agregar países al mapa
L.geoJSON(countriesData, {
  style: function(feature) {
    const countryId = feature.id;
    if (visitedCountries[countryId]) {
      return {
        fillColor: visitedCountries[countryId].color,
        color: "white",
        weight: 2,
        fillOpacity: 0.8,
        className: 'country-visited'
      };
    } else {
      return {
        fillColor: "#ecf0f1",
        color: "#bdc3c7",
        weight: 1,
        fillOpacity: 0.6,
        className: 'country-unvisited'
      };
    }
  },
  onEachFeature: function(feature, layer) {
    const countryId = feature.id;
    
    if (visitedCountries[countryId]) {
      const countryData = visitedCountries[countryId];
      
      // Popup personalizado
      layer.bindPopup(createCustomPopup(countryData), {
        maxWidth: 300,
        className: 'custom-popup-wrapper'
      });
      
      // Efectos hover
      layer.on({
        mouseover: function(e) {
          const layer = e.target;
          layer.setStyle({
            weight: 3,
            fillOpacity: 1,
            color: '#2c3e50'
          });
          
          if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
          }
        },
        mouseout: function(e) {
          const layer = e.target;
          layer.setStyle({
            weight: 2,
            fillOpacity: 0.8,
            color: 'white'
          });
        }
      });
    } else {
      // Para países no visitados
      layer.on({
        mouseover: function(e) {
          const layer = e.target;
          layer.setStyle({
            fillOpacity: 0.8,
            color: '#7f8c8d'
          });
        },
        mouseout: function(e) {
          const layer = e.target;
          layer.setStyle({
            fillOpacity: 0.6,
            color: '#bdc3c7'
          });
        }
      });
    }
  }
}).addTo(map);

// Actualizar estadísticas
function updateStats() {
  const countriesCount = Object.keys(visitedCountries).length;
  const songsCount = countriesCount + 3; // Algunas colaboraciones múltiples
  const artistsCount = countriesCount + 4; // Algunos países con múltiples artistas
  
  document.getElementById('countries-count').textContent = countriesCount;
  document.getElementById('songs-count').textContent = songsCount;
  document.getElementById('artists-count').textContent = artistsCount;
}

// Inicializar estadísticas
updateStats();

// Agregar estilos CSS adicionales para popups
const additionalStyles = `
  <style>
    .custom-popup-wrapper .leaflet-popup-content-wrapper {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 15px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }
    
    .custom-popup-wrapper .leaflet-popup-tip {
      background: #667eea;
    }
    
    .custom-popup {
      font-family: 'Poppins', sans-serif;
    }
    
    .popup-title {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 0.8rem;
      text-align: center;
      border-bottom: 1px solid rgba(255,255,255,0.3);
      padding-bottom: 0.5rem;
    }
    
    .popup-artist, .popup-song {
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
    }
    
    .popup-description {
      margin: 1rem 0;
      font-size: 0.9rem;
      line-height: 1.5;
      opacity: 0.9;
    }
    
    .popup-type {
      font-size: 0.8rem;
      opacity: 0.8;
      margin-bottom: 1rem;
      text-align: center;
    }
    
    .popup-link {
      display: block;
      background: rgba(255,255,255,0.2);
      color: white;
      padding: 0.7rem 1rem;
      border-radius: 25px;
      text-decoration: none;
      font-weight: 500;
      text-align: center;
      transition: all 0.3s ease;
      border: 1px solid rgba(255,255,255,0.3);
    }
    
    .popup-link:hover:not(.coming-soon) {
      background: rgba(255,255,255,0.3);
      transform: translateY(-2px);
    }
    
    .popup-link.coming-soon {
      opacity: 0.7;
    }
    
    .country-visited {
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .country-unvisited {
      cursor: default;
    }
  </style>
`;

// Agregar estilos al head
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Función para centrar el mapa en un país específico (útil para futuras funcionalidades)
function focusOnCountry(countryId) {
  // Esta función se puede usar para centrar el mapa en un país específico
  // cuando se implemente funcionalidad adicional
}

// Mensaje de bienvenida (opcional)
console.log('🎵 Singing Traveling - Mapa cargado exitosamente!');
console.log(`📍 ${Object.keys(visitedCountries).length} países con colaboraciones musicales`);