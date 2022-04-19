import express from 'express'
import bodyParser from 'body-parser'
import createError from 'http-errors'
import dontev from 'dotenv'
import cors from 'cors'
import routes from './routes/index.js'

const app = express();
// set dontev to use env in development
dontev.config();
// cors
app.use(cors());

// middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// mongodb connection
import ('./config/mongodb.config.js').sync;

// routes
app.get('/',(req,res) => { 
  return res.status(200).send({ message:'Welcome to express-mongodb app' }); 
});
app.use('/api', routes);

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