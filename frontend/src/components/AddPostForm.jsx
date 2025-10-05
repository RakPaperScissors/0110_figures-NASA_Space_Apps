import React, { useState } from 'react';

function AddPostForm({ markId, onClose, onPostAdded }) {
  const [imageFile, setImageFile] = useState(null);
  const [notes, setNotes] = useState('');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!imageFile) {
      setError("An image is required.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Save username to localStorage for future use
      if (username) {
        localStorage.setItem('username', username);
      }

      const formData = new FormData();
      formData.append('notes', notes);
      formData.append('image', imageFile);

      const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');
      const deviceId = localStorage.getItem('deviceId') || crypto.randomUUID();
      localStorage.setItem('deviceId', deviceId);

      const response = await fetch(`${API_URL}/posts/marks/${markId}`, {
        method: 'POST',
        headers: {
          'X-Device-ID': deviceId,
          'X-Username': username,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || 'Failed to add post');
      }

      onPostAdded();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] bg-white text-gray-800 p-6 rounded-lg shadow-2xl w-80">
      <h3 className="text-xl font-bold mb-4">Add Update to Flood Report</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Your Name (Optional)</label>
          <input 
            type="text" 
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Take or Upload Photo</label>
          <input 
            type="file" 
            accept="image/*" 
            capture="environment" 
            required 
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Notes (Optional)</label>
          <textarea 
            value={notes} 
            onChange={e => setNotes(e.target.value)} 
            className="w-full p-2 border rounded text-black" 
            rows="3"
            placeholder="Add any additional information..."
          ></textarea>
        </div>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="flex justify-between">
          <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          <button type="submit" disabled={isSubmitting} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300">
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPostForm;
