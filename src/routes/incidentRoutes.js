import express from 'express';
import { getAllIncidents } from '../controllers/incidentController.js';
const router = express.Router();

router.get('/', getAllIncidents);

export default router;
