const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    "title": String,
    "description": String,
    "status": {
        type: String,
        enum: ["pending", "doing", "done"],
        default: "pending"
    },
}, {
    timestamps: true,
    collection: 'tasks'
});

const TaskModel = mongoose.model('TaskModel', taskSchema);
module.exports = TaskModel;