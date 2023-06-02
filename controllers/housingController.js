const Housing = require('../models/housingModel');

const { ObjectId } = require('mongodb');
const agentId = new ObjectId()


const addHouse = (req,res) => {
  const newHouse = new Housing({
    realState: req.body.realState,
    agent: req.body.agent,
    type: req.body.type,
    transaction: req.body.transaction,
    country: req.body.country,
    community: req.body.community,
    province: req.body.province,
    municipality: req.body.municipality,
    population: req.body.population,
    neighborhood: req.body.neighborhood,
    zipCode: req.body.zipCode,
    squareMeters: req.body.squareMeters,
    currency: req.body.currency,
    price: req.body.price,
    roadType: req.body.roadType,
    roadName: req.body.roadName,
    houseNumber: req.body.houseNumber,
    floorLevel: req.body.floorLevel,
    floorNumber: req.body.floorNumber,
    door: req.body.door,
    stair: req.body.stair,
    facing: req.body.facing,
    propertyAge: req.body.propertyAge,
    description: req.body.description,
    rooms: req.body.rooms,
    baths: req.body.baths,
    garages: req.body.garages,
    condition: req.body.condition,
    furnished: req.body.furnished,
    kitchenEquipment: req.body.kitchenEquipment,
    closets: req.body.closets,
    airConditioning: req.body.airConditioned,
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

  newHouse
    .save()
    .then((house) => res.status(200).send(house))
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case 11000:
          res.status(400).send({ msg: 'La vivienda ya existe' });
          break;
        default:
          res.status(400).send(error);
      }
    });
};

const getHouse = (req, res) => {
  let filter = {}; // Define the 'filter' variable with a default value

  if (req.query.status) {
    filter.status = req.query.status;
  }

  Housing.find(filter)
    .then((houses) => {
      if (houses.length === 0) {
        res.status(404).send({ msg: 'No se han encontrado viviendas' });
      } else {
        res.status(200).send(houses);
      }
    })
    .catch((error) => res.status(400).send(error));
};

module.exports = {
  getHouse,
  addHouse,
  // updateHouse,
  // deleteHouse,
  // permanentDelete
};