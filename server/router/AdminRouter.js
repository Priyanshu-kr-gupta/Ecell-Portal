const express = require("express");
const router = express.Router();
const AdminEndPoint = require("../controller/Admin");
const PublicEndPoint = require("../controller/Public");
const {upload} = require("../middlewares/multer.middleware");
router.route('/add-event').post(
    upload.fields([
        { name: 'banner', maxCount: 1 },
        { name: 'gallery', maxCount: 12 },   
    ]),
    AdminEndPoint.addEvent
);

router.route('/get-all-events').get(PublicEndPoint.getAllEvent);
router.route('/remove-event/:id').delete(AdminEndPoint.removeEvent);

router.route('/add-guest-speaker').post(
    upload.single('avatar'),
    AdminEndPoint.addGuestSpeaker);
router.route('/get-all-guest-speakers').get(PublicEndPoint.getAllGuestSpeakwer);
router.route('/remove-guest-speaker/:id').delete(AdminEndPoint.removeGuestSpeaker);

module.exports = router;