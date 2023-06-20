const Housing = require('../models/housingModel');

const { ObjectId } = require('mongodb');
const housingId = new ObjectId()



const addHouse = async (req, res) => {
  const houseData = req.body; // Obtener los datos de la vivienda del cuerpo de la solicitud
  console.log('el body es', req.body);
  try {
    const newHouse = new Housing(houseData); // Crear una nueva instancia del modelo de vivienda

    await newHouse.save(); // Guardar la vivienda en la base de datos

    res.status(200).json({ msg: 'Vivienda agregada con éxito', house: newHouse });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar la vivienda' });
  }
};


const getHouse = async (req, res) => {
  try {
    if (req.params.houseId) {
      // Si se proporciona un ID de casa en la ruta, buscar una casa por ID
      const house = await Housing.findById(req.params.houseId);

      if (!house) {
        return res.status(404).json({ msg: 'No se ha encontrado la vivienda' });
      }

      return res.status(200).json(house);
    } else {
      // Si no se proporciona un ID de casa en la ruta, buscar todas las casas
      const filter = req.query.status ? { status: req.query.status } : {};
      const houses = await Housing.find(filter);

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
     const housing = await Housing.findByIdAndUpdate(HousingId, {isDeleted: true});
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
// Update House 
const updateHouse = async (req, res, next) => {
  try {
    const housingId = req.params._id;
    const updates = req.body;
    const options = { new: true};

    const updatedHouse = await Housing.findByIdAndUpdate(HousingId, updates, options);

    if (!updatedHousing) {
      return res.status.json(404).json({msg: 'No se encontro la vivienda'});
    }
    res.status(200).json({ updatedHousing });  // Devuelve la vivienda actualizada
  } catch (error) {
    res.status(500).json({msg: error.message });
  }
};



module.exports = {
  getHouse,
  addHouse,
  deleteHouse,
  permanentDeleteHouse,
  updateHouse,
};