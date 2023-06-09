const RealEstate = require('../models/realEstateModel');
const ProvinceModel = require('../models/provinceModel');

const { ObjectId } = require('mongodb');

const addRealEstate = (req,res) => {
  const newRealEstate = new RealEstate({
    NIF: req.body.NIF,
    businessName: req.body.businessName,
    profileSummary: req.body.profileSummary,
    mainOfficeAddress: req.body.mainOfficeAddress,
    mainOfficeCountry: req.body.mainOfficeCountry,
    mainOfficeProvince: req.body.mainOfficeProvince,
    mainOfficeZipCode: req.body.mainOfficeZipCode,
    telephone1: req.body.telephone1,
    telephone2: req.body.telephone2,
    email: req.body.email,
    web: req.body.web,
    rent: req.body.rent,
    buy_sell: req.body.buy_sell,
    holiday_rental: req.body.holiday_rental,
    logo: req.body.logo,
    status: req.body.status,
    bannedReason: req.body.bannedReason,
    deletedAt: req.body.deletedAt
  });

  ProvinceModel.findById(req.body.mainOfficeProvince) // Buscar la provincia por su ID
  .then((province) => {
    if (!province) {
      // Si no se encuentra la provincia, puedes manejar el error
      throw new Error('Provincia no encontrada');
    }
    newRealEstate.mainOfficeProvince = province; // Asignar la provincia al campo "mainOfficeProvince" del RealEstate
    return newRealEstate.save(); // Guardar el nuevo RealEstate en la base de datos
  })
  .then((realEstate) => {
    res.status(200).send(realEstate);
  })
  .catch((error) => {
    console.log(error.code);
    switch (error.code) {
      case 11000:
        res.status(400).send({ msg: 'La inmobiliaria ya existe' });
        break;
      default:
        res.status(400).send(error);
  };
})
};


const getRealEstate = (req, res) => {
  let filter = {}; // Define the 'filter' variable with a default value

  if (req.query.status) {
    filter.status = req.query.status;
  }

  RealEstate.find(filter)
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
  getRealEstate,
  addRealEstate,
  // deleteHouse,
  // updateHouse,
  // permanentDelete
}