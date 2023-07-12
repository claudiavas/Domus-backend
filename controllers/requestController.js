const Request = require('../models/requestModel');

const User = require('../models/userModel');

const { ObjectId } = require('mongodb');
const requestId = new ObjectId()

const getRequest = async (req, res) => {
  try {
    if (req.params.requestId) {
      // Si se proporciona un ID de request en la ruta, buscar el request por ID
      const request = await Request.findById(req.params.requestId) 
        .populate("user");

    if (!request) {
      return res.status(404).json({ msg: 'No se ha encontrado la solicitud' });
    }  
    
    return res.status(200).json(request);
    } else {
        const filter = req.query.status ?{ status: req.query.status } : {};
        const requests = await Request.find(filter)
          .populate("user");
          console.log('array de request', requests);
      if (requests.length === 0) {
        return res.status(400).json({ msg: 'No se han encontrado solicitudes' });
      }
      return res.status(200).json(requests);
    }
  } catch (error) {
    return res.status(400).json(error);
  } 
};    

// Función para agregar una solicitud
const addRequest = async (req, res) => {
  const { userId, ...requestFields} = req.body; // Obtener los datos de la solicitud del cuerpo de la solicitud
  console.log('el body es', req.body)
  try {
    const newRequest = new Request({
      user: userId,
      ...requestFields,
    }); // Agregar los demás campos del Request utilizando la desestructuración
    const populatedRequest = await Request.findById(newRequest._id)// Buscar la vivienda por su ID y por los campos relacionados
      .populate('user')
      .exec();
    res.status(200).json({ msg: 'Request agregada con éxito', request: populatedRequest });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al agregar la Request' });
  }
};

// Función para eliminar una solicitud (marcar como eliminada)
const deleteRequest = async (req, res) => {
  const { requestId } = req.params; // Obtener el ID de la solicitud de los parámetros de la solicitud

  try {
    const deletedRequest = await Request.findByIdAndUpdate(
      requestId,
      { deletedAt: new Date() },
      { new: true }
    ); // Buscar y marcar como eliminada la solicitud por su ID

    if (!deletedRequest) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    res.status(200).json({ message: 'Solicitud eliminada correctamente', deletedRequest });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la solicitud' });
  }
};

// Función para actualizar una solicitud
const updateRequest = async (req, res) => {
  const { requestId } = req.params; // Obtener el ID de la solicitud de los parámetros de la solicitud
  const updateData = req.body; // Obtener los nuevos datos de la solicitud del cuerpo de la solicitud

  try {
    const updatedRequest = await Request.findByIdAndUpdate(requestId, updateData, { new: true }); // Buscar y actualizar la solicitud por su ID

    if (!updatedRequest) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    res.status(200).json({ message: 'Solicitud actualizada correctamente', updatedRequest });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la solicitud' });
  }
};

// Función para eliminar permanentemente una solicitud
const permanentDeleteRequest = async (req, res) => {
  const { requestId } = req.params; // Obtener el ID de la solicitud de los parámetros de la solicitud

  try {
    const deletedRequest = await Request.findByIdAndDelete(requestId); // Buscar y eliminar permanentemente la solicitud por su ID

    if (!deletedRequest) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    res.status(200).json({ message: 'Solicitud eliminada permanentemente correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar permanentemente la solicitud' });
  }
};

module.exports = {
   getRequest,
   addRequest,
   deleteRequest,
   updateRequest,
   permanentDeleteRequest
};
