import Incident from '../models/incidentModel.js';

export const getAllIncidents = async (req, res) => {
    try {
        const incidents = await Incident.find();
        res.status(200).json(incidents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching incidents', error: error.message });
    }
};


export const createIncident = async (req, res) => {
    const { title, description, severity } = req.body;
    if (!title || !description || !severity) {
        return res.status(400).json({ message: 'Missing required fields: title, description, severity' });
    }
    if (!['Low', 'Medium', 'High'].includes(severity)) {
        return res.status(400).json({ message: 'Invalid severity level. Must be (low, Medium, high)' });
    }
    try {
        const newIncident = new Incident({ title, description, severity });
        const savedIncident = await newIncident.save();
        res.status(201).json(savedIncident);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation Error', errors: error.errors });
        }
        res.status(500).json({ message: 'Error creating incident', error: error.message });
    }
};
