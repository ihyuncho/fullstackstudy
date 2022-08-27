const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

//use middlewares 
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 *60 *1000, //30 days in milisecond
    keys: [keys.cookieKey]
  })  
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production'){
  // Express will serve up production assets like main.js and main.css

  app.use(express.static('client/build'));// search assets in this folder

  // Express will serve up the inderx.html file
  //if it doesn't recognize the route
  // note: this case is the last case when all the condition upper side doesn't match 
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
 