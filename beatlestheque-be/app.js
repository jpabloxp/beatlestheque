var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser'); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var beatlesRouter = require('./api/catalogue');

const configDb = require('./config/database');
const cors = require('cors');
const mongoose = require('mongoose');

var app = express();

//CONFIGURE MONGOOSE #########
// Header cross origin
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// On importe la conf puis on connecte via la propriété database
mongoose.connect(configDb.database, {
  useNewUrlParser: true
});
mongoose.set('useFindAndModify', false);
let db = mongoose.connection;
mongoose.pluralize(null);

// Controle de la connexion
db.once('open', () => {
  console.log('Connected to MongoDB app');
});

// Controle des erreur DB
db.on('error', (err) => {
  console.log(err);
});
//###########################

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//ADD THIS TO DISPLAYE IMAGES FROM ../PUBLIC/IMAGES
app.use(express.static('public'));

app.use(logger('dev'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', beatlesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
