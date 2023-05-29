const express = require('express');
//const router = express.Router();
const generalRouter = express.Router();
const agentRoutes = require ("./agents");
const { jwtMiddleware, authRouter} = require("../security/jwt");

generalRouter.use("/", authRouter);

generalRouter.use("/agent", jwtMiddleware, agentRoutes);

// Ruta raíz o página de inicio
generalRouter.get('/', function(req, res) {
  res.send('Hello World!');
});


module.exports = generalRouter;