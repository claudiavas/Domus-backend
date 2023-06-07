const Request = require('../models/requestModel');

const addRequest = (req, res) => {
  const newRequest = new Request({
    realState: req.body.realState,
    type: req.body.type,
    transaction: req.body.transaction,
    country: req.body.country,
    community: req.body.community,
    province: req.body.province,
    municipality: req.body.municipality,
    population: req.body.population,
    neighborhood: req.body.neighborhood,
    minM2: req.body.minM2,
    maxM2: req.body.maxM2,
    currency: req.body.currency,
    minPrice: req.body.minPrice,
    maxPrice: req.body.maxPrice,
    floorLevel: req.body.floorLevel,
    facing: req.body.facing,
    propertyAge: req.body.propertyAge,
    comments: req.body.comments,
    rooms: req.body.rooms,
    baths: req.body.baths,
    garages: req.body.garages,
    condition: req.body.condition,
    furnished: req.body.furnished,
    kitchenEquipment: req.body.kitchenEquipment,
    closets: req.body.closets,
    airConditioning: req.body.airConditioning,
    heating: req.body.heating,
    elevator: req.body.elevator,
    outsideView: req.body.outsideView,
    garden: req.body.garden,
    pool: req.body.pool,
    terrace: req.body.terrace,
    storage: req.body.storage,
    accessible: req.body.accessible,
    status: req.body.status,
    deletedAt: req.body.deletedAt
  });

  newRequest
    .save()
    .then((request) => res.status(200).send(request))
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case 11000:
          res.status(400).send({ msg: 'La solicitud ya existe' });
          break;
        default:
          res.status(400).send(error);
      }
    });
};

const getRequest = (req, res) => {
  if (req.params.requestId) {
    Request.findById(req.params.requestId)
      .then((request) => {
        if (request === null) {
          res.status(404).send({ msg: 'No se ha encontrado la solicitud' });
        } else {
          res.status(200).send(request);
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

    Request.find(filter)
      .then((request) => {
        if (request.length === 0) {
          res.status(404).send({ msg: 'No se han encontrado solicitudes' });
        } else {
          res.status(200).send(request);
        }
      })
      .catch((error) => res.status(400).send(error));
  }
};

module.exports = {
  getRequest,
  addRequest,
  // deleteRequest,
  // updateRequest,
  // permanentDelete
};