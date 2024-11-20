const express = require("express");
const router = express.Router();
const AdminEndPoint = require("../controller/Admin");
const {upload} = require("../middlewares/multer.middleware");
router.route('/add-event').post(
    upload.fields([
        { name: 'banner', maxCount: 1 },
    ]),
    AdminEndPoint.addEvent
);

router.route('/add-gallery-img')
.post(upload.single('gallery'),
AdminEndPoint.addGalleryImg)


router.route('/add-team-member').post(
    upload.single('profile'),
    AdminEndPoint.addTeamMember
  );



router.route('/add-guest-speaker').post(
    upload.single('avatar'),
    AdminEndPoint.addGuestSpeaker);

router.route('/remove-document').post(AdminEndPoint.deleteDocument);


//ecellform
router.route('/create-form').post(AdminEndPoint.createForm);
router.route('/get-forms').get(AdminEndPoint.getForms);

router.route('/add-notice').post(AdminEndPoint.addNotice);

module.exports = router;