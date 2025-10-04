import 'dotenv/config'; // Loads environment variables from .env file

const username = process.env.VITE_API_USERNAME;
const password = process.env.VITE_API_PASSWORD;
const latitude = '7.0647';
const longitude = '125.6088';

const now = new Date();
const tomorrow = new Date(now);
tomorrow.setDate(tomorrow.getDate() + 1);
const startTime = now.toISOString();
const endTime = tomorrow.toISOString();
const timeRange = `${startTime}--${endTime}:PT1H`;

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

// Use Buffer for Node.js instead of btoa
const auth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

fetch(hourlyApiUrl, {
  method: 'GET',
  headers: {
    'Authorization': auth
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
})
.then(data => {
  // Pretty-print the full JSON object to your terminal
  console.log('Hourly Forecast Data:', JSON.stringify(data, null, 2));
})
.catch(error => {
  console.error('Error fetching hourly forecast:', error);
});