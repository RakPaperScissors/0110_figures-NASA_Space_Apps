const getDeviceId = () => {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

console.log('API_URL configured as:', API_URL);

export const getActiveFloodMarks = async () => {
  const response = await fetch(`${API_URL}/marks/active`);
  if (!response.ok) {
    throw new Error('Failed to fetch active flood marks');
  }
  return response.json();
};

export const createFloodMark = async (markData, imageFile) => {
  const formData = new FormData();

  formData.append('latitude', markData.latitude);
  formData.append('longitude', markData.longitude);
  formData.append('severity', markData.severity);
  if (markData.notes) {
    formData.append('notes', markData.notes);
  }

  formData.append('image', imageFile);

  console.log('Sending flood mark data:', {
    url: `${API_URL}/marks`,
    latitude: markData.latitude,
    longitude: markData.longitude,
    severity: markData.severity,
    notes: markData.notes,
    imageFile: imageFile.name,
    deviceId: getDeviceId(),
  });

  try {
    const response = await fetch(`${API_URL}/marks`, {
      method: 'POST',
      headers: {
        'X-Device-ID': getDeviceId(),
        'X-Username': localStorage.getItem('username') || '',
      },
      body: formData,
    });

    const text = await response.text();
    console.log('Response status:', response.status);
    console.log('Response text:', text);
    
    if (!response.ok) {
      let errorMessage = `Failed to create flood mark (Status: ${response.status})`;
      try {
        const errorBody = JSON.parse(text);
        errorMessage = errorBody.message || errorMessage;
        console.error('Error details:', errorBody);
      } catch (e) {
        errorMessage = text || errorMessage;
        console.error('Raw error response:', text);
      }
      throw new Error(errorMessage);
    }

    // Try to parse the response as JSON if there's content
    if (text) {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.warn('Response is not valid JSON:', text);
        return { success: true, message: text };
      }
    }
    
    // If no content, return success indicator
    return { success: true };
  } catch (error) {
    console.error('Fetch error:', error);
    if (error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to server. Please make sure the backend is running on ' + API_URL);
    }
    throw error;
  }
};