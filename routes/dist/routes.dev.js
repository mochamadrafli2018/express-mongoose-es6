"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../controllers/auth.controller");

var _user = require("../controllers/user.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // sign up new user


router.post('/register', _user.register); // sign in (user controllerentication)

router.post('/login', _auth.login); // verify token (user controllerorization)

router.get('/verify', _auth.verifyAccessToken); // read all user data

router.get('/users', _user.find); // read user data by id

router.get('/users/:id', _user.findById); // update user data by id

router.put('/users/:id', _user.findOneAndUpdate); // delete user data by id

router["delete"]('/users/:id', _user.findByIdAndRemove); // delete all user data

router["delete"]('/users', _user.remove);
var _default = router;
exports["default"] = _default;