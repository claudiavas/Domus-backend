const Housing = require('../models/ratingModel.js');

const { ObjectId } = require('mongodb');
const agentId = new ObjectId()


const addRating = (req,res) => {
    const newRating = new Rating({
        raitingAuthor:req.body.raitingAuthor,
        valuedAgent:req.body.valuedAgent,
        nameAuthor:req.body.nameAuthor,
        nameAgent:req.body.nameAgent,
        rating:req.body.rating,
        title:req.body.title,
        description:req.body.description,
        date:req.body.date,
             
    });
  
    newRating
      .save()
      .then((rating) => res.status(200).send(rating))
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case 11000:
            res.status(400).send({ msg: 'La puntuación ya existe' });
            break;
          default:
            res.status(400).send(error);
        }
      });
  };

  const getRating = (req, res) => {
    if (req.params.ratingId) {
      Rating.findById(req.params.ratingId)
        .then((rating) => {
          if (rating === null) {
            res.status(404).send({ msg: 'No se ha encontrado la valoración' });
          } else {
            res.status(200).send(rating);
          }
        })
        .catch((error) => {
            console.log(error);
            switch (error.name) {
              case 'CastError':
                res.status(400).send('Formato de ID inválido');
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
    Rating.find(filter)
      .then((rating) => {
        if (rating.length === 0) {
          res.status(404).send({ msg: 'No se han encontrado valoraciones' });
        } else {
          res.status(200).send(rating);
        }
      })
      .catch((error) => res.status(400).send(error));
  }
};

module.exports = {
    getRating,
    addRating,
    //deleteRating,
    //updateRating,
    //permanentDelete
  }