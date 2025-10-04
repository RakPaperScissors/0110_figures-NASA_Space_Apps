import React from "react";
import { useEffect, useState } from "react";
import { fetchCurrentWeather } from "../api/current";
import { useGeolocation } from "./useGeolocation";

// Default location if user blocks or denies access
const defaultLocation = { latitude: 14.5995, longitude: 120.9842, name: "Manila, Philippines" };

export function useCurrentWeather() {
    const { coordinates, error: geoError, usingDefault} = useGeolocation();
    const [currentWeather, setCurrentWeather] = useState({});
    const [error, setError] = useState(null);
    const [locationUsed, setLocationUsed] = useState(defaultLocation.name);

    useEffect(() => {
        let latitude, longitude;

        if(coordinates) {
            latitude = coordinates.latitude;
            longitude = coordinates.longitude;
            setLocationUsed("Your location");
        } else if(geoError) {
            latitude = defaultLocation.latitude;
            longitude = defaultLocation.longitude;
            setLocationUsed(defaultLocation.name);
        } else {
            return;
        }

        fetchCurrentWeather(latitude, longitude)
            .then(data => {
                setCurrentWeather(data);
            })
            .catch(err => {
                setError(err.message);
            });
    }, [coordinates]);

    return {currentWeather, error: error || geoError, locationUsed, usingDefault};
}