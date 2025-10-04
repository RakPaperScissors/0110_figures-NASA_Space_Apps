import React, { useState, useCallback } from 'react';
import { MapContainer, TileLayer, LayersControl, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { useFloodMarks } from '../hooks/useFloodMarks';
import FloodMarkers from './FloodMarkers';
import MapSearchControl from './MapSearchControl';
import MapClickHandler from './MapClickHandler';
import AddMarkForm from './AddMarkForm';
import UserLocationMarker from './UserLocationMarker';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

let DefaultIcon = L.icon({
    ...L.Icon.Default.prototype.options,
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https-cdnjs-cloudflare-ajax-libs-leaflet-1-7-1-images-marker-icon-2x.png'.replace('https-', 'https://'),
    iconUrl: 'https-cdnjs-cloudflare-ajax-libs-leaflet-1-7-1-images-marker-icon.png'.replace('https-', 'https://'),
    shadowUrl: 'https-cdnjs-cloudflare-ajax-libs-leaflet-1-7-1-images-marker-shadow.png'.replace('https-', 'https://'),
});

function MapComponent() {
  const position = [29.9511, -90.0715];
  const { refetch: refetchFloodMarks } = useFloodMarks();
  const [newMarkPosition, setNewMarkPosition] = useState(null);
  const handleMapClick = useCallback((latlng) => { setNewMarkPosition(latlng); }, []);
  const handleCloseForm = () => { setNewMarkPosition(null); };
  const handleMarkAdded = () => { refetchFloodMarks(); };

  const today = new Date().toISOString().split('T')[0];
  const nasaGibsUrl = `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${today}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`;

  return (
    <div className="relative">
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: '100vh', width: '100%' }}
      >
        <LayersControl position="topright">
          {/* Base Layers */}
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          {/* Overlay Layers */}
          <LayersControl.Overlay checked name="NASA GIBS Satellite">
            <TileLayer url={nasaGibsUrl} attribution="NASA GIBS" maxZoom={9} opacity={0.75} />
          </LayersControl.Overlay>
        </LayersControl>
        
        {/* Feature Components */}
        <FloodMarkers />
        <MapSearchControl />
        <UserLocationMarker />
        <MapClickHandler onMapClick={handleMapClick} />

        {/* Temporary marker where the user clicked */}
        {newMarkPosition && <Marker position={newMarkPosition} />}
      </MapContainer>
      
      {/* Submission form when a user has clicked on the map */}
      {newMarkPosition && (
        <AddMarkForm 
          position={newMarkPosition} 
          onClose={handleCloseForm}
          onMarkAdded={handleMarkAdded}
        />
      )}
    </div>
  );
}

export default MapComponent;