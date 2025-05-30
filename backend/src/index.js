require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('../db/config');

const attributeRoutes = require('../routes/attributeRoute');
const configurationRoutes = require('../routes/configurationRoute');
const listRoutes = require('../routes/listRoute');
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
app.use('/api/v1/attributes', attributeRoutes);
app.use('/api/v1/configurations', configurationRoutes);
app.use('/api/v1/lists', listRoutes);
app.use('/api/v1/tasks', taskRoutes);

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});