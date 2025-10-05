import { useEffect, useState } from "react";
import { fetchForecast } from "../api/forecast"

export function useForecast() {
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchForecast()
            .then(data => {
                setForecast(data);
                setError(null);
            })
            .catch(err => {
                setError(err.message);
            });
    }, []);

    return {forecast, error}
}