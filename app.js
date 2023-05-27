var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors")

// Load environment variables
require('dotenv').config()

const port = process.env.PORT || 3005

var indexRoutes = require('./routes/index');
var usersRoutes = require('./routes/users');
var housingRoutes = require('./routes/housingRoutes');
var requestsRoutes = require('./routes/requestsRoutes');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

require ('./mongo')

/*
// Connect to database
const mongoose = require("mongoose");

//console.log("db user", process.env.DB_USER);
//console.log("db password", process.env.DB_PASSWORD);

const mongoDB = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_SERVER + "/" + process.env.DB_NAME + "?retryWrites=true&w=majority";
//console.log("mongoDB",mongoDB);
async function main() {
  await mongoose.connect(mongoDB);
}
main().catch(err => console.log(err));*/

// Load routes
app.use('/', indexRoutes);
app.use('/users', usersRoutes);
app.use('/api/housing', housingRoutes);
app.use('/api/requests', requestsRoutes);

// Load routes
const index = require("./routes/index")
app.use("/housing", index)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

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

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;