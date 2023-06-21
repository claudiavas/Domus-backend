const express = require('express');
const router = express.Router();
const realEstateController = require('../controllers/realEstateController');

router.get('/:realEstateId?', realEstateController.getRealEstate);
router.post('/', realEstateController.addRealEstate);
router.delete('/:realEstateId?', realEstateController.deleteRealEstate);
router.put('/:realEstateId', realEstateController.updateRealEstate);
router.delete('/:houseId/permanent', realEstateController.permanentDeleteRealEstate);

module.exports = router;