// DEPENDENCIES 

const events = require('express').Router()
const db = require('../models')
const {Event} = db

//ROUTES 
//GET

events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll()
        res.status(200).json(foundEvents)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET BY ID

events.get('/:id', async(req, res) => {
    try{
        const foundEvent = await Event.findOne({
            where: { event_id: req.params.id }
        })
        res.status(200).json(foundEvent)
    } catch (err) {
        res.status(500).json(err)
    }
})

//CREATE 

events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'You have created a new Event',
            data: newEvent
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//UPDATE

events.put('/:id', async (req, res) => {
   try{
       const updateEvent = await Event.update(req.body, {
            where: { 
               event_id : req.params.id 
            }
       })
       res.status(200).json({
            message: `You have update ${updateEvent} `
       })
   } catch (err) {
       res.status(500).json(err)
   }
})

//DELETE 

events.delete('/:id', async(req, res) => {
    try{
        const deleteEvent = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `You have deleted ${deleteEvent}`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = events