const { 
    getConfiguration, 
    updateConfiguration, 
} = require('../controllers/configurationController');

const router = require('express').Router();

router.put('/', updateConfiguration);
router.get('/', getConfiguration);

module.exports = router; 