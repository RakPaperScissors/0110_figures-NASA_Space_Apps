const username = import.meta.env.VITE_API_USERNAME;
const password = import.meta.env.VITE_API_PASSWORD;
// const latitude = '7.0647';
// const longitude = '125.6088';

function calculateHeatIndex(temperatureC, relativeHumidity) {
  if (temperatureC <= 26.7) {
    return temperatureC;
  }

  const tempF = (temperatureC * 9/5) + 32;

  let heatIndexF = -42.379 + 2.04901523 * tempF + 10.14333127 * relativeHumidity
                   - 0.22475541 * tempF * relativeHumidity - 0.00683783 * tempF * tempF
                   - 0.05481717 * relativeHumidity * relativeHumidity
                   + 0.00122874 * tempF * tempF * relativeHumidity
                   + 0.00085282 * tempF * relativeHumidity * relativeHumidity
                   - 0.00000199 * tempF * tempF * relativeHumidity * relativeHumidity;

  const heatIndexC = (heatIndexF - 32) * 5/9;

  return parseFloat(heatIndexC.toFixed(1));
}

export async function fetchCurrentWeather(latitude, longitude) {
  const nowParameters = [
  't_2m:C',
  'weather_symbol_1h:idx',
  'relative_humidity_2m:p',
  'wind_speed_10m:ms',
  'precip_1h:mm',
  'uv:idx',
  'sunrise:sql',
  'sunset:sql',
  'msl_pressure:hPa'
  ].join(',');

  const nowApiUrl = `https://api.meteomatics.com/now/${nowParameters}/${latitude},${longitude}/json`;
  const auth = 'Basic ' + btoa(`${username}:${password}`);

  try {
    const response = await fetch(nowApiUrl, {
      method: 'GET',
      headers: {
        'Authorization': auth
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    const tempParam = data.data.find(p => p.parameter === 't_2m:C');
    const humidityParam = data.data.find(p => p.parameter === 'relative_humidity_2m:p');

    const temperature = tempParam?.coordinates?.[0]?.dates?.[0]?.value;
    const humidity = humidityParam?.coordinates?.[0]?.dates?.[0]?.value;

    if (temperature == null || humidity == null) {
      console.warn('Temperature or humidity missing in API response', { temperature, humidity });
    }

    const feelsLikeTemp = calculateHeatIndex(temperature ?? 0, humidity ?? 0);
    data.calculated_feels_like_C = feelsLikeTemp;

    console.log('Current Weather Data (with calculated Feels Like):');
    console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
}
