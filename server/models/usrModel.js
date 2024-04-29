const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const UsrSchema = mongoose.Schema({
    usr_unam: {
        type: String,
        required: true,
        unique: true
    },
    usr_pass: {
        type: String,
        required: true
    },
    usr_name: {
        type: String
    },
    usr_email: {
        type: String,
        required: true,
        unique: true
    },
    usr_phone: {
        type: String
    },
    usr_type: {
        type: String,
        required: true
    },
    usr_cmpny: {
        type: String,
        required: true
    },
    usr_emp_code: {
        type: Number
    },
    usr_brnch: {
        type: String
    },
    usr_org: {
        type: String
    },
    usr_div: {
        type: String
    },
    usr_dept: {
        type: String
    },
    usr_desig: {
        type: String
    },
    usr_status: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            },
            createdOn: {
                type: Date,
                default: new Date()
            }
        }
    ]
}, {
    timestamps: true
})

UsrSchema.methods.generateToken = async function() {
    try {
        let jwttoken = jwt.sign(
            {
                uid: this._id.toString(),
                unam: this.usr_unam,
                ueml: this.usr_email,
                uphn: this.usr_phone,
                ufnam: this.usr_name,
                utyp: this.usr_type,
                ucomp: this.usr_cmpny,
                uempcode: this.usr_emp_code,
                ustatus: this.usr_status
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '30d'
            }
        )
        this.tokens = this.tokens.concat({token:jwttoken})
        await this.save()
        return jwttoken
    } catch (error) {
        console.error(error)
    }
}

module.exports = mongoose.model('User', UsrSchema);
