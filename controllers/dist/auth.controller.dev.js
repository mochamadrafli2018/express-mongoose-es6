"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../models/user.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const User = import ('../models/user.schema')
// user authentication
var login = function login(req, res) {
  // validate request
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;
  console.log(req.body);
  if (!email) return res.status(400).send({
    message: 'Email harus di isi !'
  });
  if (!password) return res.status(400).send({
    message: 'Password harus di isi !'
  });
  if (password.length < 8) return res.status(400).send({
    message: 'Password harus sama dengan atau lebih dari 8 karakter !'
  }); // check email already exist or not

  try {
    _user["default"].findOne({
      email: email
    }).then(function (user) {
      if (!user) {
        console.log('Email tidak ditemukan pada database.');
        return res.status(500).send({
          message: 'Email tidak terdaftar, silahkan daftar terlebih dahulu.'
        });
      } else if (user) {
        console.log('Email ditemukan pada database.'); // comparing passwords

        var passwordIsValid = _bcrypt["default"].compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
          console.log('Email terdaftar, tapi password salah.');
          return res.status(409).send({
            message: 'Email terdaftar, tapi password salah.',
            token: null
          });
        } else if (passwordIsValid) {
          // signing token with user id
          var accessToken = _jsonwebtoken["default"].sign({
            id: user._id
          }, process.env.JWT_SECRET, {
            expiresIn: 86400
          });

          console.log('Berhasil masuk.');
          console.log('Token: ', accessToken);
          return res.status(200).send({
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role
            },
            token: accessToken
          });
        }
      }
    });
  } catch (err) {
    return res.status(500).send({
      message: err || 'Coba cek koneksi internetmu.'
    });
  }
}; // user authorization with verify the access token


var verifyAccessToken = function verifyAccessToken(req, res) {
  var header = req.headers.authorization;
  var authHeader = req.headers['authorization']; // header and authHeader are same

  var token = authHeader.split(' ')[1];
  console.log(authHeader);
  console.log(header);
  console.log(token); // validation

  if (!authHeader) {
    return res.status(403).send({
      message: 'request header undefined'
    });
  } // convert token to json (decoded)


  var decodedResult = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);

  console.log(decodedResult.id);

  _user["default"].findOne({
    _id: decodedResult.id
  }).then(function (user) {
    if (user.role === 'admin') {
      console.log(user.name);
      return res.status(200).send({
        message: 'congratulations! there is no hidden content',
        name: user.name
      });
    }

    console.log(user.name);
    return res.status(200).send({
      message: 'congratulations! but there is a hidden content',
      name: user.name
    });
  })["catch"](function (err) {
    return res.status(401).send({
      message: 'invalid jwt token'
    });
  });
};

var auth = {
  login: login,
  verifyAccessToken: verifyAccessToken
};
var _default = auth;
exports["default"] = _default;