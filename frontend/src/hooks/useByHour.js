import { useEffect, useState } from "react";
import { fetchWeatherByHour } from "../api/byHour";

export function useWeatherByHour() {
    const [weatherByHour, setWeatherByHour] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWeatherByHour()
            .then(data => {
                setWeatherByHour(data);
                setError(null);
            })
            .catch(err => {
                setError(err.message);
            });
    }, []);

    return {weatherByHour, setWeatherByHour, error};
}