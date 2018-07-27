'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Element is a base extendable class that Elements on the page extend to.
 * It takes in `sets`, which are akin to react's props.
 * @type {String}
 */
var Element = function (_Node) {
	_inherits(Element, _Node);

	function Element(sets) {
		var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
		var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

		_classCallCheck(this, Element);

		// This is the HTMLElement reference; null means it is not set
		var _this = _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this, sets, children));
		// Call the Node constructor
		// TODO node should take children, parent


		_this._dom = null;
		// TODO Element - What should be stored or should it be stored? defaulting to sets for now
		_this.elementProperties = sets;
		// TODO Element - this might not need to exist
		_this.innerHTML = content;
		// localStore is the local state of this element
		// set to null until the first time someone uses it, 
		// or unless there is a setting triggered to always use it initially
		// this.localStore = new Store();
		_this.localStore = null;
		// set the Sets property
		_this._sets = sets || [];
		// set the previous sets property
		_this._prevSets = [];

		// this.c = children;
		return _this;
	}

	_createClass(Element, [{
		key: 'inherits',
		value: function inherits(name, func) {
			if (!Element.prototype[name] && funct) Element.prototype[name] = func;
		}
	}, {
		key: 'updateStore',
		value: function updateStore(newSt) {
			var same = _index2.default.deepEquals(this._revSets, this._sets);
			this.store = Object.assign(this.store, newSt);
			if (!same) _index2.default.render(this, this._dom);
		}
	}, {
		key: 'elementRendering',
		value: function elementRendering() {}
	}, {
		key: 'elementRendered',
		value: function elementRendered() {}
	}, {
		key: 'elementUpdated',
		value: function elementUpdated() {
			console.log('updated');
		}
	}, {
		key: 'elementRemoving',
		value: function elementRemoving() {}

		//TODO Element.appendEvent		(React: mount)
		//TODO Element.unappendEvent	(React: unmount)
		//TODO

	}, {
		key: 'template',
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
	}, {
		key: 'sets',
		get: function get() {
			return this._sets;
		},
		set: function set(sTS) {
			this._revSets = this._sets;
			this._sets = sTS;
			if (!_index2.default.deepEquals(this._revSets, this._sets)) {
				_index2.default.render(this, this._dom);
				this.elementUpdated();
			}
		}
	}, {
		key: 'element',
		get: function get() {
			return this.dom || null;
		},
		set: function set(e) {
			this.dom = e;
		}
	}, {
		key: 'type',
		get: function get() {
			return this.elementProperties.type || null;
		},
		set: function set(t) {
			this.elementProperties.type = t;
		}
	}, {
		key: 'attrs',
		get: function get() {
			return this._sets;
		},
		set: function set(atr) {
			this._sets = atr;
		}
	}, {
		key: 'innerHTML',
		get: function get() {
			return this.content;
		},
		set: function set(d) {
			this.content = document.createTextNode(d);
		}
	}, {
		key: 'store',
		get: function get() {
			if (!this.localStore) this.localStore = new _store2.default();
			return this.localStore.store;
		},
		set: function set(sV) {
			if (!this.localStore) this.localStore = new _store2.default();
			this.localStore.reset(sV);
		}
	}]);

	return Element;
}(_node2.default);

exports.default = Element;