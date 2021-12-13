"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("./index"));

var _node = _interopRequireDefault(require("./node"));

var _store = _interopRequireDefault(require("./store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Element is a base extendable class that Elements on the page extend to.
 * It takes in `sets`, which are akin to react's props.
 * @type {String}
 */
var Element = /*#__PURE__*/function (_Node) {
  _inherits(Element, _Node);

  var _super = _createSuper(Element);

  function Element(sets) {
    var _this;

    var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, Element);

    // Call the Node constructor
    // TODO node should take children, parent
    _this = _super.call(this, sets, children); // This is the HTMLElement reference; null means it is not set

    _this._dom = null; // TODO Element - What should be stored or should it be stored? defaulting to sets for now

    _this.elementProperties = sets; // TODO Element - this might not need to exist

    _this.innerHTML = content; // localStore is the local state of this element
    // set to null until the first time someone uses it, 
    // or unless there is a setting triggered to always use it initially
    // this.localStore = new Store();

    _this.localStore = null; // set the Sets property

    _this._sets = sets || []; // set the previous sets property

    _this._prevSets = []; // this.c = children;

    return _this;
  }

  _createClass(Element, [{
    key: "sets",
    get: function get() {
      return this._sets;
    },
    set: function set(sTS) {
      this._revSets = this._sets;
      this._sets = sTS;

      if (!_index.default.deepEquals(this._revSets, this._sets)) {
        _index.default.render(this, this._dom);

        this.elementUpdated();
      }
    }
  }, {
    key: "element",
    get: function get() {
      return this.dom || null;
    },
    set: function set(e) {
      this.dom = e;
    }
  }, {
    key: "type",
    get: function get() {
      return this.elementProperties.type || null;
    },
    set: function set(t) {
      this.elementProperties.type = t;
    }
  }, {
    key: "attrs",
    get: function get() {
      return this._sets;
    },
    set: function set(atr) {
      this._sets = atr;
    }
  }, {
    key: "innerHTML",
    get: function get() {
      return this.content;
    },
    set: function set(d) {
      this.content = document.createTextNode(d);
    }
  }, {
    key: "store",
    get: function get() {
      if (!this.localStore) this.localStore = new _store.default();
      return this.localStore.store;
    },
    set: function set(sV) {
      if (!this.localStore) this.localStore = new _store.default();
      this.localStore.reset(sV);
    }
  }, {
    key: "inherits",
    value: function inherits(name, func) {
      if (!Element.prototype[name] && funct) Element.prototype[name] = func;
    }
  }, {
    key: "updateStore",
    value: function updateStore(newSt) {
      var same = _index.default.deepEquals(this._revSets, this._sets);

      this.store = Object.assign(this.store, newSt);
      if (!same) _index.default.render(this, this._dom);
    }
  }, {
    key: "elementRendering",
    value: function elementRendering() {}
  }, {
    key: "elementRendered",
    value: function elementRendered() {}
  }, {
    key: "elementUpdated",
    value: function elementUpdated() {
      console.log('updated');
    }
  }, {
    key: "elementRemoving",
    value: function elementRemoving() {} //TODO Element.appendEvent		(React: mount)
    //TODO Element.unappendEvent	(React: unmount)
    //TODO

  }, {
    key: "template",
    value: function template() {
      var el = this.dom || document.createElement(this.elementProperties.type || 'div');
      if (this.elementProperties.classes) el.classList.add(this.elementProperties.classes);
      var content = this.innerHTML;

      var childs = this._children.map(function (child, i) {
        return child.template();
      });

      el.appendChild(content);

      for (var i = 0; i < childs.length; i++) {
        el.appendChild(childs[i]);
      }

      return el;
    }
  }]);

  return Element;
}(_node.default);

exports.default = Element;