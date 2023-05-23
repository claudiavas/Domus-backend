var express = require('express');
var router = express.Router();

// Ruta raíz o página de inicio
router.get('/', function(req, res) {
  res.send('Hello World!');
});

module.exports = router;