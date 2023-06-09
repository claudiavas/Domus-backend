const express = require('express');
const router = express.Router();
const realEstateController = require('../controllers/realEstateController');

router.get('/:realEstateId?', realEstateController.getRealEstate);
router.post('/', realEstateController.addRealEstate);
// router.delete('/:houseId', housingController.deleteHouse);
// router.put('/:houseId', housingController.updateHouse);
// router.delete('/:houseId/permanent', housingController.permanentDelete);

module.exports = router;