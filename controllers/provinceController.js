const Province = require('../models/provinceModel');

const { ObjectId } = require('mongodb');
const provinceId = new ObjectId()

const addProvince = (req,res) => {
  const newProvince = new Province({
    code: req.body.code,
    country: req.body.country,
    province: req.body.province,
  });

  console.log("newProvince", newProvince);
  console.log("body", req.body);
  console.log(req.body.code);
  console.log(req.body.country);
  console.log(req.body.province);    
  newProvince
    .save()
    .then((province) => res.status(200).send(province))
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case 11000:
          res.status(400).send({ msg: 'La provincia ya existe' });
          break;
        default:
          res.status(400).send(error);
      }
    });
};

const getProvince = (req, res) => {
  if (req.params.provinceId) {
    Province.findById(req.params.provinceId)
      .then((province) => {
        if (province === null) {
          res.status(404).send({ msg: 'No se ha encontrado la provincia' });
        } else {
          res.status(200).send(province);
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

  Province.find(filter)
    .then((province) => {
      if (province.length === 0) {
        res.status(404).send({ msg: 'No se han encontrado valoraciones' });
      } else {
        res.status(200).send(province);
      }
    })
    .catch((error) => res.status(400).send(error));
}
};

module.exports = {
  getProvince,
  addProvince,
};