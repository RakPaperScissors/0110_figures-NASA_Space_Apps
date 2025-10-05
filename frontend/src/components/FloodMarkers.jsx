import React, { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { useFloodMarks } from '../hooks/useFloodMarks';
import AddPostForm from './AddPostForm';
import ReportPostForm from './ReportPostForm';
import L from 'leaflet';

// Create custom marker icons for different severity levels
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
};

const severityIcons = {
  high: createCustomIcon('#ef4444'),    // Red
  medium: createCustomIcon('#f97316'),  // Orange
  low: createCustomIcon('#22c55e'),     // Green
};

const severityColors = {
  high: 'text-red-600 font-bold',
  medium: 'text-orange-600 font-semibold',
  low: 'text-green-600',
};

function FloodMarkers() {
  const { marks, isLoading, error, refetch } = useFloodMarks();
  const [selectedMarkId, setSelectedMarkId] = useState(null);
  const [reportingPostId, setReportingPostId] = useState(null);

  if (isLoading) {
    return null; 
  }

  if (error) {
    console.error("Error fetching marks:", error);
    return null;
  }

  const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');

  return (
    <>
      {marks.map(mark => {
        const [longitude, latitude] = mark.location.coordinates;
        const position = [latitude, longitude];
        const markerIcon = severityIcons[mark.severity] || severityIcons.low;
        
        // Filter out posts with 3 or more reports (flagged posts)
        const visiblePosts = mark.posts.filter(post => (post.fakeReportCount || 0) < 3);

        return (
          <Marker key={mark.id} position={position} icon={markerIcon}>
            <Popup maxWidth={400}>
              <div className="max-h-96 overflow-y-auto">
                <h4 className="text-lg font-bold mb-2">Flood Report</h4>
                <p><strong>Severity:</strong> <span className={`capitalize ${severityColors[mark.severity]}`}>
                  {mark.severity}
                </span></p>
                <p><strong>Last Updated:</strong> {new Date(mark.updatedAt).toLocaleString()}</p>
                <p><strong>Total Posts:</strong> {visiblePosts.length}</p>
                
                <hr className="my-3" />
                
                <div className="space-y-4">
                  <h5 className="font-semibold">Posts:</h5>
                  {visiblePosts.length === 0 ? (
                    <p className="text-sm text-gray-500">No posts available</p>
                  ) : (
                    visiblePosts.map(post => (
                      <div key={post.id} className="border p-2 rounded bg-gray-50">
                        {post.image && (
                          <img 
                            src={`${API_URL}/posts/${post.id}/image`} 
                            alt="Flood evidence"
                            className="w-full h-48 object-cover rounded mb-2"
                          />
                        )}
                        {post.username && (
                          <p className="text-sm"><strong>By:</strong> {post.username}</p>
                        )}
                        {post.notes && (
                          <p className="text-sm"><strong>Notes:</strong> {post.notes}</p>
                        )}
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-xs text-gray-500">
                            {new Date(post.createdAt).toLocaleString()}
                          </p>
                          <button
                            onClick={() => setReportingPostId(post.id)}
                            className="text-xs text-red-600 hover:text-red-800 underline"
                          >
                            Report
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <button 
                  onClick={() => setSelectedMarkId(mark.id)}
                  className="mt-3 w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Update to this Flood Report
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
      
      {selectedMarkId && (
        <AddPostForm 
          markId={selectedMarkId} 
          onClose={() => setSelectedMarkId(null)}
          onPostAdded={() => {
            setSelectedMarkId(null);
            refetch();
          }}
        />
      )}
      
      {reportingPostId && (
        <ReportPostForm 
          postId={reportingPostId}
          onClose={() => setReportingPostId(null)}
          onReported={() => {
            setReportingPostId(null);
            refetch();
          }}
        />
      )}
    </>
  );
}

export default FloodMarkers;