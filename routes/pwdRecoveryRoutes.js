const express = require('express');
const router = express.Router();
const { sendPasswordRecoveryEmail, resetPassword } = require('../controllers/pwdRecoveryController');

// Ruta para enviar el correo de recuperación de contraseña
router.post('/pwdrecovery', sendPwdRecoveryEmail);

// Ruta para restablecer la contraseña
router.post('/pwdreset', resetPassword);

module.exports = router;
