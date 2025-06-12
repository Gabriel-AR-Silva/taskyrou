const { Frequencies, FREQUENCY_VALUES } = require('../enums/TaskFrequency.js');

const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskTemplateSchema = new Schema({
    title: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value && value.trim().length > 3;
            },
            message: 'Title is required.'
        }
    },
    description: {
        type: String,
        validate: {
            validator: function (value) {
                return value.trim().length < 250;
            },
            message: 'Description is too long, max 250.'
        }
    },
    difficulty: {                       
        type: Object,
        default: null,
    },
    attributes_ids: {
        type: [Number],
        default: []
    },
    recurrence: {
        frequency: {
            type: String,
            enum: FREQUENCY_VALUES, 
            default: Frequencies.ONCE
        },
        interval: {
            type: Number,
            default: 1, 
        },
        weekdays: {
            type: [String], 
            default: [],
        },
        endRecurrence: {
            type: Date,
            default: null,
        }
    },
}, {
    timestamps: true,
    collection: 'TaskTemplates'
});

const TaskTemplateModel = mongoose.model('TaskTemplateModel', taskTemplateSchema);
module.exports = TaskTemplateModel;
