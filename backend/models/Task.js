const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    "title": {
        type: String,
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
                return value.trim().length > 1000;
            },
            message: 'The maximum length is 1000.'
        }
    },
    "status": {
        type: String,
        required: true,
        enum: {
            values: ["pending", "doing", "done"],
            message: '{VALUE} is not a valid status. Supported statuses are: Pending, Doing and Done.'
        },
        default: "pending"
    },
}, {
    timestamps: true,
    collection: 'tasks'
});

const TaskModel = mongoose.model('TaskModel', taskSchema);
module.exports = TaskModel;