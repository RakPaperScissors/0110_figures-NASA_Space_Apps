import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

const LocationPicker = ({ onLocationChange }) => {
    const [position, setPosition] = useState({ lat: 14.5995, lon: 120.9842 }); // default Manila

    const markerIcon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        iconSize: [32, 32],
    });

    function LocationMarker() {
        useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition({ lat, lon: lng });
            onLocationChange({ lat, lon: lng });
        },
        });

        return position ? <Marker position={[position.lat, position.lon]} icon={markerIcon} /> : null;
    }

    return (
        <div>
        <MapContainer
            center={[position.lat, position.lon]}
            zoom={5}
            style={{ height: "400px", width: "100%", borderRadius: "12px" }}
        >
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
        </MapContainer>

        <div className="mt-4 text-center">
            <p><strong>Latitude:</strong> {position.lat.toFixed(5)}</p>
            <p><strong>Longitude:</strong> {position.lon.toFixed(5)}</p>
        </div>
        </div>
    );
};

export default LocationPicker;
