const TcktModel = require('../models/tcktModel')
const AccModel = require('../models/accModel')
const CntstModel = require('../models/cntstModel')

module.exports = {
    create: async (req, res) => {
        const {booked_acc, booked_cntst, no_of_tckt, tckt_status} = req.body
        const nooftckts = parseInt(no_of_tckt)
        let Tckt

        try {
            const Acc = await AccModel.findOne({_id:booked_acc})
            const Cntst = await CntstModel.findOne({_id:booked_cntst})

            for (let i=0;i<nooftckts;i++) {
                Tckt = await TcktModel.create({booked_acc, booked_cntst, tckt_status})
            }

            if (Tckt) {
                const UpdtAcc = await AccModel.findOneAndUpdate({_id:booked_acc}, {booked_tckt:Acc.booked_tckt+nooftckts})
                const UpdtCntst = await CntstModel.findOneAndUpdate({_id:booked_cntst}, {tckt_count:Cntst.tckt_count+nooftckts})
                if (UpdtAcc&&UpdtCntst) {
                    res.json({success:`Ticket created & counts added Successfully.`, statuscode:220, data:Tckt})
                }
                else {
                    res.json({success:`Only Ticket created Successfully.`, statuscode:223, data:Tckt})
                }
            }
            else {
                res.json({error:`Ticket creation Failed...!`, statuscode:423})
            }
        } catch (error) {
            console.error(error)
        }
    },
    upload: async (req, res) => {},
    read: async (req, res) => {
        try {
            // const Tckt = await TcktModel.find().populate({path:'booked_acc', populate:{path:'added_by'}}).populate({path:'booked_cntst', populate:[{path:'assigned_gift'},{path:'added_by'}]})
            const Tckt = await TcktModel.find().populate({path:'booked_acc', populate:{path:'added_by'}}).populate({path:'booked_cntst', populate:[{path:'added_by'}]})
            res.json({message:`All Tickets fetched`, statuscode:200, data:Tckt})
        } catch (error) {
            console.error(error)
        }
    },
    readOne: async (req, res) => {},
    chckcntst: async (req, res) => {
        const cntstid = req.params.id
        // console.log(cntstid)

        try {
            const Tckt = await TcktModel.find().populate({path:'booked_cntst', match:{_id:cntstid}, populate:[{path:'added_by'}]}).populate({path:'booked_acc', populate:{path:'added_by'}})
            // console.log(Tckt)
            const Tcktexst = Tckt.filter(elm => elm.booked_cntst!==null)

            if (Tcktexst.length > 0) {
                res.json({error:`Contest Already have Tickets.`, statuscode:220, data:Tcktexst})
            }
            else {
                res.json({error:`Contest Doesn't have any Ticket...!`, statuscode:423})
            }
        } catch (error) {
            console.error(error)
        }
    },
    update: async (req, res) => {},
    delete: async (req, res) => {},
    deleteslct: async (req, res) => {
        const tcktno = req.params.id

        try {
            const Tcktexts = await TcktModel.findOne({tckt_no:tcktno})
            const Acc = await AccModel.findOne({_id:Tcktexts.booked_acc})
            const Cntst = await CntstModel.findOne({_id:Tcktexts.booked_cntst})
            if (Tcktexts) {
                const accid = Acc._id
                const cntstid = Cntst._id
                const Tckt = await TcktModel.deleteMany({$and: [{booked_acc:accid}, {booked_cntst:cntstid}]})
                // console.log(Tckt.deletedCount)
                if (Tckt) {
                    const UpdtAcc = await AccModel.findOneAndUpdate({_id:accid}, {booked_tckt:(Acc.booked_tckt-Tckt.deletedCount)}, {new:true})
                    const UpdtCntst = await CntstModel.findOneAndUpdate({_id:cntstid}, {tckt_count:(Cntst.tckt_count-Tckt.deletedCount)}, {new:true})
                    if (UpdtAcc&&UpdtCntst) {
                        res.json({success:`${Tckt.deletedCount} tickets removed and Counts updated on Account and Contest table successfully.`, statuscode:220, data:UpdtCntst})
                    }
                    else {
                        res.json({error:`Only ${Tckt.deletedCount} tickets have been removed successfully.`, statuscode:422})
                    }
                }
                else {
                    res.json({error:`No ticket has been removed yet...!`, statuscode:423})
                }
            }
            else {
                res.json({error:`This ticket doesn't exist...!`, statuscode:424})
            }
        } catch (error) {
            console.error(error)
        }
    }
}