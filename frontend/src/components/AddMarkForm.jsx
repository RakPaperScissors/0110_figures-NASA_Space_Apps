import React, { useState } from "react";
import { createFloodMark } from "../api/floodMarksApi";

function AddMarkForm({ position, onClose, onMarkAdded }) {
  const [imageFile, setImageFile] = useState(null);
  const [severity, setSeverity] = useState("low");
  const [notes, setNotes] = useState("");
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
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
      return;
    }
    try {
      // Save username to localStorage for future use
      if (username) {
        localStorage.setItem("username", username);
      }

      const markData = {
        latitude: position.lat,
        longitude: position.lng,
        severity,
        notes,
      };
      await createFloodMark(markData, imageFile);
      onMarkAdded(); // This will refresh the map and close the form
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    z-[1000] w-80 rounded-2xl p-6 
                    bg-black/60 border border-white/10 
                    backdrop-blur-md shadow-xl text-white"
    >
      <h3 className="text-2xl font-semibold text-center mb-5">
        Report a Flood
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="text-sm block mb-1">Your name (Optional)</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-3 py-2 rounded-md bg-white/20 border border-white/20 
                       placeholder-gray-300 text-white focus:outline-none focus:ring-1 focus:ring-white/40"
          />
        </div>

        <div>
          <label className="text-sm block mb-1">Take or Upload Photo</label>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            required
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-200 
                       file:mr-3 file:py-2 file:px-4 
                       file:rounded-lg file:border-0 
                       file:text-sm file:font-semibold 
                       file:bg-[#1a202c] file:text-white"
          />
        </div>

        <div>
          <label className="text-sm block mb-1">Severity</label>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-white/20 border border-white/20 
                       text-white focus:outline-none focus:ring-1 focus:ring-white/40"
          >
            <option value="low" className="text-black">
              Low
            </option>
            <option value="medium" className="text-black">
              Medium
            </option>
            <option value="high" className="text-black">
              High
            </option>
          </select>
        </div>

        <div>
          <label className="text-sm block mb-1">Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="2"
            className="w-full px-3 py-2 rounded-md bg-white/20 border border-white/20 
                       placeholder-gray-300 text-white focus:outline-none focus:ring-1 focus:ring-white/40"
            placeholder="Enter additional details..."
          ></textarea>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onClose}
            className="w-24 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-24 py-2 rounded-lg bg-[#1a202c] text-white font-semibold"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMarkForm;
