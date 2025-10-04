const getDeviceId = () => {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const getActiveFloodMarks = async () => {
  const response = await fetch(`${API_URL}/marks/active`);
  if (!response.ok) {
    throw new Error('Failed to fetch active flood marks');
  }
  return response.json();
};

export const createFloodMark = async (markData) => {
  const response = await fetch(`${API_URL}/marks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Device-ID': getDeviceId(),
    },
    body: JSON.stringify(markData),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || 'Failed to create flood mark');
  }
  return response.json();
};