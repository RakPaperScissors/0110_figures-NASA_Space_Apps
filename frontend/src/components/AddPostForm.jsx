import React, { useState } from 'react';
import { addPostToFloodMark } from '../api/floodMarksApi';

function AddPostForm({ mark, onClose, onPostAdded }) {
  const [imageFile, setImageFile] = useState(null);
  const [severity, setSeverity] = useState(mark.severity || 'low');
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
      if (username.trim()) {
        localStorage.setItem('username', username.trim());
      }
      
      const [longitude, latitude] = mark.location.coordinates;
      const postData = {
        latitude,
        longitude,
        severity,
        notes,
      };
      
      await addPostToFloodMark(mark.id, postData, imageFile);
      onPostAdded();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
      <h5 className="text-lg font-bold mb-3 text-blue-800">📸 Add Your Report</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block mb-1 font-semibold text-sm">Your Name (Optional)</label>
          <input 
            type="text" 
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 border rounded text-black text-sm"
          />
        </div>
        
        <div className="mb-3">
          <label className="block mb-1 font-semibold text-sm">Take or Upload Photo *</label>
          <input 
            type="file" 
            accept="image/*" 
            capture="environment" 
            required 
            onChange={handleFileChange}
            className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
        </div>
        
        <div className="mb-3">
          <label className="block mb-1 font-semibold text-sm">Update Severity</label>
          <select 
            value={severity} 
            onChange={e => setSeverity(e.target.value)} 
            className="w-full p-2 border rounded text-black text-sm"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div className="mb-3">
          <label className="block mb-1 font-semibold text-sm">Notes (Optional)</label>
          <textarea 
            value={notes} 
            onChange={e => setNotes(e.target.value)} 
            className="w-full p-2 border rounded text-black text-sm" 
            rows="2"
            placeholder="Describe the current situation..."
          ></textarea>
        </div>
        
        {error && <p className="text-red-600 mb-2 text-sm font-semibold">{error}</p>}
        
        <div className="flex justify-end gap-2">
          <button 
            type="button" 
            onClick={onClose} 
            className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400 text-sm font-semibold"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300 text-sm font-semibold"
          >
            {isSubmitting ? '📤 Submitting...' : '📤 Submit Report'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPostForm;
