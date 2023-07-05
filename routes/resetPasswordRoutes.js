const express = require('express');
const router = express.Router();
const  resetPasswordController  = require('../controllers/resetPasswordController');

// Ruta para restablecer la contraseña
router.post('/resetpassword', resetPasswordController.resetPassword);

module.exports = router;

