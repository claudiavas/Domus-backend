var express = require('express');
var router = express.Router();


userController = require('../controllers/userController');
const { jwtMiddleware, authRouter} = require("../security/jwt")

//A continuación van las rutas que permiten controlar los usuarios

/* register */
  router.post('/register', authRouter);

/* login */
  router.post("/login", authRouter)

/* me Comprueba el token del usuario si es correcto */
  router.get("/me", userController.meUser)
/* Obtener un usuario por su userId*/
  router.get("/", userController.getUser)
  
  router.get("/:userId", userController.getUser)


module.exports = router;
