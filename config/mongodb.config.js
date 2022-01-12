// DB Connection
const mongoose = require('mongoose');

mongoose.connect(process.env.ATLAS_URI,
  function(err) {
    if (err) {
      console.log('Database connection is failed. exiting now...');      
    }
    console.log('Successfully connected to database and collection');
  }
)