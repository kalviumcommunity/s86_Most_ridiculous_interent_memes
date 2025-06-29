import React, { useState } from 'react';
import axios from 'axios';

const AddEntityForm = () => {
  const [formData, setFormData] = useState({ title: '', description: '', video: '' });
  const [entities, setEntities] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/memes', formData);
      setEntities([...entities, response.data]);
      setFormData({ title: '', description: '', video: '' }); // Clear form
    } catch (error) {
      console.error('Error adding entity:', error.message);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit } className="space-y-4">
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Entity
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-bold">Added Entities:</h2>
        <ul className="space-y-2">
          {entities.map((entity, index) => (
            <li key={index} className="p-2 border rounded">
              <strong>{entity.title}</strong>: {entity.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddEntityForm;
