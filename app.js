const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const createError = require('http-errors');
require('dotenv').config();

// cors
const cors = require('cors');
app.use(cors());

// middleware 
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mongodb connection
require('./config/mongodb.config').sync;

// routes
const AuthRoutes = require('./routes/api/auth.route.js');
const CrudRoutes = require('./routes/api/crud.route.js');
app.get('/',(req,res) => { return res.status(200).send({ message:'Success' }); })
app.use('/api',AuthRoutes);
app.use('/api',CrudRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// server 
const port = process.env.PORT || 5000;
app.listen(port, function(err) {
  if (err) console.log(err);
  console.log("Server running on ", port," in ",app.settings.env," mode.");
});