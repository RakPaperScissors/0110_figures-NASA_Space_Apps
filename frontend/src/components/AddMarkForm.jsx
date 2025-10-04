import React, { useState } from 'react';
import { createFloodMark } from '../api/floodMarksApi';

function AddMarkForm({ position, onClose, onMarkAdded }) {
  const [imageFile, setImageFile] = useState(null);
  const [severity, setSeverity] = useState('low');
  const [notes, setNotes] = useState('');
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
      const markData = {
        latitude: position.lat,
        longitude: position.lng,
        severity,
        notes,
      };
      await createFloodMark(markData, imageFile);
      onMarkAdded();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] bg-white text-gray-800 p-6 rounded-lg shadow-2xl w-80">
      <h3 className="text-xl font-bold mb-4">Report a New Flood</h3>
      <form onSubmit={handleSubmit}>
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
          <label className="block mb-1 font-semibold">Severity</label>
          <select value={severity} onChange={e => setSeverity(e.target.value)} className="w-full p-2 border rounded text-black">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Notes (Optional)</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full p-2 border rounded text-black" rows="2"></textarea>
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

export default AddMarkForm;