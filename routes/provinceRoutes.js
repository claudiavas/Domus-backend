const express = require('express');
const router = express.Router();
const provinceController = require('../controllers/provinceController');

router.get('/:provinceId?', provinceController.getProvince);
router.post('/', provinceController.addProvince);

module.exports = router;