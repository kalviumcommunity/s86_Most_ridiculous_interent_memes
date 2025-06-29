import React, { useState, useEffect } from "react";
import axios from "axios";

const MemeCard = () => {
  const [entities, setEntities] = useState([]);

  // Fetch entities from API
  const fetchEntities = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/memes");
      setEntities(response.data);
    } catch (error) {
      console.error("Error fetching memes:", error.message);
    }
  };

  // Delete functionality
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/memes/${id}`);
      setEntities(entities.filter((entity) => entity._id !== id)); // Update state
    } catch (error) {
      console.error("Error deleting entity:", error.message);
    }
  };

  useEffect(() => {
    fetchEntities(); // Fetch entities on component mount
  }, []);

  const styles = {
    body: {
      margin: 0,
      fontFamily: "'Arial', sans-serif",
      backgroundColor: "#e0f7fa",
      color: "#333",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    },
    app: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      padding: "20px",
      width: "100%",
      maxWidth: "1000px",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      position: "relative",
    },
    cardHover: {
      transform: "scale(1.05)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    },
    video: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
    },
    content: {
      padding: "15px",
    },
    title: {
      fontSize: "1.3em",
      margin: "10px 0",
      color: "#2c3e50",
    },
    description: {
      fontSize: "1em",
      margin: "10px 0",
      color: "#555",
    },
    label: {
      fontWeight: "bold",
      color: "#007bff",
    },
    deleteButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      backgroundColor: "#e74c3c",
      color: "#fff",
      border: "none",
      padding: "5px 10px",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  const Card = ({ _id, title, description, video }) => {
    return (
      <div
        className="card"
        style={styles.card}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = styles.cardHover.transform;
          e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = "";
        }}
      >
        <video style={styles.video} controls>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div style={styles.content}>
          <p style={styles.label}>Title:</p>
          <h2 style={styles.title}>{title}</h2>
          <p style={styles.label}>Description:</p>
          <p style={styles.description}>{description}</p>
        </div>
        <button
          style={styles.deleteButton}
          onClick={() => handleDelete(_id)}
        >
          Delete
        </button>
      </div>
    );
  };

  return (
    <div style={styles.body}>
      <div style={styles.app}>
        {entities.map((entity) => (
          <Card key={entity._id} {...entity} />
        ))}
      </div>
    </div>
  );
};

export default MemeCard;
