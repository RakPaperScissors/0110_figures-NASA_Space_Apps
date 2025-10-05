import React, { useState } from 'react';

function ReportPostForm({ postId, onClose, onReported }) {
  const [reason, setReason] = useState('not_a_flood');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const reasons = [
    { value: 'not_a_flood', label: 'Not a Flood' },
    { value: 'spam', label: 'Spam' },
    { value: 'inappropriate_image', label: 'Inappropriate Image' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');
      const deviceId = localStorage.getItem('deviceId') || crypto.randomUUID();
      localStorage.setItem('deviceId', deviceId);

      const response = await fetch(`${API_URL}/reports/posts/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Device-ID': deviceId,
        },
        body: JSON.stringify({ reason }),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        if (response.status === 409) {
          throw new Error('You have already reported this post.');
        }
        throw new Error(errorBody.message || 'Failed to report post');
      }

      const result = await response.json();
      setSuccess(true);
      
      setTimeout(() => {
        onReported();
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] bg-white text-gray-800 p-6 rounded-lg shadow-2xl w-80">
      <h3 className="text-xl font-bold mb-4">Report Post</h3>
      
      {success ? (
        <div className="text-center py-4">
          <p className="text-green-600 font-semibold">✓ Post reported successfully!</p>
          <p className="text-sm text-gray-600 mt-2">Thank you for helping keep our community safe.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Reason for reporting:</label>
            <select 
              value={reason} 
              onChange={e => setReason(e.target.value)} 
              className="w-full p-2 border rounded text-black"
              required
            >
              {reasons.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>

          {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

          <div className="flex justify-between">
            <button 
              type="button" 
              onClick={onClose} 
              className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-300"
            >
              {isSubmitting ? 'Reporting...' : 'Report Post'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ReportPostForm;
