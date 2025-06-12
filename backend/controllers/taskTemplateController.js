const TaskTemplateModel = require('../models/TaskTemplate');
const mongoose = require('mongoose');

exports.getAllTaskTemplate = async (req, res) => {
    try {
        const taskTemplate = await TaskTemplateModel.find();
        res.status(200).send(taskTemplate);
    } catch (error) {
        console.log(`Error fetching all  task template: ${error}`);
        res.status(500).send({ message: 'Failed to fetch all task template', error: error.message });
    }
};

exports.createTaskTemplate = async (req, res) => {
    try {        
        const data = req.body;

        const newTaskTemplate = new TaskTemplateModel(data);
        await newTaskTemplate.save();

        if(!newTaskTemplate._id) {
            return res.status(500).send({ message: 'Failed to create task template' });
        }

        res.status(201).send({ task_template: newTaskTemplate, message: 'Task template was created successfully' });
    } catch (error) {
        console.log(`Error creating task template: ${error.message}`);
        res.status(500).send({ message: 'Error creating task template', error: error.message });
    }
};