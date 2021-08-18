const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Dashboard = require('../models/admin')
const GraphAll = require('../models/graphAll')

router.post('/graphAll', auth(Dashboard), async (req, res) => {
    const graphAll = new GraphAll({
        ...req.body
    })

    try {
        await graphAll.save()
        res.status(201).send(graphAll)
    } catch (e) {
        res.status(400).send(e)
    }
})

//get graphAll
router.get('/graphAll',auth(Dashboard),async (req, res) => {
    try {
        const graphAll = await GraphAll.findOne({})
        if (!graphAll) {
            return res.status(404).send()
        }
        res.send(graphAll)
    }catch (e) {
        res.status(500).send()
    }
})

router.patch('/graphAll', auth(Dashboard), async (req, res) => {
    try {
        const graphAll = await GraphAll.findOne({})
        if (!graphAll) {
            return res.status(404).send()
        }
        graphAll.budgetValues.push(req.body.budget)
        graphAll.save()
        res.send(graphAll)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/graphAll/:id', auth(Dashboard), async (req, res) => {
    const _id = req.params.id
    try {
        const graphAll = await GraphAll.findOneAndDelete({_id})
        if (!graphAll) {
            return res.status(404).send()
        }
        res.send(graphAll)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router