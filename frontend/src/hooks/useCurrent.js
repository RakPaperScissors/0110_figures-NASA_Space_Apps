import React from "react";
import { useEffect, useState } from "react";
import { fetchCurrentWeather } from "../api/current";
import { useGeolocation } from "./useGeolocation";

// Default location if user blocks or denies access
const defaultLocation = { latitude: 14.5995, longitude: 120.9842, name: "Manila, Philippines" };

export function useCurrentWeather(pinnedCoords = null) {
    const { coordinates, error: geoError, usingDefault} = useGeolocation();
    const [currentWeather, setCurrentWeather] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
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
        } else if(geoError) {
            latitude = defaultLocation.latitude;
            longitude = defaultLocation.longitude;
            locationLabel = defaultLocation.name;
        } else {
            return;
        }

        setLocationUsed(locationLabel);
        setLoading(true);

        fetchCurrentWeather(latitude, longitude)
            .then(data => {
                setCurrentWeather(data);
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [coordinates, geoError, usingDefault, pinnedCoords]);

    return {currentWeather, error: error || geoError, locationUsed, usingDefault, loading};
}