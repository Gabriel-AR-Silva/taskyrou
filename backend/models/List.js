const mongoose = require('mongoose');
const { Schema } = mongoose;

const listSchema = new Schema({
    title: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value && value.trim().length > 0;
            },
            message: 'Title is required.'
        }
    },
}, {
    timestamps: true,
    collection: 'lists'
});

const ListSchema = mongoose.model('ListSchema', listSchema);
module.exports = ListSchema;