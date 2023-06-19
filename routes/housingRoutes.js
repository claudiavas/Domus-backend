const express = require('express');
const router = express.Router();
const housingController = require('../controllers/housingController');

router.get('/:houseId?', housingController.getHouse);
router.post('/', housingController.addHouse);
router.delete('/:houseId', housingController.deleteHouse);
router.put('/:houseId', housingController.updateHouse);
router.delete('/:houseId/permanent', housingController.permanentDeleteHouse);

module.exports = router;