const express = require('express');
const router = express.Router();
const TravelPlan = require('../models/travelPlan');

// all travel plans
router.get('/', async (req, res) => {
    try {
        const plans = await TravelPlan.find();
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET 
router.get('/:id', async (req, res) => {
    try {
        const plan = await TravelPlan.findById(req.params.id);
        if (!plan) {
            return res.status(404).json({ message: 'Travel plan not found' });
        }
        res.json(plan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CREATE 
router.post('/', async (req, res) => {
    const plan = new TravelPlan({
        destination: req.body.destination,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        activities: req.body.activities
    });

    try {
        const newPlan = await plan.save();
        res.status(201).json(newPlan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// UPDATE 
router.patch('/:id', async (req, res) => {
    try {
        const plan = await TravelPlan.findById(req.params.id);
        if (!plan) {
            return res.status(404).json({ message: 'Travel plan not found' });
        }

        if (req.body.destination) plan.destination = req.body.destination;
        if (req.body.startDate) plan.startDate = req.body.startDate;
        if (req.body.endDate) plan.endDate = req.body.endDate;
        if (req.body.activities) plan.activities = req.body.activities;

        const updatedPlan = await plan.save();
        res.json(updatedPlan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE 
router.delete('/:id', async (req, res) => {
    try {
        const plan = await TravelPlan.findById(req.params.id);
        if (!plan) {
            return res.status(404).json({ message: 'Travel plan not found' });
        }
        await plan.deleteOne();
        res.json({ message: 'Travel plan deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;