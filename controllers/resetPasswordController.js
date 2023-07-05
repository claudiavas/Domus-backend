const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const recoveryLink = async (email) => {
  
  try {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const recoveryLink = `${process.env.FRONTEND_URL}/resetpassword/${token}`; // Enlace para restablecer la contraseña
    console.log('Enlace de recuperación de contraseña:', recoveryLink);
    return recoveryLink;
    
  } catch (error) {
    console.error('Error al generar el enlace de recuperación de contraseña:', error);
  }
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    // Actualizar la contraseña del usuario
    user.password = password;
    await user.save();
    res.status(200).json({ message: 'Contraseña restablecida correctamente' });
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json({ error: 'Error al restablecer la contraseña' });
  }
};

module.exports = {
  recoveryLink,
  resetPassword
};