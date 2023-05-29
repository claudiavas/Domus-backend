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

router.get('/:imageId?', imageController.getImage)
router.post('/', imageController.addImage)
// router.delete('/:imageId', imageController.deleteImage);
// router.put('/:imageId', imageController.updateImage);
// router.delete('/:imageId/permanent', imageController.permanentDelete);

module.exports = router;