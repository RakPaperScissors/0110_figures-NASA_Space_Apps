import React from "react";
import { useEffect, useState } from "react";
import { fetchCurrentWeather } from "../api/current";

export function useCurrentWeather() {
    const [currentWeather, setCurrentWeather] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCurrentWeather()
            .then(data => {
                setCurrentWeather(data);
            })
            .catch(err => {
                setError(err.message);
            });
    }, []);

    return {currentWeather, setCurrentWeather, error};
}