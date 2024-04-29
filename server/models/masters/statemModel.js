const mongoose = require('mongoose')

const StatemSchema = mongoose.Schema({
    state_code: {
        type: String,
        required: true,
        unique: true
    },
    state_name: {
        type: String,
        required: true
    },
    state_abbr: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('State', StatemSchema)