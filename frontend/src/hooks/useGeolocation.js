import { useState, useEffect } from "react";    

const defaultLocation = { latitude: 14.5995, longitude: 120.9842, name: "Manila, Philippines" };

export function useGeolocation() {
    const [coordinates, setCoordinates] = useState(null);
    const [error, setError] = useState(null);
    const [usingDefault, setUsingDefault] = useState(false);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser. Using default location.");
            setCoordinates(defaultLocation);
            setUsingDefault(true);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCoordinates({ latitude, longitude, name: "Your location" });
                setUsingDefault(false);
            },
            (error) => {
                console.warn("Geolocation blocked or failed:", error.message);
                setError("Could not access location, using default (Manila).");
                setCoordinates(defaultLocation);
                setUsingDefault(true);
            }
        );
    }, []);

    return { coordinates, error, usingDefault }
}