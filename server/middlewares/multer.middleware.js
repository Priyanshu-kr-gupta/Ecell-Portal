const multer = require("multer");

// Configure multer to save files locally in the 'public/temp' folder with their original names
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp'); // Set destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Assign the original filename to keep it simple
    cb(null, file.originalname);
  }
});

 const upload = multer({ storage: storage })

module.exports = {upload};

