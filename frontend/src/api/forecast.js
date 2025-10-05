const username = import.meta.env.VITE_API_USERNAME;
const password = import.meta.env.VITE_API_PASSWORD;
// const latitude = '7.0647';
// const longitude = '125.6088';

const startDate = new Date();
startDate.setHours(0, 0, 0, 0);
const endDate = new Date(startDate);
endDate.setDate(startDate.getDate() + 7);
const startTime = startDate.toISOString();
const endTime = endDate.toISOString();
const timeRange = `${startTime}--${endTime}:P1D`;

export async function fetchForecast(latitude, longitude) {
  const dailyParameters = [
  'weather_symbol_24h:idx',
  't_min_2m_24h:C',
  't_max_2m_24h:C',
  'precip_24h:mm'
  ].join(',');

  const dailyApiUrl = `https://api.meteomatics.com/${timeRange}/${dailyParameters}/${latitude},${longitude}/json`;
  const auth = 'Basic ' + btoa(`${username}:${password}`);

  try {
      const response = await fetch(dailyApiUrl, {
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
    const dailyData = times.map((day, index) => {
      const object = { day };

      rawData.data.forEach(param => {
        const value = param.coordinates[0].dates[index].value;
        switch(param.parameter) {
          case 'weather_symbol_24h:idx':
            object.weatherSymbol = value;
            break;
          case 't_min_2m_24h:C':
            object.minTemperature = value;
            break;
          case 't_max_2m_24h:C':
            object.maxTemperature = value;
            break;
          case 'precip_24h:mm':
            object.precipitation = value;
            break;
        }
      });

      return object;
    })
    console.log('Daily forcast data: ', dailyData);
    return dailyData;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
}
