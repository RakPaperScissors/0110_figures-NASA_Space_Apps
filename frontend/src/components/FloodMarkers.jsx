import React, { useState, useEffect } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useFloodMarks } from '../hooks/useFloodMarks';
import roadFloodedIcon from '../assets/roadflooded.png';
import AddPostForm from './AddPostForm';
import { reportPost } from '../api/floodMarksApi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const getIconSize = (zoom) => {
  const minSize = 16;
  const maxSize = 40; 
  const minZoom = 5;
  const maxZoom = 13;
  
  if (zoom >= maxZoom) return maxSize;
  if (zoom <= minZoom) return minSize;
  
  const scale = (zoom - minZoom) / (maxZoom - minZoom);
  return Math.round(minSize + (maxSize - minSize) * scale);
};

const createFloodIcon = (size) => L.icon({
  iconUrl: roadFloodedIcon,
  iconSize: [size, size],
  iconAnchor: [size / 2, size],
  popupAnchor: [0, -size],
});

function FloodMarkers() {
  const { marks, isLoading, error, refetch } = useFloodMarks();
  const [currentZoom, setCurrentZoom] = useState(13);
  const [showAddPostForm, setShowAddPostForm] = useState(null);
  const [showReportMenu, setShowReportMenu] = useState(null); // postId or null 
  
  // Listen to zoom changes
  const map = useMapEvents({
    zoomend: () => {
      setCurrentZoom(map.getZoom());
    },
  });
  
  useEffect(() => {
    if (map) {
      setCurrentZoom(map.getZoom());
    }
  }, [map]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showReportMenu) {
        setShowReportMenu(null);
      }
    };
    
    if (showReportMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showReportMenu]);
  
  const iconSize = getIconSize(currentZoom);
  const floodIcon = createFloodIcon(iconSize);

  if (isLoading) {
    return null; 
  }

  if (error) {
    console.error("Error fetching marks:", error);
    return null;
  }

  console.log('Flood marks data:', marks);

  return (
    <>
      {marks.map(mark => {
        const [longitude, latitude] = mark.location.coordinates;
        const position = [latitude, longitude];
        
        console.log('Mark:', mark.id, 'Posts:', mark.posts);

        const getSeverityClass = (severity) => {
          const severityLower = severity?.toLowerCase();
          if (severityLower === 'high') return 'bg-red-100 text-red-800 border border-red-300';
          if (severityLower === 'medium') return 'bg-orange-100 text-orange-800 border border-orange-300';
          if (severityLower === 'low') return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
          return 'bg-gray-100 text-gray-800 border border-gray-300';
        };

        return (
          <Marker key={mark.id} position={position} icon={floodIcon}>
            <Popup maxWidth={350}>
              <div className="max-h-96 overflow-y-auto">
                <h4 className="font-bold text-lg mb-3 text-blue-700">🌊 Flood Report</h4>
                <div className="mb-3 pb-3 border-b">
                  <p className="mb-1"><strong>Severity:</strong> <span className={`capitalize px-2 py-1 rounded font-semibold ${getSeverityClass(mark.severity)}`}>{mark.severity}</span></p>
                  <p className="mb-1"><strong>Last Updated:</strong> {new Date(mark.updatedAt).toLocaleString()}</p>
                  <p><strong>Total Posts:</strong> {mark.posts?.length || 0}</p>
                </div>
                
                {mark.posts && mark.posts.length > 0 ? (
                  <div className="mt-3">
                    <h5 className="font-semibold mb-3 text-gray-700"> Reports ({mark.posts.length}):</h5>
                    <div className="space-y-4">
                      {mark.posts.map((post, idx) => {
                        console.log('Post', idx, ':', post);
                        return (
                          <div key={post.id || idx} className="border rounded-lg p-3 bg-gray-50 relative">
                            <div className="mb-2">
                              <div className="flex justify-between items-start">
                                <p className="text-xs text-gray-500 mb-1">Report #{idx + 1}</p>
                                {post.id && (
                                  <div className="relative">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowReportMenu(showReportMenu === post.id ? null : post.id);
                                      }}
                                      className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-200 text-lg font-bold"
                                      title="Report options"
                                    >
                                      ⋮
                                    </button>
                                    {showReportMenu === post.id && (
                                      <div className="absolute right-0 mt-1 w-48 bg-white border rounded-lg shadow-lg z-50">
                                        <button
                                          onClick={async () => {
                                            try {
                                              await reportPost(post.id, 'not_a_flood');
                                              alert('Report submitted. Thank you!');
                                              setShowReportMenu(null);
                                              refetch();
                                            } catch (err) {
                                              alert('Failed to submit report: ' + err.message);
                                            }
                                          }}
                                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-t-lg"
                                        >
                                          Not a flood
                                        </button>
                                        <button
                                          onClick={async () => {
                                            try {
                                              await reportPost(post.id, 'inappropriate_image');
                                              alert('Report submitted. Thank you!');
                                              setShowReportMenu(null);
                                              refetch();
                                            } catch (err) {
                                              alert('Failed to submit report: ' + err.message);
                                            }
                                          }}
                                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                          Inappropriate image
                                        </button>
                                        <button
                                          onClick={async () => {
                                            try {
                                              await reportPost(post.id, 'spam');
                                              alert('Report submitted. Thank you!');
                                              setShowReportMenu(null);
                                              refetch();
                                            } catch (err) {
                                              alert('Failed to submit report: ' + err.message);
                                            }
                                          }}
                                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                          Spam
                                        </button>
                                        <button
                                          onClick={async () => {
                                            try {
                                              await reportPost(post.id, 'other');
                                              alert('Report submitted. Thank you!');
                                              setShowReportMenu(null);
                                              refetch();
                                            } catch (err) {
                                              alert('Failed to submit report: ' + err.message);
                                            }
                                          }}
                                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-b-lg"
                                        >
                                          Other
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                              {post.username && (
                                <p className="text-sm mb-1"><strong>By:</strong> {post.username}</p>
                              )}
                              {post.notes && (
                                <p className="text-sm mb-2"><strong>Notes:</strong> {post.notes}</p>
                              )}
                            </div>
                            {post.id ? (
                              <div>
                                <img 
                                  src={`${API_URL}/posts/${post.id}/image`}
                                  alt={`Flood image ${idx + 1}`}
                                  className="w-full h-auto rounded border"
                                  onLoad={() => console.log('Image loaded for post:', post.id)}
                                  onError={(e) => {
                                    console.error('Failed to load image for post:', post.id);
                                    e.target.parentElement.innerHTML = '<p class="text-red-500 text-xs">❌ Image failed to load</p>';
                                  }}
                                />
                                <p className="text-xs text-gray-500 mb-2"> {new Date(post.createdAt).toLocaleString()}</p>
                              </div>
                            ) : (
                              <p className="text-xs text-gray-500 italic">No image available</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 italic text-sm">No reports yet for this location.</p>
                )}
                
                {/* Add Post Form or Button */}
                {showAddPostForm === mark.id ? (
                  <AddPostForm 
                    mark={mark}
                    onClose={() => setShowAddPostForm(null)}
                    onPostAdded={() => {
                      setShowAddPostForm(null);
                      refetch();
                    }}
                  />
                ) : (
                  <div className="mt-4 pt-3 border-t">
                    <button
                      onClick={() => setShowAddPostForm(mark.id)}
                      className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-sm transition-colors"
                    >
                      ➕ Add Your Report
                    </button>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default FloodMarkers;