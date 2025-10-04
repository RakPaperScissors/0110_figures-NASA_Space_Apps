import 'dotenv/config'; // Loads environment variables from .env file

const username = process.env.VITE_API_USERNAME;
const password = process.env.VITE_API_PASSWORD;
const latitude = '7.0647';
const longitude = '125.6088';

const startDate = new Date();
startDate.setUTCHours(0, 0, 0, 0);
const endDate = new Date(startDate);
endDate.setDate(startDate.getDate() + 7);
const startTime = startDate.toISOString();
const endTime = endDate.toISOString();
const timeRange = `${startTime}--${endTime}:P1D`;

const dailyParameters = [
  'weather_symbol_24h:idx',
  't_min_2m_24h:C',
  't_max_2m_24h:C',
  'precip_24h:mm'
].join(',');

const dailyApiUrl = `https://api.meteomatics.com/${timeRange}/${dailyParameters}/${latitude},${longitude}/json`;

// Use Buffer for Node.js instead of btoa
const auth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

fetch(dailyApiUrl, {
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
  console.log('7-Day Forecast Data:', JSON.stringify(data, null, 2));
})
.catch(error => {
  console.error('Error fetching 7-day forecast:', error);
});