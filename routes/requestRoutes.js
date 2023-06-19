const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router.get('/:requestId?', requestController.getRequest);
router.post('/', requestController.addRequest);
router.delete('/:requestId', requestController.deleteRequest);
router.put('/:requestId', requestController.updateRequest);
router.delete('/:requestId/permanent', requestController.permanentDeleteRequest);

module.exports = router;