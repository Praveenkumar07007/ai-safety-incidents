import express from 'express';
import incidentRoutes from './routes/incidentRoutes.js';
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use('/api/v1/incidents', incidentRoutes);

export default app;
