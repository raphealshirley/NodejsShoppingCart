const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session); 
const routes = require('./routes/index');
const app = express();

//connect to mongo
mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/FoodCart',{ useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));


//enable cookies and sessions
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'FoodCart', 
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }), 
  cookie: { maxAge: 100 * 60 * 1000 }
}));

app.use(function(req, res, next){
  res.locals.session = req.session;
  console.log("local: " + res.locals.session);
  next();
});

//router
app.use(routes);

// if www.sh does not work, run "node app.js" directly
const port = process.env.PORT || 3000
app.listen(port, ()=>console.log(`Listening on port ${port}`))


module.exports = app;
