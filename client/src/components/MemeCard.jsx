import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MemeCard = () => {
  const [entities, setEntities] = useState([]); // State to store fetched memes
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Dummy data for testing

  useEffect(() => {
    // Fetch memes from the backend
    axios
      .get('http://localhost:3000/api/memes') // Ensure the endpoint matches the backend
      .then((response) => {
        setEntities(response.data); // Set data from the backend
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error('Error fetching memes:', error);
        setError('Failed to fetch memes. Please try again later.'); // Set error message
        setLoading(false); // Stop loading
      });
  }, []);

  // Conditional Rendering
  if (loading) return <p className="text-center text-lg">Loading memes...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;
  if (entities.length === 0) {
    return (
      <div>
        <p className="text-center text-lg">No memes available. Add some data to see them here!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {dummyData.map((meme) => (
            <div key={meme._id} className="p-4 border rounded shadow">
              <h2 className="font-bold text-lg">{meme.title}</h2>
              <p>{meme.description}</p>
              {meme.video && (
                <video className="mt-4 w-full" controls>
                  <source src={meme.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {entities.map((meme) => (
        <div key={meme._id} className="p-4 border rounded shadow">
          <h2 className="font-bold text-lg">{meme.title}</h2>
          <p>{meme.description}</p>
          {meme.video && (
            <video className="mt-4 w-full" controls>
              <source src={meme.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      ))}
    </div>
  );
};

export default MemeCard;
