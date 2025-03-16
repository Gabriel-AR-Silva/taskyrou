const { getTask, getAllTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const router = require('express').Router();

router.get('/:id', getTask);
router.get('/', getAllTasks);
router.post('/create', createTask);
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);

module.exports = router; 