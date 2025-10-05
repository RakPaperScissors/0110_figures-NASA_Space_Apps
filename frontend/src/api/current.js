const username = import.meta.env.VITE_API_USERNAME;
const password = import.meta.env.VITE_API_PASSWORD;

// In-memory cache to prevent duplicate requests
const weatherCache = {};

// Utility: calculate Heat Index
function calculateHeatIndex(temperatureC, relativeHumidity) {
  if (temperatureC <= 26.7) return temperatureC;

  const tempF = (temperatureC * 9 / 5) + 32;

  let heatIndexF =
    -42.379 +
    2.04901523 * tempF +
    10.14333127 * relativeHumidity -
    0.22475541 * tempF * relativeHumidity -
    0.00683783 * tempF * tempF -
    0.05481717 * relativeHumidity * relativeHumidity +
    0.00122874 * tempF * tempF * relativeHumidity +
    0.00085282 * tempF * relativeHumidity * relativeHumidity -
    0.00000199 * tempF * tempF * relativeHumidity * relativeHumidity;

  const heatIndexC = (heatIndexF - 32) * 5 / 9;
  return parseFloat(heatIndexC.toFixed(1));
}

// Retry wrapper with exponential backoff for 429
async function fetchWithRetry(url, options, retries = 3, delay = 2000) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      if (res.status === 429 && retries > 0) {
        // Wait and retry
        await new Promise((r) => setTimeout(r, delay));
        return fetchWithRetry(url, options, retries - 1, delay * 2);
      } else {
        throw new Error(`HTTP error! status: ${res.status} ${res.statusText}`);
      }
    }
    return res;
  } catch (err) {
    if (retries > 0 && err.message.includes("429")) {
      await new Promise((r) => setTimeout(r, delay));
      return fetchWithRetry(url, options, retries - 1, delay * 2);
    }
    throw err;
  }
}

// Main fetch function
export async function fetchCurrentWeather(latitude, longitude) {
  const key = `${latitude},${longitude}`;
  if (weatherCache[key]) return weatherCache[key]; // return cached data

  const nowParameters = [
    't_2m:C',
    'weather_symbol_1h:idx',
    'relative_humidity_2m:p',
    'wind_speed_10m:ms',
    'precip_1h:mm',
    'uv:idx',
    'sunrise:sql',
    'sunset:sql',
    'msl_pressure:hPa',
  ].join(',');

  const nowApiUrl = `https://api.meteomatics.com/now/${nowParameters}/${latitude},${longitude}/json`;
  const auth = 'Basic ' + btoa(`${username}:${password}`);

  try {
    const response = await fetchWithRetry(nowApiUrl, {
      method: 'GET',
      headers: { Authorization: auth },
    });

    const data = await response.json();
    const weather = {};

    for (const param of data.data) {
      const value = param.coordinates[0].dates[0].value;
      switch (param.parameter) {
        case 't_2m:C': weather.temperature = value; break;
        case 'weather_symbol_1h:idx': weather.weatherSymbol = value; break;
        case 'relative_humidity_2m:p': weather.humidity = value; break;
        case 'wind_speed_10m:ms': weather.windSpeed = value; break;
        case 'precip_1h:mm': weather.precipitation = value; break;
        case 'uv:idx': weather.uvIndex = value; break;
        case 'sunrise:sql': weather.sunrise = value; break;
        case 'sunset:sql': weather.sunset = value; break;
        case 'msl_pressure:hPa': weather.pressure = value; break;
      }
    }

    weather.feelsLike = calculateHeatIndex(weather.temperature, weather.humidity);

    // Cache the result for future calls
    weatherCache[key] = weather;

    console.log('Current Weather Data (with calculated Feels Like):', weather);
    return weather;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
}
