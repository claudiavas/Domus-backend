const SibApiV3Sdk = require('sib-api-v3-sdk');
const jwt = require('jsonwebtoken');

const recoveryLink = async (email) => {
  
  try {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const link = `${process.env.FRONTEND_URL}/resetpassword/${token}`; // Enlace para restablecer la contraseña
    console.log('Enlace de recuperación de contraseña:', link);
    return link;
    
  } catch (error) {
    console.error('Error al generar el enlace de recuperación de contraseña:', error);
  }
};

const sendEmail = async (req, res) => {
  try {
    const recipientEmail = req.body.email;
    const recipientName = req.body.name;
    const link = await recoveryLink(recipientEmail)
    console.log('Enlace de recuperación de contraseña:', link)

    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.BREVO_APIKEY;

    await new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
      "sender": { "email": "claudia.vasquez.as@gmail.com", "name": "Domus" },
      "subject": "This is my default subject line",
      "templateId": 1,
      "params": {
        "email": recipientEmail,
        "name": recipientName,
        "url": link
      },
      "messageVersions": [
        {
          "to": [
            {
              "email": recipientEmail,
              "nombre": recipientName,
              "url": link
            }
          ],
          "params": {
            "email": recipientEmail,
            "nombre": recipientName,
            "url": link
          },
          "subject": "Tu nueva contraseña de Domus"
        }
      ]
    });

    console.log('Correo electrónico enviado correctamente');
    res.status(200).json({ message: 'Correo electrónico enviado' });

  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    res.status(500).json({ error: 'Error al enviar el correo electrónico' });
  }
};

module.exports = {
 sendEmail
};