import { useEffect, useState } from "react";
import { fetchForecast } from "../api/forecast"
import { useGeolocation } from "./useGeolocation";

// Default location if user blocks or denies access
const defaultLocation = { latitude: 14.5995, longitude: 120.9842, name: "Manila, Philippines" };

export function useForecast(pinnedCoords = null) {
    const { coordinates, error: geoError, usingDefault} = useGeolocation();
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState(null);
    const [locationUsed, setLocationUsed] = useState(defaultLocation.name);

    useEffect(() => {
        if (!coordinates && !geoError) return;
        let latitude, longitude, locationLabel;

        if(pinnedCoords) {
            latitude = pinnedCoords.lat;
            longitude = pinnedCoords.lon;
            locationLabel = "Pinned Location";
        } else if(coordinates) {
            latitude = coordinates.latitude;
            longitude = coordinates.longitude;
            if (usingDefault) {
                locationLabel = defaultLocation.name;
            } else {
                locationLabel = "Your location";
            }
        } else if (geoError) {
            latitude = defaultLocation.latitude;
            longitude = defaultLocation.longitude;
            locationLabel = defaultLocation.name;
        } else {
            return;
        }

        setLocationUsed(locationLabel);

        fetchForecast(latitude, longitude)
            .then(data => {
                setForecast(data);
                setError(null);
            })
            .catch(err => {
                setError(err.message);
            });
    }, [coordinates, pinnedCoords]);

    return {forecast, error}
}