import React, { useState, useEffect } from 'react';

function UsernameInput() {
  const [username, setUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    } else {
      setIsEditing(true);
    }
  }, []);

  const handleSave = () => {
    if (username.trim()) {
      localStorage.setItem('username', username.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div className="absolute top-4 right-4 z-[1000] bg-white text-gray-800 p-3 rounded-lg shadow-md">
      {isEditing ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter username"
            className="p-1 border rounded text-sm text-black"
            autoFocus
          />
          <button onClick={handleSave} className="py-1 px-3 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">Save</button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Welcome, {username}</span>
          <button onClick={() => setIsEditing(true)} className="text-sm text-blue-600 hover:underline">Edit</button>
        </div>
      )}
    </div>
  );
}

export default UsernameInput;