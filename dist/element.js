'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Node2 = require('./Node.js');

var _Node3 = _interopRequireDefault(_Node2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = function (_Node) {
	_inherits(Element, _Node);

	function Element() {
		var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
		var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

		_classCallCheck(this, Element);

		var _this = _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this, settings, children));

		_this.dom = null;
		_this.elementProperties = settings.el || null;
		_this.innerHTML = content;
		_this.localStore = settings.localStore || {};
		return _this;
	}

	_createClass(Element, [{
		key: 'template',
		value: function template() {
			var el = this.dom || document.createElement(this.elementProperties.type || 'div');
			if (this.elementProperties.classes) el.classList.add(this.elementProperties.classes);
			var content = this.innerHTML;
			var childs = this.children.map(function (child, i) {
				return child.template();
			});
			el.appendChild(content);
			for (var i = 0; i < childs.length; i++) {
				el.appendChild(childs[i]);
			}
			return el;
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
		key: 'innerHTML',
		get: function get() {
			return this.content;
		},
		set: function set(d) {
			this.content = document.createTextNode(d);
		}
	}]);

	return Element;
}(_Node3.default);

exports.default = Element;