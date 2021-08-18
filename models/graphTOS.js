const mongoose = require('mongoose')
const {ObjectID} = require('mongodb')

const graphTOSSchema = new mongoose.Schema({                                                                                                                                                                                                                                                   
    typeOfService: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'TypeOfService'
    },
    budgetValues: [{
        type: Object,
        properties: {
          value: { type: Number },
          date: { type: String },
        },
        required: [value, date]
    }]
})

const GraphTOS = mongoose.model('GraphTOS', graphTOSSchema)

module.exports = GraphTOS