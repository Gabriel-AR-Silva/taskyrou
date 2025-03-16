require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB}.dq476.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.MONGO_DB}`);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error}`);
        process.exit(1); // close the api if it fails
    }
} 

module.exports = { connectDB };