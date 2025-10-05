const getDeviceId = () => {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
};

// Remove trailing slash from API_URL to prevent double slashes
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');

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

  const username = localStorage.getItem('username') || '';

  const response = await fetch(`${API_URL}/marks`, {
    method: 'POST',
    headers: {
      'X-Device-ID': getDeviceId(),
      'X-Username': username,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || 'Failed to create flood mark');
  }
  return response.json();
};