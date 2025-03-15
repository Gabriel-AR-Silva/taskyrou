require('dotenv').config();
const express = require('express');
const { connectDB } = require('../db/config');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});