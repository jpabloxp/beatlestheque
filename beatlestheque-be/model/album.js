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
        },
        songs : [
            {
                title : {
                    type: String,
                    required: false
                },
                songwriters : {
                    type: String,
                    required: false
                },
                length : {
                    type: Number,
                    required: false
                },
                lyrics : {
                    type: String,
                    required: false
                }
            }
        ],
        musicians : [
            {
                lennon : {
                    type: String,
                    required: false
                },
                macca : {
                    type: String,
                    required: false
                },
                harrison : {
                    type: String,
                    required: false
                },
                starr : {
                    type: String,
                    required: false
                }
            }
        ]
    }
);

const albumModel = module.exports = mongoose.model('albums', albumSchema);