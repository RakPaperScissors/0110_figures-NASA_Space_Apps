import React, { useState, useEffect } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useFloodMarks } from '../hooks/useFloodMarks';
import roadFloodedIcon from '../assets/roadflooded.png';

// Function to calculate icon size based on zoom level
const getIconSize = (zoom) => {
  // Zoom levels typically range from 0-18+
  // At zoom 13+, use full size (40px)
  // Scale down proportionally for lower zoom levels
  const minSize = 16; // Minimum size at low zoom
  const maxSize = 40; // Maximum size at high zoom
  const minZoom = 5;  // Zoom level where min size is used
  const maxZoom = 13; // Zoom level where max size is used
  
  if (zoom >= maxZoom) return maxSize;
  if (zoom <= minZoom) return minSize;
  
  // Linear interpolation between min and max
  const scale = (zoom - minZoom) / (maxZoom - minZoom);
  return Math.round(minSize + (maxSize - minSize) * scale);
};

// Create custom icon for flood markers
const createFloodIcon = (size) => L.icon({
  iconUrl: roadFloodedIcon,
  iconSize: [size, size],
  iconAnchor: [size / 2, size],
  popupAnchor: [0, -size],
});

function FloodMarkers() {
  const { marks, isLoading, error } = useFloodMarks();
  const [currentZoom, setCurrentZoom] = useState(13);
  
  // Listen to zoom changes
  const map = useMapEvents({
    zoomend: () => {
      setCurrentZoom(map.getZoom());
    },
  });
  
  useEffect(() => {
    if (map) {
      setCurrentZoom(map.getZoom());
    }
  }, [map]);
  
  const iconSize = getIconSize(currentZoom);
  const floodIcon = createFloodIcon(iconSize);

  if (isLoading) {
    return null; 
  }

  if (error) {
    console.error("Error fetching marks:", error);
    return null;
  }

  return (
    <>
      {marks.map(mark => {
        const [longitude, latitude] = mark.location.coordinates;
        const position = [latitude, longitude];

        return (
          <Marker key={mark.id} position={position} icon={floodIcon}>
            <Popup>
              <div>
                <h4>Flood Report</h4>
                <p><strong>Severity:</strong> {mark.severity}</p>
                <p><strong>Last Updated:</strong> {new Date(mark.updatedAt).toLocaleString()}</p>
                <p><strong>Total Posts:</strong> {mark.posts.length}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default FloodMarkers;