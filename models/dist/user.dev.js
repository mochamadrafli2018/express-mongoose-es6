"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var model = new _mongoose["default"].Schema({
  name: {
    type: String,
    "default": null,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  gender: {
    type: String,
    "default": null,
    required: true
  },
  password: {
    type: String,
    "default": null,
    required: true
  },
  role: {
    type: String,
    "enum": ["member", "admin"],
    required: true
  },
  updatedScreeningResult: {
    type: String,
    "default": null
  }
}, {
  timestamps: true
}); // name, model, collection

var User = _mongoose["default"].model("User", model, 'users');

var _default = User;
exports["default"] = _default;