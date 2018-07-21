'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Iterator --
 * 
 * Iterator is a type of data container. It can take in a variety of data once or at different times,
 * sort it and operate on it with pre-defined actions and operators.  Operator plugins can be added to 
 * the Iterator for other features.
 * The data can then be pumped out with a variety of options or searched through.
 * @type {[type]}
 */
var _class = function () {
    function _class(things) {
        var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : none;
        var op = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        _classCallCheck(this, _class);

        var a = things;
        if (action === 'split-string' && typeof op === 'string') a = things.split(op);
        this._children = a;
    }

    _createClass(_class, [{
        key: 'iterate',
        value: function iterate() {
            var func = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var iter = func ? func : function (t) {
                return t;
            };
            for (var i = 0; i < this._children.length; i++) {
                this_children[i] = iter(this._children[i]);
            }
            return this;
        }
    }, {
        key: 'values',
        get: function get() {
            return this._children;
        },
        set: function set(v) {
            this._children = v;
            return this;
        }
    }]);

    return _class;
}();

exports.default = _class;