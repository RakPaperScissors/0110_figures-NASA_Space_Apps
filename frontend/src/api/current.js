import 'dotenv/config';

const username = process.env.VITE_API_USERNAME;
const password = process.env.VITE_API_PASSWORD;
const latitude = '7.0647';
const longitude = '125.6088';

const nowParameters = [
  't_2m:C',
  'feels_like_2m:C',
  'weather_symbol_1h:idx',
  'relative_humidity_2m:p',
  'wind_speed_10m:ms',
  'precip_1h:mm',
  'uv:idx',
  'sunrise:sql',
  'sunset:sql'
].join(',');

const nowApiUrl = `https://api.meteomatics.com/now/${nowParameters}/${latitude},${longitude}/json`;
const auth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

fetch(nowApiUrl, {
  method: 'GET',
  headers: {
    'Authorization': auth
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
  }
  return response.json();
})
.then(data => {
  console.log('Current Weather Data (9 parameters):');
  console.log(JSON.stringify(data, null, 2));
})
.catch(error => {
  console.error('Error fetching current weather:', error);
});