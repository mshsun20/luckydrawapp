const mongoose = require('mongoose')

const CntstSchema = mongoose.Schema({
    cntst_name: {
        type: String,
        required: true,
        unique: true
    },
    scheme_name: {
        type: String,
        required: true
    },
    state: {
        type: mongoose.Types.ObjectId,
        ref: 'State',
        required: true
    },
    cntst_start_dt: {
        type: Date
    },
    cntst_validity: {
        type: Number
    },
    cntst_status: {
        type: String
    },
    added_by: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    tckt_count: {
        type: Number
    },
    gft_alloc_status: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Contest', CntstSchema)