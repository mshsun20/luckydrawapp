const nodemailer = require("nodemailer")
const UsrModel = require('../models/usrModel')
const RndCodeModel = require('../models/rndcodeModel')

module.exports = {
    forgetpass: async (req, res) => {
        // console.log(req.body)
        const {usrunm, usreml} = req.body
        const from_name = `Shyam Metalics (Lucky Draw App)`
        const from_email = `msh.sun20@gmail.com`
        const to_email = `legend.sunny65@gmail.com`

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'msh.sun20@gmail.com',
                pass: 'wfszptiiuklasqdt'
            }
        })

        try {
            const Usr = await UsrModel.findOne({$and:[{usr_unam:usrunm}, {usr_email:usreml}]})
    
            if (Usr) {
                const randcode = Math.round(Math.random()*1000000)
                const Rand = await RndCodeModel.create({user:Usr._id, rndcode:randcode})
    
                if (Rand) {
                    const mailOptions = {
                        from: `${from_name} <${from_email}>`,
                        to: `${usreml}, ${to_email}`,
                        subject: `Lucky Draw Apps Login`,
                        text: `Welcome to Shyam Metalics`,
                        html: `<!DOCTYPE html>
                            <html>
                            <head>
                                <meta charset="utf-8">
                                <script async src="https://cdn.ampproject.org/v0.js"></script>
                                <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
                            </head>
                            <body>
                                <p>To Reset Password Submit following Confirmation Code:</p>
                                <p>Confirmation Code: ${randcode}<br/>
                            </body>
                            </html>`
                    }
                    const result = await transporter.sendMail(mailOptions)
                    if (result) {
                        res.json({message:'Confirmation Code sent successfully', statuscode:220, data:Rand})
                    }
                    else {
                        res.json({message:'Email sending Failed ...!', statuscode:424})
                    }
                }
                else {
                    res.json({message:`Code generation Error ...!`, statuscode:423})
                }
            }
            else {
                res.json({message:`User doesn't Exist ...!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    },
    cnfrmcode: async (req, res) => {
        const {rndid, ucnfcode} = req.body

        try {
            const Rand = await RndCodeModel.findOne({$and:[{_id:rndid}, {rndcode:ucnfcode}]})

            if (Rand) {
                res.json({success:'Email Id Confirmed successfully', statuscode:220, data:Rand})
            }
            else {
                res.json({error:`Wrong Code given ...!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    }
}