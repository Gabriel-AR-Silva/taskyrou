require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('../db/config');
const taskRoutes = require('../routes/taskRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Configuração do CORS
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PUT,DELETE', 
    allowedHeaders: 'Content-Type,Authorization' 
}));

// Routes
app.use('/api/v1/tasks', taskRoutes);

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});