const mongoose = require('mongoose')

const GftSchema = mongoose.Schema({
    gft_name: {
        type: String,
        required: true,
        unique: true
    },
    gft_dtl: {
        type: String
    },
    gft_qty: {
        type: Number,
        required: true
    },
    gft_stck: {
        type: Number,
        required: true
    },
    gft_img: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Gift', GftSchema)