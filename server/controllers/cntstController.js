const CntstModel = require('../models/cntstModel')
const TcktModel = require('../models/tcktModel')
const PrzModel = require('../models/przModel')

module.exports = {
    create: async (req, res) => {
        const {cntst_name, scheme_name, state, cntst_start_dt, cntst_validity, added_by} = req.body

        try {
            const Cntst = await CntstModel.create({cntst_name, scheme_name, state, cntst_start_dt, cntst_validity, cntst_status:'Open', added_by, tckt_count:0, gft_alloc_status:'Not Allocated'})
            if (Cntst) {
                res.json({success:`Contest created Successfully.`, statuscode:220, data:Cntst})
            }
            else {
                res.json({error:`Contest creation Failed...!`, statuscode:423})
            }
        } catch (error) {
            console.error(error)
        }
    },
    upload: async (req, res) => {},
    read: async (req, res) => {
        try {
            const Cntst = await CntstModel.find().populate('added_by').populate('state')
            res.json({message:`All Contest details fetched`, statuscode:200, data:Cntst})
        } catch (error) {
            console.error(error)
        }
    },
    readOne: async (req, res) => {
        const cntstid = req.params.id

        try {
            const Cntst = await CntstModel.findOne({_id:cntstid}).populate('added_by').populate('state')
            res.json({message:`All Contest details fetched`, statuscode:200, data:Cntst})
        } catch (error) {
            console.error(error)
        }
    },
    // booked: async (req, res) => {
    //     try {
    //         const tcnt = await TcktModel.aggregate([{$group:{_id:'$booked_cntst', booked_count:{$count:{}}}}])
    //         // console.log(tcnt)
    //         res.json({message:`All Contest details fetched`, statuscode:200, data:tcnt})
    //     } catch (error) {
    //         console.error(error)
    //     }
    // },
    update: async (req, res) => {},
    updateallocstatfroall: async (req, res) => {
        try {
            // const Prz = await PrzModel.find().populate({path:`prz_cntst`})
            const Pstckcalc = await PrzModel.aggregate([{$group:{ _id:"$prz_cntst", totlQty:{$sum:"$prz_qty"}, totlStck:{$sum:"$prz_stck"},}}])
            // const Pstcktotl = Pstckcalc.filter(elm => elm.totlStck > 0)
            if (Pstckcalc) {
                Pstckcalc.forEach(async (elm, i) => {
                    if (elm.totlStck>0) {
                        await CntstModel.findOneAndUpdate({_id:elm._id}, {gft_alloc_status:'Allocated'}, {new:true})
                    }
                    else {
                        await CntstModel.findOneAndUpdate({_id:elm._id}, {gft_alloc_status:'Not Allocated'}, {new:true})
                    }
                })
                res.json({message:`Prize Allocation Exist.`, statuscode:220})
            }
            else {
                res.json({message:`Prize Allocation Required ...!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    },
    updategftstat: async (req, res) => {
        const cntstid = req.params.id

        try {
            const Cntst = await CntstModel.findOneAndUpdate({_id:cntstid}, {gft_alloc_status:'Not Allocated'}, {new:true})
            if (Cntst) {
                res.json({success:`Gift Allocation Status updated Successfully.`, statuscode:220, data:Cntst})
            }
            else {
                res.json({error:`Gift Allocation Status update Failed...!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    },
    delete: async (req, res) => {}
}
