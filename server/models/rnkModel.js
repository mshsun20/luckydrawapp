const mongoose = require('mongoose')

const RnkSchema = mongoose.Schema({
    rnk_val: {
        type: Number,
        required: true,
        unique: true
    },
    rnk_info: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Rank', RnkSchema)