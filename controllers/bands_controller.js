//DEPENDENCIES 

const bands = require("express").Router()
const db = require('../models')
const { Band, Meet_greet, Event, Set_time } = db
const { Op } = require('sequelize')

//GET

bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [ [ 'available_start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundBands)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ID

// bands.get('/:id', async (req, res) => {
//     try{
//         const foundBand = await Band.findOne({
//             where: { band_id: req.params.id }
//         })
//         res.status(200).json(foundBand)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

bands.get('/:name', async (req, res) => {
    try{
        const foundBand = await Band.findOne({
            where: { name: req.params.name },
            include: [
                { 
                    model: Meet_greet, 
                    as: 'meet_greets',
                    include: { 
                        model: Event, 
                        as: 'event', 
                        where: { 
                            name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } 
                        }
                    }
                },
                {
                    model: Set_time,
                    as: 'set_times',
                    include: { 
                        model: Event, 
                        as: 'event', 
                        where: { 
                            name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } 
                        }
                    }
                }
            ]
        })
        res.status(200).json(foundBand)
    } catch (err) {
        res.status(500).json(err)
    }
})

//CREATE 

bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(200).json({
            message: 'You have created a New Band!',
            data: newBand
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//UPDATE

bands.put('/:id', async (req, res) => {
    try {
        const updateBands = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `You have update ${updateBands} Band!`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//DELETE 

bands.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})



//EXPORT
module.exports = bands