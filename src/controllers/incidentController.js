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

export const getIncidentById = async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id);
        if (!incident) {
            return res.status(404).json({ message: 'Incident not found' });
        }
        res.status(200).json(incident);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Incident ID format' });
        }
        res.status(500).json({ message: 'Error fetching incident', error: error.message });
    }
};

export const deleteIncident = async (req, res) => {
    try {
        const incident = await Incident.findByIdAndDelete(req.params.id);
        if (!incident) {
            return res.status(404).json({ message: 'Incident not found' });
        }
        res.status(200).json({ message: 'Incident deleted successfully' });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Incident ID format' });
        }
        res.status(500).json({ message: 'Error deleting incident', error: error.message });
    }
};


export const updateIncident = async (req, res) => {
    const { title, description, severity } = req.body;
    if (!title && !description && !severity) {
        return res.status(400).json({ message: 'No update data provided for updation' });
    }
    if (severity && !['Low', 'Medium', 'High'].includes(severity)) {
        return res.status(400).json({ message: 'Invalid severity level' });
    }
    try {
        const updatedIncident = await Incident.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedIncident) {
            return res.status(404).json({ message: 'Incident not found' });
        }
        res.status(200).json(updatedIncident);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Incident ID format' });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: 'Validation Error', errors: messages });
        }
        res.status(500).json({ message: 'Error updating incident', error: error.message });
    }
};
