'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Store = exports.Node = exports.Element = undefined;

var _fresh = require('./fresh.js');

var _fresh2 = _interopRequireDefault(_fresh);

var _element = require('./element.js');

var _element2 = _interopRequireDefault(_element);

var _node = require('./node.js');

var _node2 = _interopRequireDefault(_node);

var _store = require('./store.js');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// add the map to the object prototype
Object.prototype.map = function (mapper) {
    var output = void 0;
    var keys = Object.keys(this);
    for (var i = 0; i < keys.length; i++) {
        var o = {};
        o[keys[i]] = this[keys[i]];
        var v = mapper(o, i);
        if (v) output = Object.assign(output, v);
    }
    return output;
};

// Check if there is a Fresh instance on the window object
// If not, assign it.
if (!window.Fresh) window.Fresh = new _fresh2.default();

exports.default = window.Fresh;
exports.Element = _element2.default;
exports.Node = _node2.default;
exports.Store = _store2.default;