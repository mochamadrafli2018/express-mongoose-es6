"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _user = _interopRequireDefault(require("../models/user.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var register = function register(req, res) {
  // validate requests
  var _req$body = req.body,
      name = _req$body.name,
      email = _req$body.email,
      password = _req$body.password,
      gender = _req$body.gender,
      role = _req$body.role;
  console.log(req.body);
  if (!req.body) return res.status(400).send({
    message: 'Data harus di isi !'
  });
  if (!name) return res.status(400).send({
    message: 'Nama harus di isi !'
  });
  if (!email) return res.status(400).send({
    message: 'Email harus di isi !'
  });
  if (!password) return res.status(400).send({
    message: 'Password harus di isi !'
  });
  if (password.length < 8) return res.status(400).send({
    message: 'Password harus sama dengan atau lebih dari 8 karakter !'
  });
  if (!gender) return res.status(400).send({
    message: 'Jenis kelamin harus di isi !'
  });
  if (!role) return res.status(400).send({
    message: 'Role harus di isi !'
  }); // check if email already exist

  try {
    _user["default"].findOne({
      email: email
    }).then(function (user) {
      if (!user) {
        console.log('Email belum terdaftar.'); // convert password to hashed

        var encryptedPassword = _bcrypt["default"].hashSync(password, 10);

        console.log(encryptedPassword); // initialize newUser data

        var newUser = new _user["default"]({
          name: name,
          email: email,
          gender: gender,
          password: encryptedPassword,
          role: role,
          updatedScreeningResult: ""
        });
        console.log(newUser);
        newUser.save().then(function (data) {
          console.log('Pendaftaran berhasil.');
          return res.status(201).send({
            message: 'Pendaftaran berhasil.',
            data: data
          });
        })["catch"](function (err) {
          return res.status(500).send({
            message: err || 'Pendaftaran gagal.'
          });
        });
      } else if (user) {
        return res.status(409).send({
          message: 'Email sudah terdaftar, silahkan masuk.'
        });
      }
    });
  } catch (err) {
    return res.status(500).send({
      message: err || 'Coba cek koneksi internetmu.'
    });
  }
}; // retrieve all user data from the DB


var findAll = function findAll(req, res) {
  _user["default"].find().then(function (data) {
    return res.status(200).send(data);
  });
}; // get and find a single user data with id


var findById = function findById(req, res) {
  _user["default"].findById({
    _id: req.params.id
  }).then(function (data) {
    if (!data) return res.status(404).send({
      message: 'data not found with id ' + req.params.id + '. Make sure the id was correct'
    });
    return res.status(200).send(data);
  })["catch"](function (err) {
    if (err.kind === 'ObjectId') return res.status(404).send({
      message: 'data not found with id ' + req.params.id
    });
    return res.status(500).send({
      message: 'error retrieving data with id ' + req.params.id
    });
  });
}; // update a user data identified by the  id in the request


var findOneAndUpdate = function findOneAndUpdate(req, res) {
  console.log(req.body);

  _user["default"].findById({
    _id: req.params.id
  }).then(function (currentData) {
    var _ref = '',
        newName = _ref.newName,
        newEmail = _ref.newEmail,
        newPassword = _ref.newPassword,
        newGender = _ref.newGender,
        newRole = _ref.newRole,
        newUpdatedScreeningResult = _ref.newUpdatedScreeningResult;

    if (!req.body.name) {
      newName = currentData.name;
    }

    if (!req.body.email) {
      newEmail = currentData.email;
    }

    if (!req.body.password) {
      newPassword = currentData.password;
    }

    if (!req.body.gender) {
      newGender = currentData.gender;
    }

    if (!req.body.role) {
      newRole = currentData.role;
    }

    if (!req.body.updatedScreeningResult) {
      newUpdatedScreeningResult = currentData.updatedScreeningResult;
    }

    if (req.body.name) {
      newName = req.body.name;
    }

    if (req.body.email) {
      newEmail = req.body.email;
    }

    if (req.body.password) {
      newPassword = req.body.password;
    }

    if (req.body.gender) {
      newGender = req.body.gender;
    }

    if (req.body.role) {
      newRole = req.body.role;
    }

    if (req.body.updatedScreeningResult) {
      newUpdatedScreeningResult = req.body.updatedScreeningResult;
    }

    var newData = new _user["default"]({
      name: newName,
      email: newEmail,
      password: newPassword,
      gender: newGender,
      role: newRole,
      updatedScreeningResult: newUpdatedScreeningResult,
      _id: req.params.id
    });
    console.log(newData); // update with new data

    _user["default"].findByIdAndUpdate({
      _id: req.params.id
    }, newData, {
      "new": true
    }).then(function (updatedData) {
      console.log('success update data');
      return res.status(200).send(updatedData);
    })["catch"](function (err) {
      if (err.kind === 'Object_id') {
        return res.status(404).send({
          message: 'data not found with _id ' + req.params._id
        });
      }

      return res.status(500).send({
        message: 'error updating data with _id ' + req.params._id
      });
    });
  })["catch"](function (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: 'data not found with id ' + req.params.id
      });
    }

    return res.status(500).send({
      message: 'error retrieving data with id ' + req.params.id
    });
  });
}; // delete a user data with the specified id


var findByIdAndRemove = function findByIdAndRemove(req, res) {
  _user["default"].findByIdAndRemove({
    _id: req.params.id
  }).then(function (data) {
    if (!data) {
      return res.status(404).send({
        message: 'data not found with id ' + req.params.id
      });
    }

    console.log('data deleted successfully!');
    return res.status(200).send({
      message: 'data deleted successfully!'
    });
  })["catch"](function (err) {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: 'data not found with id ' + req.params.id
      });
    }

    return res.status(500).send({
      message: 'could not delete data with id ' + req.params.id
    });
  });
}; // delete all user data in collection


var remove = function remove(req, res) {
  _user["default"].remove({}).then(function () {
    return res.status(200).send({
      message: 'All data deleted successfully!'
    });
  })["catch"](function (err) {
    return res.status(500).send({
      message: 'Could not delete all data'
    });
  });
};

var user = {
  register: register,
  findAll: findAll,
  findById: findById,
  findOneAndUpdate: findOneAndUpdate,
  findByIdAndRemove: findByIdAndRemove,
  remove: remove
};
var _default = user;
exports["default"] = _default;