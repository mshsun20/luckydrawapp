const mongoose = require('mongoose')

const PrzSchema = mongoose.Schema({
    prz_cntst: {
        type: mongoose.Types.ObjectId,
        ref: 'Contest',
        required: true
    },
    prz_rank: {
        type: mongoose.Types.ObjectId,
        ref: 'Rank',
        required: true
    },
    prz_itm: {
        type: mongoose.Types.ObjectId,
        ref: 'Gift',
        required: true
    },
    prz_qty: {
        type: Number,
        required: true
    },
    prz_stck: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Prize', PrzSchema)