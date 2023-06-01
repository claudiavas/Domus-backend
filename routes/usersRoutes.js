var express = require('express');
var router = express.Router();


userController = require('../controllers/userController');
const { jwtMiddleware, authRouter} = require("../security/jwt")

//A continuación van las rutas que permiten controlar los usuarios

/* register */
  router.post('/register', authRouter);

/* login */
  router.post("/login", jwtMiddleware, authRouter)

/* */
  router.get("/me", userController.meUser)
/*router.post('/register', function(req, res, next) {
  const { name, email, password  } = req.body;
  
  const token = jwt.sign({name, email, password}, mySecret, {expiresIn: '1h'});

  res.status(200).json({ result: 'sucess'}, token);
});*/

/*router.post('/login', function(req, res, next) {
  const { name, email, password} = req.body;
  console.log(req.body)
  
  res.status(200).json({ result: 'sucess'})
  

  res.send('respond with a resource');
});*/

module.exports = router;
