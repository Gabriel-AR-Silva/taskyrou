const mongoose = require('mongoose');
const { Schema } = mongoose;

const configurationSchema = new Schema({
    user_name: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value && value.trim().length > 0;
            },
            message: 'User name is required.'
        }
    },
    user_image: {
        type: String,
        default: '',
    },
    user_emoji: {
        type: String,
        default: '',
    },
    user_phrases: {
        type: String,
        validate: {
            validator: function (value) {
                return value.trim().length <= 1000;
            },
            message: 'The maximum length is 1000.'
        }
    },
}, {
    timestamps: true,
    collection: 'configurations'
});

const ConfigurationModel = mongoose.model('ConfigurationModel', configurationSchema);
module.exports = ConfigurationModel;