import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { useFloodMarks } from '../hooks/useFloodMarks';

function FloodMarkers() {
  const { marks, isLoading, error } = useFloodMarks();

  if (isLoading) {
    return null; 
  }

  if (error) {
    console.error("Error fetching marks:", error);
    return null;
  }

  return (
    <>
      {marks.map(mark => {
        const [longitude, latitude] = mark.location.coordinates;
        const position = [latitude, longitude];

        return (
          <Marker key={mark.id} position={position}>
            <Popup>
              <div>
                <h4>Flood Report</h4>
                <p><strong>Severity:</strong> {mark.severity}</p>
                <p><strong>Last Updated:</strong> {new Date(mark.updatedAt).toLocaleString()}</p>
                <p><strong>Total Posts:</strong> {mark.posts.length}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default FloodMarkers;