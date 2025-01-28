const mongoose = require('mongoose');

const travelPlanSchema = new mongoose.Schema({
    destination: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    activities: [{
        type: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('TravelPlan', travelPlanSchema);