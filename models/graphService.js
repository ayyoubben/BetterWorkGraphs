const mongoose = require('mongoose')
const {ObjectID} = require('mongodb')

const graphServiceSchema = new mongoose.Schema({                                                                                                                                                                                                                                                   
    typeOfService: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'TypeOfService'
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Service'
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

const GraphService = mongoose.model('GraphService', graphServiceSchema)

module.exports = GraphService