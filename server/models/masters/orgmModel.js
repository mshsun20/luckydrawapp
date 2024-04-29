const mongoose = require('mongoose')
// const mongoSeq = require('mongoose-sequence')

const OrgmSchema = mongoose.Schema({
    org_code: {
        type: Number,
        required: true,
        unique: true
    },
    org_name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

// OrgmSchema.plugin(mongoSeq(mongoose), {inc_field:'orgid', start_seq:1, inc_amount:1})

module.exports = mongoose.model('Organisation', OrgmSchema)