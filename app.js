var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");


const port = process.env.PORT || 3005

var userRoutes = require('./routes/userRoutes'); 
var housingRoutes = require('./routes/housingRoutes');
var requestRoutes = require('./routes/requestRoutes');
var ratingRoutes = require('./routes/ratingRoutes');
var realEstateRoutes = require('./routes/realEstateRoutes');
var forgotEmailRoutes = require('./routes/forgotEmailRoutes');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configurar cabeceras CORS
app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}));

// Conexion a BB DD.
require ('./mongo');


// Load routes
app.use('/user', userRoutes);
app.use('/api/housing', housingRoutes);
app.use('/api/request', requestRoutes);
app.use('/api/realEstate', realEstateRoutes);
app.use('/api/sendEmail', forgotEmailRoutes);
app.use('/api/rating', ratingRoutes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.error(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);

  // Send a custom HTML error response to the client
  res.send(`
    <html>
      <head>
        <title>Error</title>
      </head>
      <body>
        <h1>Error</h1>
        <p>${err.message}</p>
        <p>${err.status}</p>
        <pre>${err.stack}</pre>
      </body>
    </html>
  `);
});

module.exports = app;