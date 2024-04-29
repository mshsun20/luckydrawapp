const mongoose = require('mongoose')

const WnnrSchema = mongoose.Schema({
    wnnr_tckt: {
        type: String,
        required: true
    },
    wnnr_acc: {
        type: mongoose.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    wn_cntst: {
        type: mongoose.Types.ObjectId,
        ref: 'Contest',
        required: true
    },
    wn_rank: {
        type: mongoose.Types.ObjectId,
        ref: 'Rank',
        required: true
    },
    assigned_gift: {
        type: mongoose.Types.ObjectId,
        ref: 'Prize',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Winner', WnnrSchema)