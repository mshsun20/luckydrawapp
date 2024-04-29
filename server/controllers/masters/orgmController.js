const OrgmModel = require('../../models/masters/orgmModel')

module.exports = {
    create: async (req, res) => {
        console.log(req.body)
        const {org_code, org_name} = req.body

        try {
            const Orgmexst = await OrgmModel.findOne({org_code})

            if (Orgmexst) {
                res.json({error:`Id field couldn't be duplicate...!`, statuscode:422, data:Orgmexst})
            }
            else {
                const Orgm = await OrgmModel.create({org_code, org_name})
                if (Orgm) {
                    res.json({success:`Organisation added successfully.`, statuscode:220, data:Orgm})
                }
                else {
                    res.json({error:`Organisation addition failed.`, statuscode:423})
                }
            }
        } catch (error) {
            console.error(error)
        }
    },
    upload: async (req, res) => {},
    read: async (req, res) => {},
    update: async (req, res) => {},
    delete: async (req, res) => {}
}