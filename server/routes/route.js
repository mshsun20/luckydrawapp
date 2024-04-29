const express = require('express')
const router = express.Router()
const upload = require('../middlewares/imguploader')
const session = require('express-session')
const UsrController = require('../controllers/usrController')
const AccController = require('../controllers/accController')
const CntstController = require('../controllers/cntstController')
const GftController = require('../controllers/gftController')
const PrzController = require('../controllers/przController')
const TcktController = require('../controllers/tcktController')
const RnkController = require('../controllers/rnkController')
const WnnrController = require('../controllers/wnnrController')

const OrgmController = require('../controllers/masters/orgmController')
const StatemController = require('../controllers/masters/StatemController')

const PassresetController = require('../controllers/passresetController')




// PING
router.route('/').get((req, res) => {
    res.json({message:`Server is Live...`, statuscode:200})
})
router.route('/chckstat').get((req, res) => {
    res.json({message:`Server is Online Now...`, statuscode:200})
})




// VIEW

router.route('/user/view').get(UsrController.read)
router.route('/user/sess/:tokn').get(UsrController.sess)
router.route('/user/logout').get(UsrController.logout)
router.route('/account/view').get(AccController.read)
router.route('/contest/view').get(CntstController.read)
router.route('/contest/view/:id').get(CntstController.readOne)
router.route('/contest/edit/updateallocstatfroall').get(CntstController.updateallocstatfroall)
// router.route('/contest/booked/view').get(CntstController.booked)
router.route('/gift/view').get(GftController.read)
router.route('/gift/view/:id').get(GftController.readOne)
router.route('/prize/view').get(PrzController.read)
router.route('/prize/view/:id').get(PrzController.readOne)
router.route('/prize/view/chckcntst/:id').get(PrzController.chckcntst)
router.route('/prize/view/stckcalc/:id').get(PrzController.stckcalc)
router.route('/ticket/view').get(TcktController.read)
router.route('/ticket/view/chckcntst/:id').get(TcktController.chckcntst)
router.route('/rank/view').get(RnkController.read)
router.route('/winner/view').get(WnnrController.read)
router.route('/winner/view/:id').get(WnnrController.readOne)
router.route('/winner/view/chckcntst/:id').get(WnnrController.chckcntst)
router.route('/winner/view/chcktckt/:id').get(WnnrController.chcktckt)
router.route('/winner/remove/all').get(WnnrController.deleteall)

router.route('/statem/view').get(StatemController.read)


// ADD

router.route('/user/add').post(UsrController.create)
router.route('/user/login').post(UsrController.login)
router.route('/account/add').post(AccController.create)
router.route('/contest/add').post(CntstController.create)
router.route('/gift/add').post(upload.single('gft_img'), GftController.create)
router.route('/prize/add').post(PrzController.create)
router.route('/ticket/add').post(TcktController.create)
router.route('/rank/add').post(RnkController.create)
router.route('/winner/add').post(WnnrController.create)

router.route('/orgm/add').post(OrgmController.create)
router.route('/statem/add').post(StatemController.create)

// mailing
router.route('/user/forget').post(PassresetController.forgetpass)
router.route('/user/cnfcode').post(PassresetController.cnfrmcode)

// UPLOAD

router.route('/accounts/upload').post(AccController.upload)
router.route('/accounts/upload/booktckt').post(AccController.uploadbooktckt)




// EDIT

router.route('/user/pass/change/:id').put(UsrController.chngpass)
router.route('/account/edit/:id').put(AccController.update)
router.route('/contest/edit/:id').put(CntstController.update)
// router.route('/contest/edit/updateallocstatfroall').put(CntstController.update)
router.route('/contest/edit/gftstat/:id').put(CntstController.updategftstat)
router.route('/gift/edit/:id').put(GftController.update)
router.route('/prize/update/:id').put(PrzController.update)
router.route('/prize/update/stck/:id').put(PrzController.edtstck)
router.route('/prize/update/addstck/:id').put(PrzController.addstck)
router.route('/prize/update/rmvstck/:id').put(PrzController.rmvstck)
router.route('/prize/update/addtrnsfr/:id').put(PrzController.addtrnsfr)
router.route('/prize/update/rmvtrnsfr/:id').put(PrzController.rmvtrnsfr)
router.route('/ticket/edit/:id').put(TcktController.update)
router.route('/rank/edit/:id').put(RnkController.update)
router.route('/winner/edit/:id').put(WnnrController.update)




// REMOVE

router.route('/user/remove/:id').delete(UsrController.delete)
router.route('/account/remove/:id').delete(AccController.delete)
router.route('/contest/remove/:id').delete(CntstController.delete)
router.route('/gift/remove/:id').delete(GftController.delete)
router.route('/prize/remove/:id').delete(PrzController.delete)
router.route('/ticket/remove/:id').delete(TcktController.delete)
router.route('/ticket/remove/selected/:id').delete(TcktController.deleteslct)
router.route('/rank/remove/:id').delete(RnkController.delete)
router.route('/winner/remove/:id').delete(WnnrController.delete)
// router.route('/winner/remove/all').delete(WnnrController.deleteall)

router.route('/statem/remove/:id').get(StatemController.delete)


module.exports = router