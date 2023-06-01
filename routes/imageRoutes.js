const express = require('express');
const router = express.Router();
imageController = require('../controllers/imageController')


router.get('/:imageId?', imageController.getImage)
router.post('/', imageController.addImage)
// router.delete('/:imageId', imageController.deleteImage);
// router.put('/:imageId', imageController.updateImage);
// router.delete('/:imageId/permanent', imageController.permanentDelete);

module.exports = router;