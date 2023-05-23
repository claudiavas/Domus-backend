const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

router.get('/:ratingId?', ratingController.getRating);
router.post('/', ratingController.addRating);
// router.delete('/:ratingId', ratingController.deleteRating);
// router.put('/:ratingId', ratingController.updateRating);
// router.delete('/:ratingId/permanent', ratingController.permanentDelete);

module.exports = router;