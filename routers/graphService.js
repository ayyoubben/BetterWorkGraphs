const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Dashboard = require('../models/admin')
const GraphService = require('../models/graphService')

router.post('/graphService', auth(Dashboard), async (req, res) => {
    const graphService = new GraphService({
        ...req.body
    })

    try {
        await graphService.save()
        res.status(201).send(graphService)
    } catch (e) {
        res.status(400).send(e)
    }
})

//get graphService by id
router.get('/graphService/:id',auth(Dashboard),async (req, res) => {
    const _id = req.params.id
    try {
        const graphService = await GraphService.findOne({_id})
            .populate({path: 'typeOfService', model: 'TypeOfService'})
            .populate({path: 'service', model: 'Service'})
        if (!graphService) {
            return res.status(404).send()
        }
        res.send(graphService)
    }catch (e) {
        res.status(500).send()
    }
})

router.patch('/graphService/:id', auth(Dashboard), async (req, res) => {
    const _id = req.params.id
    try {
        const graphService = await GraphService.findOne({_id})
            .populate({path: 'typeOfService', model: 'TypeOfService'})
            .populate({path: 'service', model: 'Service'})
        if (!graphService) {
            return res.status(404).send()
        }
        graphService.budgetValues.push(req.body.budget)
        graphService.save()
        res.send(graphService)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/graphService/:id', auth(Dashboard), async (req, res) => {
    const _id = req.params.id
    try {
        const graphService = await GraphService.findOneAndDelete({_id})
        if (!graphService) {
            return res.status(404).send()
        }
        res.send(graphService)
    } catch (e) {
        res.status(500).send()
    }
})

//get graphService by type
router.get('/graphService/:typeOfService', auth(Dashboard), async (req, res) => {
    const typeOfService = req.params.typeOfService
    try {
        const graphServices = await GraphService.find({typeOfService}).populate({path: 'service', model: 'Service'})
        if (!graphServices) {
            return res.status(404).send()
        }
        res.send(graphServices)
    }catch (e) {
        res.status(500).send()
    }
})

module.exports = router