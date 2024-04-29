const express = require('express')
const multer = require('multer')

const app = express()
app.use(express.static('uploads'))

const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads')
    },
    filename: (req, file, callback) => {
        callback(null, `Image-${Date.now()}.${file.originalname}`)
    }
})
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true)
    }
    else {
        callback(null, Error(`Only image File is Allowed.`))
    }
}
const upload = multer({
    storage: imgconfig,
    fileFilter: isImage
})

module.exports = upload