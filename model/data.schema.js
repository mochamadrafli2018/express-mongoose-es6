const mongoose = require('mongoose');

// Model
module.exports = mongoose.model(
    // Model name
    "DataSchema",
    // Schema
    new mongoose.Schema(
        {
            title: {
                type: String,
                default: null,
                required: true,
            },
            topic: {
                type: String,
                default: null,
                required: true,
            },
            link: {
                type: String, 
                default: null,
                required: true,
            },
        },
        {
            timestamps: true
        },
    ),
    // Collection
    'crud',
)