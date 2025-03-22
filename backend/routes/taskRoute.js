const { 
    getTask, 
    getAllTasks, 
    createTask, 
    updateTask, 
    deleteTask, 
    getAllTasksByList 
} = require('../controllers/taskController');

const router = require('express').Router();

router.get('/by-list', getAllTasksByList);
router.get('/:id', getTask);
router.get('/', getAllTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router; 