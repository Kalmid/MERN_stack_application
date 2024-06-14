const mongoose = require('mongoose');

const pdfSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
}, { timestamps: true });

const PDF = mongoose.model('PDF', pdfSchema);

module.exports = PDF;
