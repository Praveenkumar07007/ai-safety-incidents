import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    severity: {
        type: String,
        required: [true, 'Severity is required'],
        enum: {
            values: ['Low', 'Medium', 'High'],
            message: '{VALUE} is not a supported level (Low, Medium, High)',
        },
    },
    reported_at: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

incidentSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

const Incident = mongoose.model('Incident', incidentSchema);

export default Incident;
