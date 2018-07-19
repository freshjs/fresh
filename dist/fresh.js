'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import Store from './store.js';


var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Freshjs
 * A fresh view on things
 *
 */

var Fresh = function () {
	function Fresh() {
		var newNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, Fresh);

		this.node = document.querySelector('#root');
		this.root = newNode;
		this.target = null;
		this.renderer = {
			mode: 'html'
			// this.store = new Store();
		};this.Element = new _element2.default();
		// this.ViewElement = ViewElement;
		this.ordered = 0;
	}

	_createClass(Fresh, [{
		key: 'render',
		value: function render(node) {
			var dom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object' && node instanceof _element2.default) {
				// node has already been instantiated and is an Fresh Element
				console.log('Instanceof Element: ', node);
				this.root = node;
			} else if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object' && node instanceof HTMLElement) {
				// node has already been instantiated and is an HTMLElement (DOM Element)
				this.node.appendChild(node);
			} else if (typeof node === 'function') {
				// node has not been instantiated.  Instantiated it!
				console.log('Function: ', node);
				node = new node();
			} else {
				return false;
			}

			console.log(node);

			// If there is a valid query selector, assign it to the DOM;
			if (dom) this.node = dom;

			var t = this.dom(node.template());

			this.node.appendChild(t);
		}
	}, {
		key: 'walk',
		value: function walk(n) {
			console.log(n);
			var list = n.children;
			for (var i = 0; i < list.length; i++) {
				console.log(list.name);
				this.walk(list[i]);
			}
		}
	}, {
		key: 'parseJson',
		value: function parseJson(j) {
			var data = typeof j === 'string' ? j : j.parse(j);
			var keys = Object.keys(j);
			for (var i = 0; i < keys.length; i++) {
				var nodeData = data[keys[i]];
			}
		}
	}, {
		key: 'createNodeFromData',
		value: function createNodeFromData(titleStr, layerStr) {}
	}, {
		key: 'dom',
		value: function dom(tag, attrs) {
			console.log('Tag: ', tag);
			console.log('Attributes: ', attrs);

			for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
				children[_key - 2] = arguments[_key];
			}

			console.log('Children: ', children);
			this.ordered++;
			var component = null;
			// console.log('Component: ' + typeof tag + '\n', tag);
			// Custom Components will be functions
			if (typeof tag === 'function') {
				component = new tag();
				return component.template();
			}

			console.log('Attributes: ', attrs);

			// regular html tags will be strings to create the elements
			if (typeof tag === 'string') {
				// console.log(tag, attrs, children);
				// fragments to append multiple children to the initial node
				var fragments = document.createDocumentFragment();
				// create the DOM element
				var element = document.createElement(tag);
				// iterrate over the children
				children.forEach(function (child) {
					// if the child is an HTML Element
					if (child instanceof HTMLElement) {
						// append the html element to the fragment container
						fragments.appendChild(child);
						// if it's a string
					} else if (typeof child === 'string') {
						// create a text Node out of the contents
						var textnode = document.createTextNode(child);
						// append the text node to the fragment container
						fragments.appendChild(textnode);
						// console.log(textnode, fragments);
					} else if (Array.isArray(child)) {
						// Array of elements
						for (var i = 0; i < child.length; i++) {
							// console.log('tag: ', child[i] instanceof HTMLElement);
							fragments.appendChild(child[i]);
						}
					} else {
						// later other things could not be HTMLElement not strings
						// console.log('not appendable', child);
					}
				});

				element.appendChild(fragments);
				// console.log("Appended to: ", element);
				// Merge element with attributes
				Object.assign(element, attrs);
				// console.log(element);
				return element;
			}

			// html element
			if ((typeof tag === 'undefined' ? 'undefined' : _typeof(tag)) === 'object' && tag instanceof HTMLElement) {
				return tag;
			}
		}
	}]);

	return Fresh;
}();

exports.default = Fresh;