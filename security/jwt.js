const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const jwtSecret = process.env.JWT_SECRET;

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const email = req.body.email;
  const data = req.body;
  console.log(req.body);
  // * Make sure request has the email
  if (!email) {
    return res.status(400).json({ error: { result: "Email not received" } });
  }

/** Preparar para utilizar los datos desde el controller Users */  
  const existingUser = await User.findOne({ email: email });
  // * If the user is found, return an error because there is already a user registered
  if (existingUser) {
    return res
      .status(400)
      .json({ error: { result: "Email already registered" } });
  } else {
    const newUser = new User({
      email: data.email,
      password: data.password,
      name: data.name,
      surname: data.surname,
      /* identification: data.identification,
      zip_code: data.zip_code,
      id_realstate: data.id_realstate,
      tipo_usuario: "AGENTE", */
    });
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
        .json({ error: { result: "Error creating new User :(", err } });
    }
  }
});

// ! --------------------------------------

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // * Validate, email and password were provided in the request
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: { result: "Missing email or password" } });
  }
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res
        .status(400)
        .json({ error: { result: "User not found, please Register" } });
    }
    // * Validate password with bcrypt library
    if (!foundUser.comparePassword(password)) { 
      return res.status(400).json({ error: { result: "Invalid Password" } });
    }
    // * if everything is ok, return the new token and user data
    return res.status(200).json({
      token: foundUser.generateJWT(),
      user: {
        email: foundUser.email,
        name: foundUser.name,
        id: foundUser._id,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: { result: "Error Login in :(", error: err.message } });
  }
});

const jwtMiddleware = (req, res, next) => {
  // Recogemos el header "Authorization". Sabemos que viene en formato "Bearer XXXXX...",
  // así que nos quedamos solo con el token y obviamos "Bearer "
  const authHeader = req.headers["authorization"];

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
