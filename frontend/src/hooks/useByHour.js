import { useEffect, useState } from "react";
import { fetchWeatherByHour } from "../api/byHour";
import { useGeolocation } from "./useGeolocation";

// Default location if user blocks or denies access
const defaultLocation = { latitude: 14.5995, longitude: 120.9842, name: "Manila, Philippines" };
export function useWeatherByHour() {
    const { coordinates, error: geoError, usingDefault} = useGeolocation();
    const [weatherByHour, setWeatherByHour] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [locationUsed, setLocationUsed] = useState(defaultLocation.name);

    useEffect(() => {
        if (!coordinates && !geoError) return;
        let latitude, longitude, locationLabel;

        if(coordinates) {
            latitude = coordinates.latitude;
            longitude = coordinates.longitude;
            if (usingDefault) {
                locationLabel = defaultLocation.name;
            } else {
                locationLabel = "Your location";
            }
        } else {
            latitude = defaultLocation.latitude;
            longitude = defaultLocation.longitude;
            locationLabel = defaultLocation.name;
        } 

        setLoading(true);

        fetchWeatherByHour(latitude, longitude)
            .then(data => {
                setWeatherByHour(data);
                setError(null);
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [coordinates]);

    return {weatherByHour, setWeatherByHour, error, loading};
}