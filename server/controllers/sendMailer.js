const nodemailer = require("nodemailer")
const UsrModel = require('../models/usrModel')
const RndCodeModel = require('../models/rndcodeModel')

const mailer = async (req, res) => {
    // console.log(req.body)
    const {usreml} = req.body
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
        const Usr = await UsrModel.findOne({usr_email:usreml})

        if (Usr) {
            const randcode = Math.round(Math.random()*1000000)
            const Rand = await RndCodeModel.create({user:Usr._id, rndcod:randcode})

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
                    res.json({message:'Confirmation Code sent successfully', statuscode:220, data:result})
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
            res.json({message:`Email Id doesn't Exist ...!`, statuscode:422})
        }
    } catch (error) {
        console.error(error)
    }

    // const from_name = `Sunny Halder`
    // const from_email = `msh.sun20@gmail.com`
    // const to_email1 = `legend.sunny65@gmail.com`
    // const to_email2 = `msh.sun20@outlook.com`

    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'msh.sun20@gmail.com',
    //         pass: 'wfszptiiuklasqdt'
    //     }
    // })

    // const mailOptions = {
    //     from: `${from_name} <${from_email}>`,
    //     to: `${to_email1}, ${to_email2}`,
    //     subject: `Luckydraw App`,
    //     text: `Welcome to Shyam Metalics Lucky Draw Contest`,
    //     html: `<!DOCTYPE html>
    //         <html ⚡4email>
    //         <head>
    //             <meta charset="utf-8">
    //             <style amp4email-boilerplate>body{visibility:hidden}</style>
    //             <script async src="https://cdn.ampproject.org/v0.js"></script>
    //             <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
    //         </head>
    //         <body>
    //             <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
    //             <p>GIF (requires "amp-anim" script in header):<br/>
    //             <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
    //         </body>
    //         </html>`
    // }

    // try {
    //     const result = await transporter.sendMail(mailOptions)
    //     res.json({message:'Email sent successfully', statuscode:220, data:result})
    // } catch (error) {
    //     console.error(error)
    // }
}

module.exports = mailer