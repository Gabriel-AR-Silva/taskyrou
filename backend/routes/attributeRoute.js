const { 
    getAllAttributes, 
    updateAttribute, 
    createAttribute, 
    deleteAttribute, 
    addExperiencePointsToAttribute
} = require('../controllers/attributeController');

const router = require('express').Router();

router.put('/add-xp/:id', addExperiencePointsToAttribute);
router.put('/:id', updateAttribute);
router.delete('/:id', deleteAttribute);
router.get('/', getAllAttributes);
router.post('/', createAttribute);

module.exports = router; 