const TaskModel = require('../models/Task');
const mongoose = require('mongoose');

exports.getTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(taskId)) {
            res.status(404).send({ message: 'Task ID is not valid' });
        }

        const task = await TaskModel.findById(taskId);

        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }

        res.status(200).send(task);
    } catch (error) {
        console.error(`Error fetching task: ${error}`);
        res.status(500).send({ message: 'Failed to fetch task', error: error.message });
    }
};

exports.getAllTasksByList = async (req, res) => {
    try {
        const tasks = await TaskModel.find();

        const tasksByList = {
            tasksPending: tasks.filter(task => task.status === 'pending'),
            tasksDoing: tasks.filter(task => task.status === 'doing'),
            tasksDone: tasks.filter(task => task.status === 'done'),
        }

        res.status(200).send(tasksByList);
    } catch (error) {
        console.log(`Error fetching all tasks by list: ${error}`);
        res.status(500).send({ message: 'Failed to fetch all tasks by list', error: error.message });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.status(200).send(tasks);
    } catch (error) {
        console.log(`Error fetching all tasks: ${error}`);
        res.status(500).send({ message: 'Failed to fetch all tasks', error: error.message });
    }
};

exports.createTask = async (req, res) => {
    try {        
        const data = req.body;

        const newTask = new TaskModel(data);
        await newTask.save();

        if(!newTask._id) {
            return res.status(500).send({ message: 'Failed to create task' });
        }

        res.status(201).send({ task: newTask, message: 'Task was created successfully' });
    } catch (error) {
        console.log(`Error creating task: ${error.message}`);
        res.status(500).send({ message: 'Error creating task', error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const data = req.body;

        if(!mongoose.Types.ObjectId.isValid(taskId)) {
            res.status(404).send({ message: 'Task ID is not valid' });
        }

        const updatedTask = await TaskModel.findByIdAndUpdate(taskId, data, { new: true, runValidators: true});

        if (!updatedTask) {
            return res.status(404).send({ message: 'Unable to update task' });
        }

        res.status(200).send(updatedTask);
    } catch (error) {
        console.log(`Error to update task: ${error.message}`);
        res.status(500).send({ message: 'Error to update', error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(taskId)) {
            res.status(404).send({ message: 'Task ID is not valid' });
        }

        const deletedTask = await TaskModel.findByIdAndDelete(taskId);

        if(!deletedTask) {
            return res.status(404).send({ message: 'Task not found' });
        }
        
        res.status(200).send({ message: 'Task was deleted successfully' });
    } catch (error) {
        console.log(`Error deleting task: ${error.message}`);
        res.status(500).send({ message: 'Error deleting task', error: error.message });
    }
};