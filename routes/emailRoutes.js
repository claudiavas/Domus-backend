const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Ruta para enviar un correo electrónico
router.post('/', async (req, res) => {
  const { to, subject, body } = req.body;

  try {
    // Configurar el transporte de nodemailer
    const transporter = nodemailer.createTransport({
      // Configurar el proveedor de servicio de correo electrónico
      host: 'tu_servidor_smtp',
      port: 587,
      secure: false, // false para conexiones no seguras
      auth: {
        user: 'tu_correo@example.com',
        pass: 'tu_contraseña',
      },
    });

    // Definir el contenido del correo electrónico
    const message = {
      from: 'tu_correo@example.com',
      to,
      subject,
      text: body,
    };

    // Enviar el correo electrónico
    const info = await transporter.sendMail(message);

    console.log('Correo electrónico enviado:', info.response);
    res.status(200).json({ message: 'Correo electrónico enviado' });
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    res.status(500).json({ error: 'Error al enviar el correo electrónico' });
  }
});

module.exports = router;