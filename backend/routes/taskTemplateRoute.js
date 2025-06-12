const { 
    getAllTaskTemplate, 
    createTaskTemplate, 
} = require('../controllers/taskTemplateController');

const router = require('express').Router();

router.get('/', getAllTaskTemplate);
router.post('/', createTaskTemplate);

module.exports = router; 