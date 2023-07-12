const Housing = require('../models/housingModel');
const RealEstate = require('../models/realEstateModel');
const User = require('../models/userModel');

const { ObjectId } = require('mongodb');
const housingId = new ObjectId()

const addHouse = async (req, res) => {
  const { userId, ...houseFields } = req.body; // Obtener los campos relacionados y los demás campos de la vivienda
  console.log('el body es', req.body);
  try {
    const newHouse = new Housing({
      user: userId, 
      ...houseFields, // Agregar los demás campos de la vivienda utilizando la desestructuración
    }); // Crear una nueva instancia del modelo de vivienda
    await newHouse.save(); // Guardar la vivienda en la base de datos
    const populatedHouse = await Housing.findById(newHouse._id)// Buscar la vivienda por su ID y por los campos relacionados
      .populate('user')
      .exec();
    res.status(200).json({ msg: 'Vivienda agregada con éxito', house: populatedHouse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al agregar la vivienda' });
  }
};

const getHouse = async (req, res) => {
  try {
    if (req.params.houseId) {
      // Si se proporciona un ID de casa en la ruta, buscar una casa por ID
      const house = await Housing.findById(req.params.houseId)
        .populate("user");

      if (!house) {
        return res.status(404).json({ msg: 'No se ha encontrado la vivienda' });
      }

      return res.status(200).json(house);
    } else {
      // Si no se proporciona un ID de casa en la ruta, buscar todas las casas
      const filter = req.query.status ? { status: req.query.status } : {};
      const houses = await Housing.find(filter)
        .populate("user");

      if (houses.length === 0) {
        return res.status(404).json({ msg: 'No se han encontrado viviendas' });
      }

      return res.status(200).json(houses);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};


// soft Delete house
    
const deleteHouse = async (req, res, next) => {
   try {
     const housingId = req.params.housingId;
     const housing = await Housing.findByIdAndUpdate(housingId, {isDeleted: true});
    if (!housing){
      return res.status(404).json({ msg: 'No se encontro la vivienda'});
    }
    res.status(200).json({ msg: "La vivienda ha sido eliminada exitosamente"})
   } catch (error) {
    res.status(500).json({msg: error.message});
   }
  };

// Permanent Delete house 
const permanentDeleteHouse = async (req, res) => {
  try {
    const housingId = req.param.housingId;
    const housing = await  Housing.findByIdAndDelete(housingId);

    if (!housing) {
      return res.status.json(404).json({msg: 'No se encontro la vivienda'});
    }
    res.status(200).json({msg: 'La vivienda ha sido eliminada exitosamente'});
  } catch ( error ) {
    res.status(500).json({msg: error.message});
  }
}

const updateHouse = (req,res) => {
  Housing.findByIdAndUpdate({ _id: req.params.houseId }, req.body, { new: true })
      .populate('user')
      .then(house=>{
          if (house === null) {
              res.status(404).send({msg: "No se han encontrado la vivienda"})
          } else {
              res.status(200).send(house)   
          }
      })
      .catch(error=>{
          switch (error.name) {
              case 'CastError':
                  res.status(400).send({msg: 'Formato de id inválido'})
                  break;
              default:
                  res.status(400).send(error)
          }
      })
}


module.exports = {
  getHouse,
  addHouse,
  deleteHouse,
  permanentDeleteHouse,
  updateHouse,
};