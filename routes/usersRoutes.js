var express = require('express');
var router = express.Router();


let mySecret = process.env.mysecret;

/* register */
router.post('/register', function(req, res, next) {
  const { name, email, password  } = req.body;
  
  const token = jwt.sign({name, email, password}, mySecret, {expiresIn: '1h'});

  res.status(200).json({ result: 'sucess'}, token);
});

router.post('/login', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
