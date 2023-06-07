const Realstate = require('../models/realEstateModel');

const { ObjectId } = require('mongodb');



const addRealstate = (req,res) => {
  const newRealstate = new Realstate({
    id_realstate: req.body.id_realstate,
    Cif: req.body.Cif,
    status: req.body.status,
    name: req.body.name,
    description: req.body.description,
    country: req.body.country,
    province: req.body.province,
    municipality: req.body.municipality,
    zip_code: req.body.zip_code,
    telephone: req.body.telephone,
    email: req.body.email,
    web: req.body.web,
    date_register: req.body.date_register,
    rent: req.body.rent,
    buy_sell: req.body.buy_sell,
    holiday_rental: req.body.rental,
    logo: req.body.logo,
    publication_date: req.body.publication_date,
    modifiedAt: req.body.modifiedAt,
    deletedAt: req.body.deletedAt
  });

  newRealstate
    .save()
    .then((realstate) => res.status(200).send(realstate))
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case 11000:
          res.status(400).send({ msg: 'La inmobiliaria ya existe' });
          break;
        default:
          res.status(400).send(error);
      }
    });
};

const getRealstate = (req, res) => {
  let filter = {}; // Define the 'filter' variable with a default value

  if (req.query.status) {
    filter.status = req.query.status;
  }

  Realstate.find(filter)
    .then((realstates) => {
      if (realstates.length === 0) {
        res.status(404).send({ msg: 'No se han encontrado inmobiliaria' });
      } else {
        res.status(200).send(realstates);
      }
    })
    .catch((error) => res.status(400).send(error));
};

module.exports = {
  getRealstate,
  addRealstate,
  // deleteHouse,
  // updateHouse,
  // permanentDelete
};