//DEPENDENCIES
const stages = require('express').Router()
const db = require('../models')
// const stage = require('../models/stage');
// const { get } = require('./bands_controller')
const {Stage, Event} = db
const {Op} = require('sequelize')

//ROUTES

stages.get('/', async (req, res) => {
    try{
        const foundStages = await Stage.findAll({
            where: {
                stage_name: { [Op.like]: `%${req.query.stage_name ? req.query.stage_name : ''}%` }
            }
        })
        res.status(200).json(foundStages)
    } catch (err){
        res.status(500).json(err)
    }
});

//GET BY ID

stages.get('/:id', async(req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { stage_name: req.params.name },
            include:{ 
                model: Event, 
                as: "events",
                through: { attributes: [] }
            },
            order: [
                [{ model: Event, as: "events" }, 'date', 'ASC'],
            ]
        })
        res.status(200).json(foundStage)
    }catch (err) {
        res.status(500).json(err)
    }
});

//CREATE 

stages.post('/', async(req, res) => {
    try{
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'You have add a new Stage',
            data: newStage
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

//UPDATE

stages.put('/:id', async(req, res) => {
    try{
        const updateStage = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `You have update ${updateStage}`
        })
    } catch (err){
        res.status(500).json(err)
    }
});

//DELETE

stages.delete('/:id', async (req, res) => {
    try{
        const deleteStage = await Stage.destroy({
            where: { 
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `You have delete ${deleteStage}`
        })
    }catch(err){
        res.status(500).json(err)
    }
});

module.exports = stages