const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendEmail } = require('./emailController');

exports.sendPwdRecoveryEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'El usuario no existe' });
    }

    // Generar el token JWT con la información del usuario
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Enviar el correo electrónico de recuperación de contraseña
    const emailResponse = await sendEmail(
      user.email,
      user.name,
      user.surname,
      'Recuperación de contraseña',
      `Haz clic en el siguiente enlace para restablecer tu contraseña: ${process.env.FRONTEND_URL}/reset-password?token=${token}`
    );

    console.log('Correo electrónico enviado:', emailResponse);
    res.status(200).json({ message: 'Correo electrónico de recuperación de contraseña enviado' });
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    res.status(500).json({ error: 'Error al enviar el correo electrónico' });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    // Verificar el token y extraer el email del usuario
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const email = decodedToken.email;

    // Buscar al usuario por su email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'El usuario no existe' });
    }

    // Actualizar la contraseña del usuario
    user.password = password;
    await user.save();

    res.status(200).json({ message: 'Contraseña restablecida correctamente' });
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json({ error: 'Error al restablecer la contraseña' });
  }
};
