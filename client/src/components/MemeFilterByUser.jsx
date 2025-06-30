import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MemeFilterByUser = () => {
  // State to manage users, selected user, filtered memes, and form data
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video_url: '',
  });

  // Fetch users from backend
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/users') // Ensure this endpoint exists in your backend
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  // Fetch memes when a user is selected
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

  // Handle input change in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission to add a new meme
  const handleAddMeme = (e) => {
    e.preventDefault();
    if (!selectedUser) {
      alert('Please select a user before adding a meme.');
      return;
    }

    const newMeme = { ...formData, created_by: selectedUser };

    axios
      .post('http://localhost:3000/api/memes', newMeme)
      .then((response) => {
        setFilteredMemes([...filteredMemes, response.data]); // Update memes list
        setFormData({ title: '', description: '', video_url: '' }); // Clear form
      })
      .catch((error) => console.error('Error adding meme:', error));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Filter and Add Memes by User</h1>
      {/* Dropdown to select user */}
      <select
        className="border p-2 rounded mb-6"
        onChange={handleUserChange}
        value={selectedUser}
      >
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      {/* Add Meme Form */}
      <form onSubmit={handleAddMeme} className="mb-6 space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Meme Title"
          value={formData.title}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="description"
          placeholder="Meme Description"
          value={formData.description}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="video_url"
          placeholder="Video URL"
          value={formData.video_url}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Meme
        </button>
      </form>

      {/* Display filtered memes */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Memes Created by Selected User</h2>
        {filteredMemes.length > 0 ? (
          filteredMemes.map((meme) => (
            <div key={meme.id} className="border p-4 rounded mb-4 shadow">
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
