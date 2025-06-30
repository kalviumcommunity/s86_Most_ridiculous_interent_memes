import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MemeFilterByUser = () => {
  // State to manage users, selected user, and filtered memes
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [filteredMemes, setFilteredMemes] = useState([]);

  // Fetch users from backend
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/users') // Ensure this endpoint exists in your backend
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  // Handle user selection and fetch memes
  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);

    if (userId) {
      axios
        .get(`http://localhost:3000/api/memes?created_by=${userId}`) // Endpoint to filter memes
        .then((response) => setFilteredMemes(response.data))
        .catch((error) => console.error('Error fetching memes:', error));
    } else {
      setFilteredMemes([]); // Clear memes if no user is selected
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Filter Memes by User</h1>
      {/* Dropdown to select user */}
      <select
        className="border p-2 rounded mb-6"
        onChange={handleUserChange}
        value={selectedUser}
      >
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      {/* Display filtered memes */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Memes Created by Selected User</h2>
        {filteredMemes.length > 0 ? (
          filteredMemes.map((meme) => (
            <div key={meme._id} className="border p-4 rounded mb-4 shadow">
              <h3 className="text-md font-bold">{meme.title}</h3>
              <p>{meme.description}</p>
            </div>
          ))
        ) : (
          <p>No memes found for the selected user.</p>
        )}
      </div>
    </div>
  );
};

export default MemeFilterByUser;
