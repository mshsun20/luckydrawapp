const PrzModel = require('../models/przModel')
const GftModel = require('../models/gftModel')
const CntstModel = require('../models/cntstModel')

module.exports = {
    create: async (req, res) => {
        const {prz_cntst, prz_rank, prz_itm, prz_qty} = req.body
        // console.log(req.body);

        try {
            const Przexst = await PrzModel.find({$and: [{prz_cntst:prz_cntst}, {prz_rank:prz_rank}]}).populate({path:'prz_cntst'}).populate({path:'prz_rank'})
            const Gftstck = await GftModel.findOne({_id:prz_itm})
            // console.log(Przexst)

            if (Przexst.length!==0) {
                res.json({error:`Prize allocation already Exist...!`, statuscode:422})
            }
            else {
                const Prz = await PrzModel.create({prz_cntst, prz_rank, prz_itm, prz_qty, prz_stck:prz_qty})
                const Gftupdt = await GftModel.findByIdAndUpdate(prz_itm, {gft_stck:(Gftstck.gft_stck-prz_qty)}, {new:true})
                const Cntstupdt = await CntstModel.findByIdAndUpdate(prz_cntst, {gft_alloc_status:'Allocated'}, {new:true})
                if (Prz&&Gftupdt&&Cntstupdt) {
                    res.json({success:`Prize allocated Successfully.`, statuscode:220, data:Prz})
                }
                else {
                    res.json({error:`Prize allocation Failed...!`, statuscode:423})
                }
            }
        } catch (error) {
            console.error(error)
        }
    },
    upload: async (req, res) => {},
    read: async (req, res) => {
        try {
            const Prz = await PrzModel.find().populate('prz_cntst').populate('prz_rank').populate('prz_itm')
            res.json({message:`All Prize details fetched`, statuscode:200, data:Prz})
        } catch (error) {
            console.error(error)
        }
    },
    readOne: async (req, res) => {
        const przid = req.params.id

        try {
            const Prz = await PrzModel.findOne({_id:przid}).populate('prz_cntst').populate('prz_rank').populate('prz_itm')
            res.json({message:`All Prize details fetched`, statuscode:200, data:Prz})
        } catch (error) {
            console.error(error)
        }
    },
    chckcntst: async (req, res) => {
        const cntstid = req.params.id
        // console.log(cntstid)

        try {
            const Prz = await PrzModel.find().populate({path:'prz_cntst', match:{_id:cntstid}, populate:[{path:'added_by'}]}).populate({path:'prz_rank'}).populate('prz_itm')
            // const Prz = await PrzModel.find().populate({path:'prz_cntst', match:{_id:cntstid}, populate:[{path:'added_by'}]}).populate({path:'prz_rank', sorted:{$sort:1}}).populate('prz_itm')
            const Przexst = await Prz.filter(elm => elm.prz_cntst!==null)
            if (Przexst.length > 0) {
                res.json({message:`Prize Already Allocated to this Contest`, statuscode:200, data:Przexst})
            }
            else {
                res.json({error:`Prize allocation is Pending for this Contest...!`, statuscode:423})
            }
        } catch (error) {
            console.error(error)
        }
    },
    stckcalc: async (req, res) => {
        const cntstid = req.params.id

        try {
            const Pstckcalc = await PrzModel.aggregate([{$group:{ _id:"$prz_cntst", totlQty:{$sum:"$prz_qty"}, totlStck:{$sum:"$prz_stck"},}}])
            const Pstcktotl = Pstckcalc.filter(elm => String(elm._id)===cntstid)
            // console.log(Pstcktotl.length)
            if (Pstcktotl.length > 0) {
                res.json({message:`Prize Qty & Stock Exist for the Contest.`, statuscode:220, data:Pstcktotl})
            }
            else {
                res.json({message:`Prize Qty & Stock are Empty for the Contest...!`, statuscode:423})
            }
        } catch (error) {
            console.error(error)
        }
    },
    edtstck: async (req, res) => {
        const przid = req.params.id
        const {prz_stck} = req.body

        try {
            const Prz = await PrzModel.findByIdAndUpdate(przid, {prz_stck}, {new:true})
            if (Prz) {
                res.json({success:`Prize Stock Updated Successfully.`, statuscode:220, data:Prz})
            }
            else {
                res.json({error:`Prize Stock Update Failed...!`, statuscode:423})
            }
        } catch (error) {
            console.error(error)
        }
    },
    update: async (req, res) => {
        const przid = req.params.id
        // console.log(req.body)
        const {prz_cntst, prz_rank} = req.body
        
        try {
            const Prz = await PrzModel.updateOne({_id:przid}, {prz_cntst, prz_rank}, {new:true})
            if (Prz) {
                res.json({success:`Prize data Updated Successfully.`, statuscode:220, data:Prz})
            }
            else {
                res.json({error:`Prize data Update Failed...!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    },
    updatestck: async (req, res) => {
        const przid = req.params.id
        // console.log(req.body)
        const {prz_cntst, prz_rank, prz_itm, qty} = req.body
        
        try {
            const Gftstck = await GftModel.findOne({_id:prz_itm})
            const Prz = await PrzModel.updateOne({_id:przid}, {prz_cntst, prz_rank, prz_itm}, {new:true})
            const Gftupdt = await GftModel.findByIdAndUpdate(prz_itm, {gft_stck:(Gftstck.gft_stck-qty)}, {new:true})
            if (Prz&&Gftupdt) {
                const Przqty = await PrzModel.updateOne({_id:przid}, {$inc:{prz_qty:qty}}, {new:true})
                if (Przqty) {
                    res.json({success:`Prize data Updated Successfully.`, statuscode:220, data:Prz})
                }
                else {
                    res.json({error:`Prize data Update Failed...!`, statuscode:422})
                }
            }
            else {
                res.json({error:`Prize data Update Failed...!`, statuscode:423})
            }
        } catch (error) {
            console.error(error)
        }
    },
    addstck: async (req, res) => {
        const przid = req.params.id
        const {prz_stck, prz_itm} = req.body

        try {
            const Prz = await PrzModel.updateOne({_id:przid}, {$inc:{prz_qty:prz_stck, prz_stck:prz_stck}}, {new:true})
            const Gft = await GftModel.updateOne({_id:prz_itm}, {$inc:{gft_stck:-prz_stck}}, {new:true})

            if (Prz&&Gft) {
                res.json({success:`${prz_stck} Prizes Added Successfully.`, statuscode:220, data:Prz})
            }
            else {
                res.json({error:`Prizes Addition Failed...!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    },
    rmvstck: async (req, res) => {
        const przid = req.params.id
        const {prz_stck, prz_itm} = req.body

        try {
            const Prz = await PrzModel.updateOne({_id:przid}, {$inc:{prz_qty:-prz_stck, prz_stck:-prz_stck}}, {new:true})
            const Gft = await GftModel.updateOne({_id:prz_itm}, {$inc:{gft_stck:prz_stck}}, {new:true})

            if (Prz&&Gft) {
                res.json({success:`${prz_stck} Prizes Returned Successfully.`, statuscode:220, data:Prz})
            }
            else {
                res.json({error:`Prizes Return Failed...!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    },
    addtrnsfr: async (req, res) => {
        const przid = req.params.id
        const {prz_stck} = req.body

        try {
            const Prz = await PrzModel.updateOne({_id:przid}, {$inc:{prz_qty:-prz_stck, prz_stck:prz_stck}}, {new:true})

            if (Prz) {
                res.json({success:`${prz_stck} Prizes Added Successfully.`, statuscode:220, data:Prz})
            }
            else {
                res.json({error:`Prizes Addition Failed...!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    },
    rmvtrnsfr: async (req, res) => {
        const przid = req.params.id
        const {prz_stck} = req.body

        try {
            const Prz = await PrzModel.updateOne({_id:przid}, {$inc:{prz_qty:prz_stck, prz_stck:-prz_stck}}, {new:true})

            if (Prz) {
                res.json({success:`${prz_stck} Prizes Returned Successfully.`, statuscode:220, data:Prz})
            }
            else {
                res.json({error:`Prizes Return Failed...!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    },
    delete: async (req, res) => {}
}