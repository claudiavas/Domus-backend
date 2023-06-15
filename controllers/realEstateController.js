const Realstate = require('../models/realEstateModel');

const { ObjectId } = require('mongodb');

// Función para agregar una inmobiliaria
const addRealEstate = async (req, res) => {
  const RealEstateData = req.body; // Obtener los datos de la inmobiliaria del cuerpo de la solicitud

  try {
    const newrealEstate = new RealEstate(RealEstateData); // Crear una nueva instancia de RealEstate

    await newrealEstate.save(); // Guardar la nueva inmobiliaria en la base de datos

    res.status(201).json({ msg: 'Inmobiliaria agregada correctamente', realEstate: newrealEstate});
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar la inmobiliaria' });
  }
};

// Función para obtener una inmobiliaria por su ID
const getRealEstate = async (req, res) => {
  const { realEstateId } = req.params; // Obtener el ID de la inmobiliaria de los parámetros de la solicitud

  try {
    const realEstate = await RealEstate.findById(realEstateId); // Buscar la inmobiliaria por su ID

    if (!realEstate) {
      return res.status(404).json({ error: 'Inmobiliaria no encontrada' });
    }

    res.status(200).json({ realEstate });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la inmobiliaria' });
  }
};

// Función para eliminar una inmobiliaria (soft delete)
const deleteRealEstate = async (req, res) => {
  const { realEstateId } = req.params; // Obtener el ID de la inmobiliaria de los parámetros de la solicitud

  try {
    const deletedRealEstate = await RealEstate.findByIdAndUpdate(
      realEstateId,
      { deletedAt: new Date() },
      { new: true }
    ); // Buscar y marcar como eliminada la inmobiliaria por su ID

    if (!deletedRealEstate) {
      return res.status(404).json({ error: 'Inmobiliaria no encontrada' });
    }

    res.status(200).json({ message: 'Inmobiliaria eliminada correctamente', deletedRealEstate });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la inmobiliaria' });
  }
};

// Función para actualizar una inmobiliaria
const updateRealEstate = async (req, res) => {
  const { realEstateId } = req.params; // Obtener el ID de la inmobiliaria de los parámetros de la solicitud
  const updateData = req.body; // Obtener los nuevos datos de la inmobiliaria del cuerpo de la solicitud

  try {
    const updatedRealEstate = await RealEstate.findByIdAndUpdate(
      realEstateId,
      updateData,
      { new: true }
    ); // Buscar y actualizar la inmobiliaria por su ID

    if (!updatedRealEstate) {
      return res.status(404).json({ error: 'Inmobiliaria no encontrada' });
    }

    res.status(200).json({ message: 'Inmobiliaria actualizada correctamente', updatedRealEstate });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la inmobiliaria' });
  }
};

// Función para eliminar permanentemente una inmobiliaria
const permanentDeleteRealEstate = async (req, res) => {
  const { realEstateId } = req.params; // Obtener el ID de la inmobiliaria de los parámetros de la solicitud

  try {
    const deletedRealEstate = await RealEstate.findByIdAndDelete(realEstateId); // Buscar y eliminar permanentemente la inmobiliaria por su ID

    if (!deletedRealEstate) {
      return res.status(404).json({ error: 'Inmobiliaria no encontrada' });
    }

    res.status(200).json({ message: 'Inmobiliaria eliminada permanentemente correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar permanentemente la inmobiliaria' });
  }
};

module.exports = {
  getRealEstate,
  addRealEstate,
  deleteRealEstate,
  updateRealEstate,
  permanentDeleteRealEstate,
};