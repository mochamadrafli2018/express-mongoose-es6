"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authController = _interopRequireDefault(require("../controllers/auth.controller.js"));

var _userController = _interopRequireDefault(require("../controllers/user.controller.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // sign up new user


router.post('/register', _userController["default"].register); // sign in (user controllerentication)

router.post('/login', _authController["default"].login); // verify token (user controllerorization)

router.get('/verify', _authController["default"].verifyAccessToken); // read all user data

router.get('/users', _userController["default"].findAll); // read user data by id

router.get('/users/:id', _userController["default"].findById); // update user data by id

router.put('/users/:id', _userController["default"].findOneAndUpdate); // delete user data by id

router["delete"]('/users/:id', _userController["default"].findByIdAndRemove); // delete all user data

router["delete"]('/users', _userController["default"].remove);
var _default = router;
exports["default"] = _default;