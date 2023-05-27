var express = require('express');
var router = express.Router();

housingController = require('../controllers/housingController')
ratingController = require('../controllers/ratingController')

router.get('/:houseId?', housingController.getHouse)
router.post('/', housingController.addHouse)
router.get('/ratingId?', ratingController.getRating)
router.post('/', ratingController.addRating)
//router.delete('/:houseId', housingController.permanentDelete)
//router.put('/:houseId', housingController.updateHouse)

module.exports = router;