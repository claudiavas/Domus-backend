const express = require('express');
const router = express.Router();
const requestsController = require('../controllers/requestsController');

router.get('/:requestId?', requestsController.getRequest);
router.post('/', requestsController.addRequest);
// router.delete('/:requestId', requestsController.deleteRequest);
// router.put('/:requestId', requestsController.updateRequest);
// router.delete('/:requestId/permanent', requestsController.permanentDelete);

module.exports = router;