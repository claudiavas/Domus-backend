const user = require ('../models/userModel');
const jwt = require("jsonwebtoken");
const mySecret = process.env.JWT_SECRET;
const { objectId } = require ('mongodb');



// Me user

const meUser = (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.replace("Bearer ", "") : null;
    console.log('token', token);
    // verifico si el token es correcto si error captura el catch
    try {
        if (!token) {
            throw new Error("Token no proporcionado");
          }
        const decodedToken = jwt.verify(token, mySecret);
        console.log('decoded token es',decodedToken);
        res.json({result: 'success', data: decodedToken})
    } catch (error) {
        console.log('este es el error al verificar el token');
        res.status(400).json({ result: 'No es un token válido'});
    }
}

// Add New User

const addUser = async (req, res) => {
    try {
      const userData = req.body;
      const newUser = new User(userData);
  
      const user = await newUser.save();
      res.status(200).send(user);
    } catch (error) {
      console.log(error.code);
  
      switch (error.code) {
        case 11000:
          res.status(400).send({ msg: 'El Usuario ya existe' });
          break;
        default:
          res.status(400).send(error);
      }
    }
  };

// Get user

const getUser = (req, res) => {
    if (req.params.userId) {
      user.findById(req.params.userId)
        .then((user) => {
          if (user === null) {
            res.status(400).send({ msg: 'No se ha encontrado el usuario' });
          } else {
            res.status(200).send(user);

          }
        })
        .catch((error) => {
          console.log(error);
          switch (error.name) {
            case 'CastError':
              res.status(400).send('Formato de ID de usuario inválido');
              break;
            default:
              res.status(400).send(error);
          }
        });
    } else {
      const filter = {};
      
      if (req.query.email) {
        const email = req.query.email.trim().toLowerCase();
        filter.email = { $regex: new RegExp(`^${email}$`) };
      }      
  
      if (req.query.name) {
        filter.name = req.query.name;
      }
  
      user.find(filter)
        .then((user) => {
          if (user.length === 0) {
            res.status(404).send({ msg: 'No se han encontrado usuarios' });
          } else {
            console.log(user);
            res.status(200).send(user);
          }
        })
        .catch((error) => res.status(400).send(error));
    }
  };
  const updateUser = (req, res) => {
    if (req.params.userId) {
      const { userId } = req.params;
      const updatedUser = req.body;
  
      user.findByIdAndUpdate(userId, updatedUser, { new: true }) // new: true devuelve el usuario actualizado
        .then((updatedUser) => {
          if (updatedUser === null) {
            res.status(400).send({ msg: 'No se ha encontrado el usuario' });
          } else {
            res.status(200).send(updatedUser);
          }
        })
        .catch((error) => {
          console.log(error);
          switch (error.name) { 
            case 'CastError':// error de formato de ID de usuario
              res.status(400).send('Formato de ID de usuario inválido');
              break;
            default: // otro tipo de error
              res.status(400).send(error);
          }
        });
    } else { // no se ha proporcionado un ID de usuario
      res.status(400).send({ msg: 'Se requiere un ID de usuario' });
    }
  };
  

module.exports = {
    getUser,
    addUser,
    meUser,
    updateUser,
    //deleteuser,
    //permanetDeleteuser
}