const express = require('express');
const router = express.Router();
const realstateController = require('../controllers/realstateController');

router.get('/:realstateId?', realstateController.getRealstate);
router.post('/', realstateController.addRealstate);
// router.delete('/:houseId', housingController.deleteHouse);
// router.put('/:houseId', housingController.updateHouse);
// router.delete('/:houseId/permanent', housingController.permanentDelete);

module.exports = router;