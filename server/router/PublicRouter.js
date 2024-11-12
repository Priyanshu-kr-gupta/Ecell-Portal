const express = require("express");
const router = express.Router();
const PublicEndPoint = require("../controller/Public");

router.route('/get-upcoming-events').get(PublicEndPoint.getUpcomingEvents);
router.route('/get-past-events').get(PublicEndPoint.getPastEvents);
router.route('/get-all-guest-speakers').get(PublicEndPoint.getAllGuestSpeakers);

module.exports = router;
