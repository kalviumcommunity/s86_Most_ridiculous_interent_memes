import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MemeList() {
  const [memes, setMemes] = useState([]);
  const [newMeme, setNewMeme] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    // Fetch memes from the backend when the component mounts
    axios.get('http://localhost:3000/api/memes')
      .then(response => {
        setMemes(response.data); // Store the memes in the state
      })
      .catch(error => {
        console.error('Error fetching memes:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // POST request to create a new meme
    axios.post('http://localhost:3000/api/memes', newMeme)
      .then(response => {
        setMemes([...memes, response.data]); // Add new meme to state
      })
      .catch(error => {
        console.error('Error posting meme:', error);
      });
  };

  return (
    <div>
      <h1>Memes</h1>
      <ul>
        {memes.map((meme) => (
          <li key={meme._id}>{meme.title}: {meme.content}</li>
        ))}
      </ul>

      <h2>Create Meme</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newMeme.title}
          onChange={(e) => setNewMeme({ ...newMeme, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Content"
          value={newMeme.content}
          onChange={(e) => setNewMeme({ ...newMeme, content: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default MemeList;
