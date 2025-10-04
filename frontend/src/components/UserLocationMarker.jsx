import { useEffect, useState } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Function to calculate marker size based on zoom level
const getMarkerSize = (zoom) => {
  const minSize = 12;
  const maxSize = 25;
  const minZoom = 5;
  const maxZoom = 13;
  
  if (zoom >= maxZoom) return maxSize;
  if (zoom <= minZoom) return minSize;
  
  const scale = (zoom - minZoom) / (maxZoom - minZoom);
  return Math.round(minSize + (maxSize - minSize) * scale);
};

function UserLocationMarker() {
  const map = useMap();
  const [userMarker, setUserMarker] = useState(null);
  const [userCircle, setUserCircle] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(13);
  
  // Listen to zoom changes to update marker size
  useMapEvents({
    zoomend: () => {
      const zoom = map.getZoom();
      setCurrentZoom(zoom);
      
      // Update marker size if it exists
      if (userMarker) {
        const size = getMarkerSize(zoom);
        const icon = L.icon({
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          iconSize: [size, size * 1.64],
          iconAnchor: [size / 2, size * 1.64],
          popupAnchor: [0, -size * 1.64],
          shadowSize: [size * 1.64, size * 1.64]
        });
        userMarker.setIcon(icon);
      }
    },
  });

  useEffect(() => {
    map.locate({ setView: false, watch: false })
      .on('locationfound', (e) => {
        map.flyTo(e.latlng, 14);
        const zoom = map.getZoom();
        setCurrentZoom(zoom);
        
        const circle = L.circle(e.latlng, {
          weight: 1,
          color: '#136AEC',
          fillColor: '#136AEC',
          fillOpacity: 0.15,
        }).addTo(map);
        setUserCircle(circle);
        
        const size = getMarkerSize(zoom);
        const icon = L.icon({
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          iconSize: [size, size * 1.64],
          iconAnchor: [size / 2, size * 1.64],
          popupAnchor: [0, -size * 1.64],
          shadowSize: [size * 1.64, size * 1.64]
        });
        
        const marker = L.marker(e.latlng, { icon }).addTo(map)
          .bindPopup("You are approximately here").openPopup();
        setUserMarker(marker);
      })
      .on('locationerror', (e) => {
        console.error("Location access denied or failed.", e.message);
      });
    
    // Cleanup function
    return () => {
      if (userMarker) map.removeLayer(userMarker);
      if (userCircle) map.removeLayer(userCircle);
    };
  }, [map]);

  return null;
}

export default UserLocationMarker;