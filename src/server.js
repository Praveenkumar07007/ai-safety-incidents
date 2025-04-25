import dotenv from 'dotenv';
dotenv.config();
import connectDB from '../config/db.js';
import express from 'express';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const startServer = async () => {
    try {
        await connectDB();
        const port = PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
