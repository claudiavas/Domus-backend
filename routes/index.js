var express = require('express');
var router = express.Router();

housingController = require('../controllers/housingController')

router.get('/:houseId?', housingController.getHouse)
router.post('/', housingController.addHouse)
//router.delete('/:houseId', housingController.permanentDelete)
//router.put('/:houseId', housingController.updateHouse)

module.exports = router;