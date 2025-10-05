import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

function UserLocationMarker() {
  const map = useMap();

  useEffect(() => {
    map.locate({ setView: false, watch: false })
      .on('locationfound', (e) => {
        map.flyTo(e.latlng, 14); 
        L.circle(e.latlng, {
        //   radius: e.accuracy,
          weight: 1,
          color: '#136AEC',
          fillColor: '#136AEC',
          fillOpacity: 0.15,
        }).addTo(map);
        L.marker(e.latlng).addTo(map)
          .bindPopup("You are approximately here").openPopup();
      })
      .on('locationerror', (e) => {
        console.error("Location access denied or failed.", e.message);
      });
  }, [map]);

  return null;
}

export default UserLocationMarker;