const GftModel = require('../models/gftModel')

module.exports = {
    create: async (req, res) => {
        console.log(req.body)
        console.log(req.file)
        const {gft_name, gft_dtl, gft_qty} = req.body
        const {filename} = req.file

        try {
            const Gftexst = await GftModel.findOne({gft_name})
            if (Gftexst) {
                res.json({error:`Gift Item already Exist...!`, statuscode:422})
            }
            else {
                const Gft = await GftModel.create({gft_name, gft_dtl, gft_qty, gft_stck:gft_qty, gft_img:filename})
                if (Gft) {
                    res.json({success:`Gift Item created Successfully.`, statuscode:220, data:Gft})
                }
                else {
                    res.json({error:`Gift Item creation Failed...!`, statuscode:423})
                }
            }
        } catch (error) {
            console.error(error)
        }
    },
    upload: async (req, res) => {},
    read: async (req, res) => {
        try {
            const Gft = await GftModel.find()
            res.json({message:`All Gift details fetched`, statuscode:200, data:Gft})
        } catch (error) {
            console.error(error)
        }
    },
    readOne: async (req, res) => {
        const gid = req.params.id
        // console.log(gid)

        try {
            const Gft = await GftModel.findOne({_id:gid})
            res.json({message:`All Gift details fetched`, statuscode:200, data:Gft})
        } catch (error) {
            console.error(error)
        }
    },
    update: async (req, res) => {},
    delete: async (req, res) => {},
}