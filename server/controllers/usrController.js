const UsrModel = require('../models/usrModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saltRounds = 9
const salt = bcrypt.genSaltSync(saltRounds)

module.exports = {
    create: async (req, res) => {
        const {usr_unam, usr_pass, usr_name, usr_email, usr_phone, usr_type, usr_cmpny, usr_emp_code, usr_brnch, usr_org, usr_div, usr_dept, usr_desig, usr_status} = req.body
        const hashpass = bcrypt.hashSync(usr_pass, salt)
        // console.log(usr_pass)
        // console.log(hashpass)

        try {
            const Usrexst = await UsrModel.findOne({$or:[{usr_unam},{usr_email}]})
            if (Usrexst) {
                res.json({error:`User already Exists ...!`, statuscode:422})
            }
            else {
                const Usr = await UsrModel.create({usr_unam, usr_pass:hashpass, usr_name, usr_email, usr_phone, usr_type, usr_cmpny, usr_emp_code, usr_brnch, usr_org, usr_div, usr_dept, usr_desig, usr_status})
                if (Usr) {
                    res.json({success:`User added Successfully.`, statuscode:220, data:Usr})
                }
                else {
                    res.json({error:`User add Failed ...!`, statuscode:423})
                }
            }
        } catch (error) {
            console.error(error)
        }
    },
    login: async (req, res) => {
        // console.log(req.body)
        const {usr_ky, usr_pass} = req.body

        try {
            const Usr = await UsrModel.findOne({$or:[{usr_unam:usr_ky}, {usr_email:usr_ky}]})
            if (Usr) {
                const Ustat = bcrypt.compareSync(usr_pass, Usr.usr_pass)
                // console.log(Ustat)
                if (Ustat === true) {
                    const token = await Usr.generateToken()
                    res.json({success:`User Successfully logged In.`, statuscode:220, data:token})
                }
                else {
                    res.json({error:`Wrong Password...!`, statuscode:423})
                }
            }
            else {
                res.json({error:`User Not Found...!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    },
    sess: async (req, res) => {
        const token = req.params.tokn

        try {
            if (token !== null) {
                const verifytoken = jwt.verify(token, process.env.JWT_SECRET_KEY)
                // console.log(verifytoken)
                const usrdtl = await UsrModel.findOne({_id:verifytoken.uid, 'tokens.token': token})
                // console.log(usrdtl)
                if (usrdtl) {
                    res.json({success:`User Already Logged In.`, statuscode:220, user:usrdtl})
                }
                else {
                    res.json({error:`User Not Yet Loged In...!`, statuscode:422})
                }
            }
            else {
                res.json({error:`User Not Yet Loged In...!`, statuscode:423})
            }
        } catch (error) {
            console.error(error)
        }
    },
    logout: async (req, res) => {
        req.session.destroy((err) => res.redirect('/'))
        res.clearCookie('jwtoken', {path:'/'})
        res.clearCookie('connect.sid', {path:'/'})
    },
    upload: async (req, res) => {},
    read: async (req, res) => {
        try {
            const Usr = await UsrModel.find()
            res.json({message:`All User details fetched`, statuscode:200, data:Usr})
        } catch (error) {
            console.error(error)
        }
    },
    update: async (req, res) => {},
    chngpass: async (req, res) => {
        const uid = req.params.id
        const {usrpass} = req.body
        const hashpass = bcrypt.hashSync(usrpass, salt)

        try {
            const Usr = await UsrModel.findOneAndUpdate({_id:uid}, {usr_pass:hashpass}, {new:true})

            if (Usr) {
                res.json({success:`Password Successfully Changed.`, statuscode:220, user:Usr})
            }
            else {
                res.json({error:`Password couldn't be Changed...!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    },
    delete: async (req, res) => {
        const usrid = req.params.id
        // console.log(usrid)

        try {
            const Usr = await UsrModel.findByIdAndDelete(usrid)
            if (Usr) {
                res.json({success:`User Already Logged In.`, statuscode:220, user:Usr})
            }
            else {
                res.json({error:`User Not Yet Loged In...!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    }
}