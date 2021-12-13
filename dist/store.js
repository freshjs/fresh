"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Store is a stable container for basic state management
 * @type {Object}
 */
var Store = /*#__PURE__*/function () {
  function Store() {
    var st = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Store);

    // set the store.  Verify that `st` is a object, not an array and not null or undefined, else set it to an object.
    this._store = st && _typeof(st) === 'object' && !Array.isArray(st) ? st : {}; // if a custom settings object is applied
    // isInheritable is set, then use it, else default false

    this.isInheritable = settings.isInheritable ? settings.isInheritable : false;
    this.reset(st);
  }
  /**
   * [get] store
   * 
   * get the value of the store
   */


  _createClass(Store, [{
    key: "store",
    get: function get() {
      return this._store;
    }
    /**
     * [set] store
     * 
     * set the store
     */
    ,
    set: function set(sV) {
      this._store = sV;
    }
    /**
     * inheritable
     * 
     * define objects that can inherite the store as a local store
     */

  }, {
    key: "inheritable",
    value: function inheritable() {}
    /**
     * reset
     * @accepts storeState as sV
     * 
     * Resets the state, optionally with a base store to reset to
     */

  }, {
    key: "reset",
    value: function reset(sV) {
      this._store = sV;
    }
    /**
     * inheritableTemplate
     * 
     * 
     */

  }, {
    key: "inheritableTemplate",
    value: function inheritableTemplate() {
      return _index.default.dom("div", null);
    }
    /**
     * 
     * 
     */

  }, {
    key: "template",
    value: function template(children) {
      if (this.isInheritable) return this.inheritableTemplate();
      return _index.default.dom("div", null);
    }
  }]);

  return Store;
}();

exports.default = Store;