const RnkModel = require('../models/rnkModel')

module.exports = {
    create: async (req, res) => {
        const {rnk_val, rnk_info} = req.body

        try {
            const Rnkexst = await RnkModel.findOne({rnk_val})

            if (Rnkexst) {
                res.json({error:`Rank already Exist...!`, statuscode:422})
            }
            else {
                const Rnk = await RnkModel.create({rnk_val, rnk_info})
                if (Rnk) {
                    res.json({success:`Rank added Successfully.`, statuscode:220, data:Rnk})
                }
                else {
                    res.json({error:`Rank addition Failed...!`, statuscode:423})
                }
            }
        } catch (error) {
            console.error(error)
        }
    },
    upload: async (req, res) => {},
    read: async (req, res) => {
        try {
            const Rnk = await RnkModel.find()
            res.json({message:`All Rank details fetched`, statuscode:200, data:Rnk})
        } catch (error) {
            console.error(error)
        }
    },
    update: async (req, res) => {},
    delete: async (req, res) => {},
}