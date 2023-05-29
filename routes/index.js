var express = require('express');
var router = express.Router();

housingController = require('../controllers/housingController')
ratingController = require('../controllers/ratingController')

router.get('/:houseId?', housingController.getHouse)
router.post('/', housingController.addHouse)
//router.delete('/:houseId', housingController.permanentDelete)
//router.put('/:houseId', housingController.updateHouse)

router.get('/:ratingId?', ratingController.getRating)
router.post('/', ratingController.addRating)
// router.delete('/:ratingId', ratingController.deleteRating);
// router.put('/:ratingId', ratingController.updateRating);
// router.delete('/:ratingId/permanent', ratingController.permanentDelete);

module.exports = router;