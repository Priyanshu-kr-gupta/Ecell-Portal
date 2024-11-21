const express = require('express')
const router = express.Router();
const UserEndPoint = require("../controller/User")


router.route('/check-startup').post(UserEndPoint.checkStartupRegistration)
router.route('/register-startup').post(UserEndPoint.registerStartup)
router.route('/get-active-forms').get(UserEndPoint.getActiveForm)
router.route('/get-form').post(UserEndPoint.getForm);

module.exports = router;