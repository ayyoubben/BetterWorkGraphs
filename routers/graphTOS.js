const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Dashboard = require('../models/admin')
const GraphTOS = require('../models/graphTOS')

router.post('/graphTOS', auth(Dashboard), async (req, res) => {
    const graphTOS = new GraphTOS({
        ...req.body
    })

    try {
        await graphTOS.save()
        res.status(201).send(graphTOS)
    } catch (e) {
        res.status(400).send(e)
    }
})

//get graphTOS by id
router.get('/graphTOS/:id',auth(Dashboard),async (req, res) => {
    const _id = req.params.id
    try {
        const graphTOS = await GraphTOS.findOne({_id}).populate({path: 'typeOfService', model: 'TypeOfService'})
        if (!graphTOS) {
            return res.status(404).send()
        }
        res.send(graphTOS)
    }catch (e) {
        res.status(500).send()
    }
})

router.patch('/graphTOS/:id', auth(Dashboard), async (req, res) => {
    const _id = req.params.id
    try {
        const graphTOS = await GraphTOS.findOne({_id}).populate({path: 'typeOfService', model: 'TypeOfService'})
        if (!graphTOS) {
            return res.status(404).send()
        }
        graphTOS.budgetValues.push(req.body.budget)
        graphTOS.save()
        res.send(graphTOS)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/graphTOS/:id', auth(Dashboard), async (req, res) => {
    const _id = req.params.id
    try {
        const graphTOS = await GraphTOS.findOneAndDelete({_id})
        if (!graphTOS) {
            return res.status(404).send()
        }
        res.send(graphTOS)
    } catch (e) {
        res.status(500).send()
    }
})

//get All graphs
router.get('/graphTOS', auth(Dashboard), async (req, res) => {
    try {
        const graphTOSs = await GraphTOS.find({}).populate({path: 'typeOfService', model: 'TypeOfService'})
        if (!graphTOSs) {
            return res.status(404).send()
        }
        res.send(graphTOSs)
    }catch (e) {
        res.status(500).send()
    }
})

module.exports = router