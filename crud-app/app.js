var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pessoasRouter = require('./routes/pessoas');
var produtosRouter = require('./routes/produtos');

var app = express();

var exphbs = require('express-handlebars'); // Deve ser usado após o var app. Serve para color mascara no número do telefone
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs'); // Esta linha está comentada, o que está correto

app.engine('hbs', exphbs.engine({
  defaultLayout: 'layout',
  extname: 'hbs',
  helpers: {
    formatTelefone: function (telefone) {
      // Garante que o input seja tratado como string e remove caracteres não numéricos
      const num = String(telefone).replace(/\D/g, '');

      // Lógica de formatação
      if (num.length === 11) {
        return `(${num.substring(0, 2)}) ${num.substring(2, 3)} ${num.substring(3, 7)}-${num.substring(7, 11)}`;
      } else if (num.length === 10) {
        return `(${num.substring(0, 2)}) ${num.substring(2, 6)}-${num.substring(6, 10)}`;
      } else {
        return telefone;
      }
    }
  }
}));

app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pessoas', pessoasRouter);
app.use('/produtos', produtosRouter);

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
