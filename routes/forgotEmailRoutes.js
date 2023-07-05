const express = require('express');
const router = express.Router();
const forgotEmailController = require('../controllers/forgotEmailController');

// Ruta para enviar un correo electrónico
router.post('/', forgotEmailController.sendEmail);

module.exports = router;