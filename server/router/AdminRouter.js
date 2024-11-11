const express = require("express");
const router = express.Router();
const AdminEndPoint = require("../controller/Admin");

router.route('/add-event').post(AdminEndPoint.addEvent);
router.route('/remove-event/:id').delete(AdminEndPoint.removeEvent);

router.route('/add-guest-speaker').post(AdminEndPoint.addGuestSpeaker);
router.route('/remove-guest-speaker/:id').delete(AdminEndPoint.removeGuestSpeaker);

module.exports = router;