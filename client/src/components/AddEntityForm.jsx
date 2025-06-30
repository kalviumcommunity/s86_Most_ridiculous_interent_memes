import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddEntityForm = () => {
  const [formData, setFormData] = useState({ title: '', description: '', video: '' });
  const [entities, setEntities] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch entities from the server
  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/memes');
        setEntities(response.data);
      } catch (error) {
        console.error('Error fetching entities:', error.message);
      }
    };

    fetchEntities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        // Update existing entity
        const response = await axios.put(`http://localhost:3000/api/memes/${editId}`, formData);
        setEntities(
          entities.map((entity) =>
            entity._id === editId ? response.data : entity
          )
        );
        setEditMode(false);
        setEditId(null);
      } else {
        // Add new entity
        const response = await axios.post('http://localhost:3000/api/memes', formData);
        setEntities([...entities, response.data]);
      }
      setFormData({ title: '', description: '', video: '' }); // Clear form
    } catch (error) {
      console.error('Error saving entity:', error.message);
    }
  };

  const handleEdit = (entity) => {
    setEditMode(true);
    setEditId(entity._id);
    setFormData({ title: entity.title, description: entity.description, video: entity.video });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/memes/${id}`);
      setEntities(entities.filter((entity) => entity._id !== id));
    } catch (error) {
      console.error('Error deleting entity:', error.message);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="video"
          value={formData.video}
          onChange={handleChange}
          placeholder="Video URL"
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editMode ? 'Update Entity' : 'Add Entity'}
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-bold">Entities:</h2>
        <ul className="space-y-2">
          {entities.map((entity) => (
            <li key={entity._id} className="p-2 border rounded">
              <strong>{entity.title}</strong>: {entity.description}
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(entity)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(entity._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddEntityForm;
