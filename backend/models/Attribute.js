const mongoose = require('mongoose');
const { Schema } = mongoose;

const attributeSchema = new Schema({
    "title": {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value && value.trim().length > 0;
            },
            message: 'Title is required.'
        }
    },
    "description": {
        type: String,
        validate: {
            validator: function (value) {
                return value.trim().length <= 1000;
            },
            message: 'The maximum length is 1000.'
        }
    },
    "value": {
        type: String,
        required: true
    },
    "level": {
        type: Number ,
        default: 0
    },
    "progress_max": {
        type: Number ,
        default: 1000
    },
    "progress_xp": {
        type: Number ,
        default: 0
    },
    "active": {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true,
    collection: 'attributes'
});

const AttributeModel = mongoose.model('AttributeModel', attributeSchema);
module.exports = AttributeModel;