import express from 'express';
import { getAllIncidents, createIncident, getIncidentById, deleteIncident, updateIncident } from '../controllers/incidentController.js';
const router = express.Router();


router.get('/', getAllIncidents);
router.post('/', createIncident);
router.get('/:id', getIncidentById);
router.delete('/:id', deleteIncident);
router.put('/:id', updateIncident);

export default router;
