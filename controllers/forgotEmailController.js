const SibApiV3Sdk = require('sib-api-v3-sdk');
const {recoveryLink} = require('./resetPasswordController');

const sendEmail = async (req, res) => {
  try {
    const recipientEmail = req.body.email;
    const recipientName = req.body.name;

    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.BREVO_APIKEY;

    await new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
      "sender": { "email": "claudia.vasquez.as@gmail.com", "name": "Domus" },
      "subject": "This is my default subject line",
      "templateId": 1,
      "params": {
        "email": recipientEmail,
        "name": recipientName,
        "link": recoveryLink(recipientEmail)
      },
      "messageVersions": [
        {
          "to": [
            {
              "email": recipientEmail,
              "nombre": recipientName
            }
          ],
          "params": {
            "email": recipientEmail,
            "nombre": recipientName,
            "link": recoveryLink(recipientEmail)
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