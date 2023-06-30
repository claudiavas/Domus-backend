const nodemailer = require('nodemailer');



// Configuración del servidor SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // false para conexiones no seguras
    auth: {
      user: 'tu_usuario_smtp',
      pass: 'tu_contraseña_smtp'
    }
  });

  // Configuración del mensaje de correo electrónico
const mensaje = {
    from: 'remitente@example.com',
    to: 'destinatario@example.com',
    subject: 'Asunto del correo electrónico',
    text: 'Contenido del correo electrónico'
  };

  
  // Envío del correo electrónico
transporter.sendMail(mensaje, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo electrónico:', error);
    } else {
      console.log('Correo electrónico enviado:', info.response);
    }
  });
  