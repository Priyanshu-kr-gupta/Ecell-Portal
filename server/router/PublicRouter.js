const express = require("express");
const router = express.Router();
const PublicEndPoint = require("../controller/Public");

router.route('/get-upcoming-events').post(PublicEndPoint.getUpcomingEvents);
router.route('/get-past-events').post(PublicEndPoint.getPastEvents);
router.route('/get-event').post(PublicEndPoint.getParticularEvent);
router.route('/get-all-guest-speakers').post(PublicEndPoint.getAllGuestSpeakers);
router.route('/get-team-members').post(PublicEndPoint.getTeamMember);
router.route('/get-object-count').post(PublicEndPoint.getObjectCount);
router.route('/get-top-upcoming-events').get(PublicEndPoint.getTopUpcomingEvents);
router.route('/get-top-past-events').get(PublicEndPoint.getTopPastEvents);

module.exports = router;
