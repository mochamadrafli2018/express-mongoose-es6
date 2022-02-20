const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Register", 
  new mongoose.Schema(
    {
      name : {
        type: String,
        default: null,
        required:true,
        },
      email : { 
        type: String, 
        unique: true,
        lowercase: true,
        trim: true,
        required:true,
      },
      gender : { 
        type: String, 
        default: null,
        required:true,
      },
      password : { 
        type: String,
        default: null,
        required:true,
      },
      role: {
        type: String,
        enum: ["user", "admin"],
        required: true,
      },
    },
    { 
      timestamps: true 
    },
  ),
  // collection
  'user_db',
);