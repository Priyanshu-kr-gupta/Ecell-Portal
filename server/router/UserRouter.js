const express = require('express')
const router = express.Router();
const UserEndPoint = require("../controller/User")


router.route('/check-startup').post(UserEndPoint.checkStartupRegistration)
router.route('/register-startup').post(UserEndPoint.registerStartup)


module.exports = router;