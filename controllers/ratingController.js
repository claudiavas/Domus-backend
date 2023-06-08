const Rating = require('../models/ratingModel.js');

const { ObjectId } = require('mongodb');
const agentId = new ObjectId()

//Función para añadir una calificación

const addRating = (req,res) => {
    const newRating = new Rating({
        evaluatedUser:req.body.evaluatedUser,
        evaluatingUser:req.body.evaluatingUser,
        rating:req.body.rating,
        commentBrief:req.body.commentBrief,
        comment:req.body.comment,
               
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

//Función para obtener una calificación  

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

// Función para actualizar una calificación
const updateRating = async (req, res) => {
  const { ratingId } = req.params; // Obtener el ID de la calificación de los parámetros de la solicitud
  const { rating, commentBrief, comment } = req.body; // Obtener los nuevos datos de la calificación del cuerpo de la solicitud

  try {
    const updatedRating = await Rating.findByIdAndUpdate(
      ratingId,
      { rating, commentBrief, comment },
      { new: true }
    ); // Buscar y actualizar la calificación por su ID

    if (!updatedRating) {
      return res.status(404).json({ error: 'Calificación no encontrada' });
    }

    res.status(200).json({ message: 'Calificación actualizada correctamente', updatedRating });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la calificación' });
  }
};

// Función para eliminar una calificación (marcar como eliminada)
const deleteRating = async (req, res) => {
  const { ratingId } = req.params; // Obtener el ID de la calificación de los parámetros de la solicitud

  try {
    const deletedRating = await Rating.findByIdAndUpdate(
      ratingId,
      { deletedAt: new Date() },
      { new: true }
    ); // Buscar y marcar como eliminada la calificación por su ID

    if (!deletedRating) {
      return res.status(404).json({ error: 'Calificación no encontrada' });
    }

    res.status(200).json({ message: 'Calificación eliminada correctamente', deletedRating });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la calificación' });
  }
};

// Función para eliminar permanentemente una calificación
const deletePermanentRating = async (req, res) => {
  const { ratingId } = req.params; // Obtener el ID de la calificación de los parámetros de la solicitud

  try {
    const deletedRating = await Rating.findByIdAndDelete(ratingId); // Buscar y eliminar permanentemente la calificación por su ID

    if (!deletedRating) {
      return res.status(404).json({ error: 'Calificación no encontrada' });
    }

    res.status(200).json({ message: 'Calificación eliminada permanentemente correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar permanentemente la calificación' });
  }
};

module.exports = {
    getRating,
    addRating,
    deleteRating,
    updateRating,
    permanentDeleteRating
  }