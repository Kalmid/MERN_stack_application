const express = require('express');
const multer = require('multer');
const { uploadPDF, getPDFs, viewPDF } = require('../controllers/pdfController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage, fileFilter });

router.route('/')
    .post(protect, upload.single('pdf'), uploadPDF)
    .get(protect, getPDFs);

router.route('/:id').get(protect, viewPDF);

module.exports = router;
