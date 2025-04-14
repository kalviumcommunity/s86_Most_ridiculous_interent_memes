const express = require('express');
const app = express();
const port = 3000;

// Define the /ping route
app.get('/ping', (req, res) => {
    res.send('pong');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
