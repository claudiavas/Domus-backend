const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const jwtSecret = process.env.JWT_SECRET;

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const surname = req.body.surname;
  const subscription = req.body.suscription;
  const data = req.body;

  console.log(req.body);

  // * Make sure request has the email
  if (!email) {
    return res.status(400).json({ error: { result: "Ingresa tu email" } });
  }

  // * Check if the user already exists
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res
      .status(400)
      .json({ error: { result: "Ya existe una cuenta con este email" } });
  }

  // * Validate name
  if (!name) {
    return res.status(400).json({ error: { result: "Ingresa tu nombre" } });
  }

  // * Validate surname
  if (!surname) {
    return res.status(400).json({ error: { result: "Ingresa tu apellido" } });
  }

  // * Validate password
  if (!password) {
    return res.status(400).json({ error: { result: "Ingresa tu password" } });
  }

  // Create a new user
  const newUser = new User({
    email: data.email,
    password: data.password,
    name: data.name,
    surname: data.surname,
    subscription: data.subscription,
  });

  try {
    const savedUser = await newUser.save();
    if (savedUser) {
      return res.status(201).json({
        token: savedUser.generateJWT(),
        user: {
          email: savedUser.email,
          name: savedUser.name,
          id: savedUser._id,
        },
      });
    } else {
      return res
        .status(500)
        .json({ error: { result: "Error al crear un nuevo usuario :(", err } });
    }
  } catch (error) {
    return res.status(500).json({ error: { result: "Error al crear un nuevo usuario :(", error: error.message } });
  }
});

// ! --------------------------------------

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  // * Validate, email and password were provided in the request
  if (!email) {
    return res
      .status(400)
      .json({ error: { result: "Ingresa tu email" } });
  }
  
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res
        .status(400)
        .json({ error: { result: "Usuario no encontrado, por favor regístrate" } });
    }
    // * Validate password with bcrypt library
    if (!password) {
      return res
        .status(400)
        .json({ error: { result: "Ingresa tu password" } });
    }

    if (!foundUser.comparePassword(password)) { 
      return res.status(400).json({ error: { result: "Password inválido" } });
    }
    // * if everything is ok, return the new token and user data
    return res.status(200).json({
      token: foundUser.generateJWT(),
      user: {
        email: foundUser.email,
        name: foundUser.name,
        _id: foundUser._id,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: { result: "Error al hacer Login :(", error: err.message } });
  }
});

// ! --------------------------------------

authRouter.put("/resetpassword/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;

    const user = await User.findByIdAndUpdate(userId, { password }, { new: false });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    user.password = password;
    await user.save();

    return res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar la contraseña', error: error.message });
  }
});


  // ! --------------------------------------

const jwtMiddleware = (req, res, next) => {
  // Recogemos el header "Authorization". Sabemos que viene en formato "Bearer XXXXX...",
  // así que nos quedamos solo con el token y obviamos "Bearer "
  const authHeader = req.headers["authorization"];
  console.log('Authheader',authHeader);
  if (!authHeader)
    return res.status(401).json({ error: "Unauthorized MISSING HEADER" });
  const token = authHeader.split(" ")[1];
  // Si no hubiera token, respondemos con un 401
  if (!token) return res.status(401).json({ error: "Unauthorized and missing token" });

  let tokenPayload;

  try {
    // Si la función verify() funciona, devolverá el payload del token
    tokenPayload = jwt.verify(token, jwtSecret);
  } catch (error) {
    // Si falla, será porque el token es inválido, por lo que devolvemo error 401
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Guardamos los datos del token dentro de req.jwtPayload, para que esté accesible en los próximos objetos req
  req.jwtPayload = tokenPayload;
  next();
};

User.schema.pre("save", function(next) {
  const user = this;
  // si no se ha cambiado la contraseña, seguimos
  if (!user.isModified("password")) return next();
  // bcrypt es una librería que genera "hashes", encriptamos la contraseña
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      // si no ha habido error en el encriptado, guardamos
      user.password = hash;
      next();
    });
  });
});

module.exports = {
  authRouter,
  jwtMiddleware,
};
