const express = require("express")
const router = express.Router();
const AuthEndPoint = require("../controller/Auth")


router.route('/sendOtp').post(AuthEndPoint.sendOtp)
router.route('/verifyOtp').post(AuthEndPoint.verifyOtp)
router.route('/register').post(AuthEndPoint.registerUser)
router.route('/login').post(AuthEndPoint.login)


module.exports = router;