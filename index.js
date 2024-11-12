// Load environment variables from .env file
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
require('./dbConnections/connection');

const ServerFrameFind = express();

// Middleware
ServerFrameFind.use(cors());
ServerFrameFind.use(express.json());
ServerFrameFind.use('/uploads', express.static('./uploads'));
ServerFrameFind.use(router);

// Port configuration
const PORT = process.env.PORT || 3000;

// Start the server
ServerFrameFind.listen(PORT, () => {
    console.log(`ServerFrameFind started at port: ${PORT} and waiting for client requests!`);
});

// Basic endpoint to confirm server is running
ServerFrameFind.get('/', (req, res) => {
    res.status(200).send(`<h1 style="color:red;">ServerFrameFind started and waiting for client requests!</h1>`);
});
