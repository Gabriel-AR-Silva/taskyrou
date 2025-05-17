const { 
    getTask, 
    getAllTasks, 
    createTask, 
    updateTask, 
    deleteTask, 
    getAllTasksByList,
    changeStatusTask 
} = require('../controllers/taskController');

const router = require('express').Router();

router.patch('/change-status/:id', changeStatusTask);
router.get('/by-list', getAllTasksByList);
router.get('/:id', getTask);
router.get('/', getAllTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router; 