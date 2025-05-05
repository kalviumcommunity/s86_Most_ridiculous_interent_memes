import React from "react";

const MemeCard = () => {
    const entities = [
        {
            title: "Programmer Life",
            description: "When your code works without any bugs.",
            video: "https://www.w3schools.com/html/mov_bbb.mp4", // Replace with actual meme video URL
        },
        {
            title: "Debugging Problems",
            description: "Debugging: Solving mysteries created by yourself.",
            video: "https://www.w3schools.com/html/movie.mp4", // Replace with actual meme video URL
        },
        {
            title: "Coffee and Code",
            description: "Coffee is the ultimate bug fixer.",
            video: "https://www.w3schools.com/html/mov_bbb.mp4", // Replace with actual meme video URL
        },
        {
            title: "AI Assistant",
            description: "When AI answers your question before you ask it.",
            video: "https://www.w3schools.com/html/movie.mp4", // Replace with actual meme video URL
        },
    ];

    const styles = {
        body: {
            margin: 0,
            fontFamily: "'Arial', sans-serif",
            backgroundColor: "#e0f7fa", // Changed to light blue
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
    };

    const Card = ({ title, description, video }) => {
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
            </div>
        );
    };

    return (
        <div style={styles.body}>
            <div style={styles.app}>
                {entities.map((entity, index) => (
                    <Card key={index} {...entity} />
                ))}
            </div>
        </div>
    );
};

export default MemeCard;
