"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Element", {
  enumerable: true,
  get: function get() {
    return _element.default;
  }
});
Object.defineProperty(exports, "Node", {
  enumerable: true,
  get: function get() {
    return _node.default;
  }
});
Object.defineProperty(exports, "Store", {
  enumerable: true,
  get: function get() {
    return _store.default;
  }
});
exports.default = void 0;

var _fresh = _interopRequireDefault(require("./fresh.js"));

var _element = _interopRequireDefault(require("./element.js"));

var _node = _interopRequireDefault(require("./node.js"));

var _store = _interopRequireDefault(require("./store.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// add the map to the object prototype
Object.prototype.map = function (mapper) {
  var output;
  var keys = Object.keys(this);

  for (var i = 0; i < keys.length; i++) {
    var o = {};
    o[keys[i]] = this[keys[i]];
    var v = mapper(o, i);
    if (v) output = Object.assign(output, v);
  }

  return output;
}; // Check if there is a Fresh instance on the window object
// If not, assign it.


if (!window.Fresh) window.Fresh = new _fresh.default();
var _default = window.Fresh;
exports.default = _default;