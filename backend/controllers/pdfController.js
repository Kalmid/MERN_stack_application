const asyncHandler = require('express-async-handler');
const PDF = require('../models/PDF');
const path = require('path');
const fs = require('fs');

const uploadPDF = asyncHandler(async (req, res) => {
    const { filename } = req.file;
    const pdf = new PDF({
        user: req.user._id,
        filename,
        path: req.file.path
    });
    const createdPDF = await pdf.save();
    res.status(201).json(createdPDF);
});

const getPDFs = asyncHandler(async (req, res) => {
    const pdfs = await PDF.find({ user: req.user._id });
    res.json(pdfs);
});

const viewPDF = asyncHandler(async (req, res) => {
    const pdf = await PDF.findById(req.params.id);

    if (pdf && pdf.user.equals(req.user._id)) {
        res.sendFile(path.resolve(pdf.path));
    } else {
        res.status(404);
        throw new Error('PDF not found');
    }
});

module.exports = { uploadPDF, getPDFs, viewPDF };
