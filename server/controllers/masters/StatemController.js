const StatemModel = require('../../models/masters/statemModel')

module.exports = {
    create: async (req, res) => {
        const {state_code, state_name, state_abbr} = req.body

        try {
            const Statemexst = await StatemModel.findOne({$or:[{state_code}, {state_name}]})

            if (Statemexst) {
                res.json({error:'State already Exist ...!', statuscode:422})
            }
            else {
                const Statem = await StatemModel.create({state_code, state_name, state_abbr})
                if (Statem) {
                    res.json({success:'State successfully added.', statuscode:220, data:Statem})
                }
                else {
                    res.json({error:'State could not be added.', statuscode:423})
                }
            }
        } catch (error) {
            console.error(error)
        }
    },
    upload: async (req, res) => {},
    read: async (req, res) => {
        try {
            const Statem = await StatemModel.find()
            res.json({message:'All States data fetched successfully.', statuscode:220, data:Statem})
        } catch (error) {
            console.error(error)
        }
    },
    update: async (req, res) => {},
    delete: async (req, res) => {},
}