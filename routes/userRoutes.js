var express = require('express');
var router = express.Router();
// var jwt = require('../security/jwt')


userController = require('../controllers/userController');
const { jwtMiddleware, authRouter} = require("../security/jwt")

//A continuación van las rutas que permiten controlar los usuarios

/* register */
  router.post('/register', authRouter);

/* login */
  router.post("/login", authRouter)

  /* resetPassword */
  router.put("/resetpassword/:userId", authRouter)

/* me Comprueba el token del usuario si es correcto */
  router.get("/me", userController.meUser)
/* Obtener un usuario por su userId*/
  router.get("/", userController.getUser) 
  
  router.get("/:userId", userController.getUser) // Obtener un usuario por su userId

  router.put("/:userId", userController.updateUser) // Actualizar un usuario por su userId


module.exports = router;
