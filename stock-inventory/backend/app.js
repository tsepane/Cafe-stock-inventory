// server.js or app.js (backend)

const express = require('express');
const cors = require('cors');  // Import CORS

const app = express();

app.use(cors());              // Enable CORS for all routes
app.use(express.json());       // Enable JSON parsing for incoming requests

// Define routes here (e.g., app.get('/api/users', ...))

// Example route to fetch users in the backend (server.js or app.js)
app.get('/api/users', (req, res) => {
    // Replace with actual logic to get users from your database
    res.json([{ id: 1, name: 'John Doe' }]);  // Example response data
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
