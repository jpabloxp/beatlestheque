const mongoose = require("mongoose");

const albumSchema = mongoose.Schema(
    {
        name : {
            type: String,
            required: false
        },
        year : {
            type: String,
            required: false
        }
    }
);

const albumModel = module.exports = mongoose.model('album', albumSchema);