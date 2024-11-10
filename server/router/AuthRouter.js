const express = require("express");
const router = express.Router();
const AdminEndPoint = require("../controller/Admin");

router.route('/add-event').post(AdminEndPoint.addEvent);
router.route('/get-all-events').get(AdminEndPoint.getAllEvent);
router.route('/remove-event/:id').delete(AdminEndPoint.removeEvent);

router.route('/add-guest-speaker').post(AdminEndPoint.addGuestSpeaker);
router.route('/get-all-guest-speakers').get(AdminEndPoint.getAllGuestSpeaker);
router.route('/remove-guest-speaker/:id').delete(AdminEndPoint.removeGuestSpeaker);

module.exports = router;