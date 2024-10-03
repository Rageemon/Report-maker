const express = require('express');
const {login,createEvent,getAllEvents,getEventById,updateEventById,deleteEventById} = require('../controllers/controller')

const router = express.Router();

router.post('/events', createEvent)
router.post('/login', login)
router.get('/events', getAllEvents)
router.get('/events/:id', getEventById)
router.put('/events/:id', updateEventById)
router.delete('/events/:id', deleteEventById)
module.exports = router