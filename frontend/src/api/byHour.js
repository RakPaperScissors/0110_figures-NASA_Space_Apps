const username = import.meta.env.VITE_API_USERNAME;
const password = import.meta.env.VITE_API_PASSWORD;
// const latitude = '7.0647';
// const longitude = '125.6088';

const now = new Date();
const tomorrow = new Date(now);
tomorrow.setDate(tomorrow.getDate() + 1);
const startTime = now.toISOString();
const endTime = tomorrow.toISOString();
const timeRange = `${startTime}--${endTime}:PT1H`;

export async function fetchWeatherByHour(latitude, longitude) {
  const hourlyParameters = [
    't_2m:C',
    'weather_symbol_1h:idx',
    'relative_humidity_2m:p',
    'wind_speed_10m:ms',
    'precip_1h:mm',
    'uv:idx',
    'msl_pressure:hPa'
  ].join(',');

  const hourlyApiUrl = `https://api.meteomatics.com/${timeRange}/${hourlyParameters}/${latitude},${longitude}/json`;
  const auth = 'Basic ' + btoa(`${username}:${password}`);
  try {
    const response = await fetch(hourlyApiUrl, {
      method: 'GET',
      headers: {
        'Authorization': auth
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const rawData = await response.json();

    const times = rawData.data[0].coordinates[0].dates.map(d => d.date);
    const hourlyData = times.map((time, index) => {
      const object = { time };

      rawData.data.forEach(param => {
        const value = param.coordinates[0].dates[index].value;
        switch(param.parameter) {
          case 't_2m:C':
            object.temperature = value;
            break;
          case 'relative_humidity_2m:p':
            object.humidity = value;
            break;
          case 'wind_speed_10m:ms':
            object.windSpeed = value;
            break;
          case 'precip_1h:mm':
            object.precipitation = value;
            break;
          case 'uv:idx':
            object.uv = value;
            break;
          case 'msl_pressure:hPa':
            object.pressure = value;
            break;
          case 'weather_symbol_1h:idx':
            object.weatherSymbol = value;
            break;
        }
      });

      return object;
    })
    console.log('Hourly Forecast Data: ', hourlyData);
    return hourlyData;
  } catch (error) {
    console.error('Error fetching hourly forecast:', error);
    throw error;
  }
  
}
