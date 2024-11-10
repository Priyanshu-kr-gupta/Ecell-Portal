const express = require("express");
const router = express.Router();
const PublicEndPoint = require("../controller/Public");

router.route('/get-all-events').get(PublicEndPoint.getAllEvent);
router.route('/get-all-guest-speakers').get(PublicEndPoint.getAllGuestSpeakwer);

module.exports = router;