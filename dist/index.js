'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Element = undefined;

var _fresh = require('./fresh.js');

var _fresh2 = _interopRequireDefault(_fresh);

var _element = require('./element.js');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 
// // New fresh
var f = new _fresh2.default();
var b = new _element2.default();
// 
// export default f;
// export Element;

exports.default = f;
exports.Element = _element2.default;