const { 
    getAllAttributes, 
    createAttribute, 
    addExperiencePointsToAttribute
} = require('../controllers/attributeController');

const router = require('express').Router();

router.put('/add-xp/:id', addExperiencePointsToAttribute);
router.get('/', getAllAttributes);
router.post('/', createAttribute);

module.exports = router; 