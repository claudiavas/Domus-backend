var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");


const port = process.env.PORT || 3005

var indexRoutes = require('./routes/index'); 
var userRoutes = require('./routes/userRoutes'); 
var housingRoutes = require('./routes/housingRoutes');
var requestRoutes = require('./routes/requestRoutes');
var ratingRoutes = require('./routes/ratingRoutes');
var realEstateRoutes = require('./routes/realEstateRoutes');
var uploadImagesRoutes = require('./routes/uploadImagesRoutes');
var emailRoutes = require('./routes/emailRoutes');
const fileUpload = require('express-fileupload');


var app = express();

// Middleware para el manejo de archivos de imágenes
app.use(fileUpload());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: 'http://localhost:5173',
}));

// Configurar cabeceras CORS
// Configurar cabeceras CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // Permite todas las solicitudes de cualquier origen
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos HTTP permitidos
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Cabeceras permitidas
  next();
});


// Conexion a BB DD.
require ('./mongo');


// Load routes
app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/upload', uploadImagesRoutes);
app.use('/api/housing', housingRoutes);
app.use('/api/request', requestRoutes);
app.use('/api/realEstate', realEstateRoutes);
app.use('/api/rating', ratingRoutes);
app.use('/api/sendemail', emailRoutes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;