const { 
    getAllAttributes, 
    updateAttribute, 
    createAttribute, 
    addExperiencePointsToAttribute
} = require('../controllers/attributeController');

const router = require('express').Router();

router.put('/add-xp/:id', addExperiencePointsToAttribute);
router.put('/:id', updateAttribute);
router.get('/', getAllAttributes);
router.post('/', createAttribute);

module.exports = router; 