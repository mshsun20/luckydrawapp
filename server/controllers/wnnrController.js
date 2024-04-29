const WnnrModel = require('../models/wnnrModel')
const CntstModel = require('../models/cntstModel')

module.exports = {
    create: async (req, res) => {
        const {wnnr_tckt, wnnr_acc, wn_cntst, wn_rank, assigned_gift} = req.body
        // console.log(req.body)

        try {
            const Wnnr = await WnnrModel.create({wnnr_tckt:String(wnnr_tckt), wnnr_acc, wn_cntst, wn_rank, assigned_gift})
            if (Wnnr) {
                res.json({message:`Winner added Successfully.`, statuscode:220, data:Wnnr})
            }
            else {
                res.json({message:`Winner addition Failed...!`, statuscode:423})
            }
        } catch (error) {
            console.error(error)
        }
    },
    upload: async (req, res) => {},
    read: async (req, res) => {
        try {
            const Wnnr = await WnnrModel.find().populate({path:'wnnr_acc'}).populate({path:'wn_cntst'}).populate({path:'wn_rank'}).populate({path:'assigned_gift', populate:[{path:'prz_itm'}]})
            // console.log(Wnnr)
            res.json({message:`All Winner details fetched`, statuscode:200, data:Wnnr})
        } catch (error) {
            console.error(error)
        }
    },
    readOne: async (req, res) => {},
    chckcntst: async (req, res) => {
        const cntstid = req.params.id
        // console.log(cntstid)

        try {
            // const Cntst = await CntstModel.findOne({_id:cntstid})
            const Wnnr = await WnnrModel.find({wn_cntst:cntstid}).populate('wnnr_acc').populate('wn_cntst').populate('wn_rank').populate({path:'assigned_gift', populate:{path:'prz_itm'}})
            // console.log(Wnnr)
            res.json({message:`All Winner details fetched`, statuscode:200, data:Wnnr})
        } catch (error) {
            console.error(error)
        }
    },
    chcktckt: async (req, res) => {
        const tcktno = req.params.id

        try {
            const Wnnr = await WnnrModel.findOne({wnnr_tckt:String(tcktno)}).populate('wnnr_acc').populate('wn_cntst').populate('wn_rank').populate({path:'assigned_gift', populate:{path:'prz_itm'}})
            // console.log(Wnnr)
            res.json({message:`All Winner details fetched`, statuscode:200, data:Wnnr})
        } catch (error) {
            console.error(error)
        }
    },
    update: async (req, res) => {},
    delete: async (req, res) => {},
    deleteall: async (req, res) => {
        try {
            const Wnnr = await WnnrModel.deleteMany({})
            // console.log(Wnnr)
            if (Wnnr) {
                res.json({success:`All Winner details Removed Successfully.`, statuscode:220, data:Wnnr})
            }
            else {
                res.json({error:`All Winner details Removal Failed ...!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    }
}