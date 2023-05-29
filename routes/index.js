const express = require('express');
const router = express.Router();
const generalRouter = express.Router();
const { jwtMiddleware, authRouter} = require("../security/jwt")

generalRouter.use("/", authRouter);

//generalRouter.use("")

// Ruta raíz o página de inicio
//router.get('/', function(req, res) {
//  res.send('Hello World!');
//});


module.exports = generalRouter;