const express = require("express");
const router = express.Router();
const PublicEndPoint = require("../controller/Public");

router.route('/get-upcoming-events').post(PublicEndPoint.getUpcomingEvents);
router.route('/get-past-events').post(PublicEndPoint.getPastEvents);
router.route('/get-event').post(PublicEndPoint.getParticularEvent);
router.route('/get-all-guest-speakers').post(PublicEndPoint.getAllGuestSpeakers);

module.exports = router;
