'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Store is a stable container for basic state management
 * @type {Object}
 */
var Store = function () {
    function Store() {
        var st = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Store);

        // set the store.  Verify that `st` is a object, not an array and not null or undefined, else set it to an object.
        this._store = st && (typeof st === 'undefined' ? 'undefined' : _typeof(st)) === 'object' && !Array.isArray(st) ? st : {};
        // if a custom settings object is applied
        // isInheritable is set, then use it, else default false
        this.isInheritable = settings.isInheritable ? settings.isInheritable : false;

        this.reset(st);
    }

    _createClass(Store, [{
        key: 'inheritable',
        value: function inheritable() {}
    }, {
        key: 'reset',
        value: function reset(sV) {
            this._store = sV;
        }
    }, {
        key: 'inheritableTemplate',
        value: function inheritableTemplate() {
            return _index2.default.dom('div', null);
        }
    }, {
        key: 'template',
        value: function template(children) {
            if (this.isInheritable) return this.inheritableTemplate();
            return _index2.default.dom('div', null);
        }
    }, {
        key: 'store',
        get: function get() {
            return this._store;
        },
        set: function set(sV) {
            this._store = sV;
        }
    }]);

    return Store;
}();

exports.default = Store;