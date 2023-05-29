const Rating = require('../models/imageModel.js');

const { ObjectId } = require('mongodb');
const imageId = new ObjectId()


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

module.exports = {
    getImage,
    addImage,
    //deleteImage,
    //updateImage,
    //permanentDelete
  }