const Image = require('../models/housingImagesModel.js');

const { ObjectId } = require('mongodb');
const imageId = new ObjectId()

//Función para añadir una imagen a una vivienda

const addImage = (req,res) => {
    const newRating = new Image({
        dateUpload:req.body.dateUpload,
        image:req.body.image,
        title:req.body.title,
        housingId:req.body.housingId,
    });
  
    newImage
      .save()
      .then((image) => res.status(200).send(image))
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case 11000:
            res.status(400).send({ msg: 'La imagen ya existe' });
            break;
          default:
            res.status(400).send(error);
        }
      });
  };

// Función para obtener la imagen de una vivienda

  const getImage = (req, res) => {
    if (req.params.imageId) {
      Rating.findById(req.params.imageId)
        .then((image) => {
          if (image === null) {
            res.status(404).send({ msg: 'No se ha encontrado la imagen' });
          } else {
            res.status(200).send(image);
          }
        })
        .catch((error) => {
            console.log(error);
            switch (error.name) {
              case 'CastError':
                res.status(400).send('Formato de imagen inválido');
                break;
              default:
                res.status(400).send(error);
            }
          });
        } else {
            let filter = {};
        
            if (req.query.status) {
              filter.status = req.query.status;
            }


    console.log(req.query.status, filter);
    Image.find(filter)
      .then((image) => {
        if (image.length === 0) {
          res.status(404).send({ msg: 'No se han encontrado imagenes' });
        } else {
          res.status(200).send(image);
        }
      })
      .catch((error) => res.status(400).send(error));
  }
};

// Función para actualizar una imagen asociada a una vivienda
const updateImage = async (req, res) => {
  const { imageId } = req.params; // Obtener el ID de la imagen de los parámetros de la solicitud
  const { newImageData } = req.body; // Obtener los datos de la nueva imagen del cuerpo de la solicitud

  try {
    const image = await HousingImages.findById(imageId); // Buscar la imagen por su ID

    if (!image) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    image.set(newImageData); // Actualizar los datos de la imagen con los nuevos datos
    await image.save(); // Guardar los cambios en la imagen

    res.status(200).json({ message: 'Imagen actualizada correctamente', updatedImage: image });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la imagen' });
  }
};

// Función para eliminar permanentemente una imagen asociada a una vivienda
const permanentDeleteImage = async (req, res) => {
  const { imageId } = req.params; // Obtener el ID de la imagen de los parámetros de la solicitud

  try {
    const image = await HousingImages.findById(imageId); // Buscar la imagen por su ID

    if (!image) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    await image.remove(); // Eliminar permanentemente la imagen

    res.status(200).json({ message: 'Imagen eliminada permanentemente correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar permanentemente la imagen' });
  }
};

// Función para eliminar una imagen asociada a una vivienda
const deleteImage = async (req, res) => {
  const { imageId } = req.params; // Obtener el ID de la imagen de los parámetros de la solicitud

  try {
    const image = await HousingImages.findById(imageId); // Buscar la imagen por su ID

    if (!image) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    await image.remove(); // Eliminar la imagen

    res.status(200).json({ message: 'Imagen eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la imagen' });
  }
};

module.exports = {
    getImage,
    addImage,
    deleteImage,
    updateImage,
    permanentDeleteImage
  }