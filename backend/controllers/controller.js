require('dotenv').config();
const Event = require('../models/schema');

const hardCodedUsername = process.env.APPUSERNAME;
const hardCodedPassword = process.env.PASSWORD;

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body

        if (username === hardCodedUsername && password === hardCodedPassword) {
            return res.json({ success: true, message: 'Login successful!' })
        } else {
            return res.json({ success: false, message: 'Invalid credentials.' })
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.json({ success: false, message: 'An error occurred' })
    }
};

exports.createEvent = async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.json({
            success: true,
            data: newEvent
        });
    } catch (err) {
        res.json({
            error: err,
            success: false
        });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find(); 
        res.json({
            success: true,
            data: events
        });
    } catch (err) {
        res.json({
            error: err,
            success: false
        });
    }
}

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.json({ success: false, message: 'Event not found' });
        }
        res.json({
            success: true,
            data: event
        });
    } catch (err) {
        res.json({
            error: err,
            success: false
        });
    }
};

exports.updateEventById = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!updatedEvent) {
            return res.json({ success: false, message: 'Event not found' });
        }
        res.json({
            success: true,
            data: updatedEvent
        });
    } catch (err) {
        res.json({
            error: err,
            success: false
        });
    }
};

exports.deleteEventById = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ success: false, message: 'Event not found' })
        }
        res.json({
            success: true,
            message: 'Event deleted successfully!',
            data: deletedEvent
        });
    } catch (err) {
        res.json({
            error: err,
            success: false
        });
    }
};