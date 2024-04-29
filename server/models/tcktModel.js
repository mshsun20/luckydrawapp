const mongoose = require('mongoose')
const mongoSeq = require('mongoose-sequence')

const TcktSchema = mongoose.Schema({
    booked_acc: {
        type: mongoose.Types.ObjectId,
        ref: 'Account'
    },
    booked_cntst: {
        type: mongoose.Types.ObjectId,
        ref: 'Contest'
    },
    tckt_status: {
        type: String
    }
}, {
    timestamps: true
})

TcktSchema.plugin(mongoSeq(mongoose), {inc_field:'tckt_no', start_seq:10000000, inc_amount:1})

module.exports = mongoose.model('Ticket', TcktSchema)