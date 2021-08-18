const mongoose = require('mongoose')
const {ObjectID} = require('mongodb')

const graphAllSchema = new mongoose.Schema({
    budgetValues: [{
        type: Object,
        properties: {
          value: { type: Number },
          date: { type: String },
        },
        required: [value, date]
    }]
})

const GraphAll = mongoose.model('GraphAll', graphAllSchema)

module.exports = GraphAll