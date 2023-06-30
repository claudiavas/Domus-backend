const express = require('express');
const app = express();
const cloudinary = require('cloudinary').v2;
const router = express.Router();

const axios = require('axios');


// Configura Cloudinary con las variables de entorno
cloudinary.config({
  secure: true,
  cloud_name: 'domusfsd',
  api_key: "735915591324692",
  api_secret: "9WHuf9YLpOXv3ovA9hYOK3HBges"
});

// Uploads an image file
router.post('/', async (req, res) => {

  // const imagePath = req.body.file;
  const uploadImage = async () => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    // const options = {
    //   use_filename: true,
    //   unique_filename: false,
    //   overwrite: true,
    // };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(req.body.file);
      console.log(result);
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
  };

  // uploadImage(imagePath);

})


// const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
// const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;
// const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/domusfsd/image/upload';
// const cloudinaryUploadPreset = 'domusfsd';

// Ruta para subir la imagen a Cloudinary
// router.post('/', async (req, res) => {
//   const { file } = req.body;
  
//   try {
//     const response = await axios.post(cloudinaryUrl, {
//       file,
//       upload_preset: cloudinaryUploadPreset
//     }, {
//       headers: {
//         'Authorization': `Bearer ${cloudinaryApiKey}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error('Error uploading file to Cloudinary:', error);
//     res.status(500).json({ error: 'Upload failed' });
//   }
// });


module.exports = router;