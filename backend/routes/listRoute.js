const { 
    getAllLists, 
    createList, 
} = require('../controllers/listController');

const router = require('express').Router();

router.get('/', getAllLists);
router.post('/', createList);

module.exports = router; 