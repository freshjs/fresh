// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"iz0v":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = function Store() {
    _classCallCheck(this, Store);
};

exports.default = Store;
},{}],"OygZ":[function(require,module,exports) {
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
	function Node() {
		var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

		_classCallCheck(this, Node);

		this._content = s.content || null;
		this._parent = s.parent || null;
		this._children = children.map(function (child) {
			return new child();
		});
	}

	_createClass(Node, [{
		key: 'appendChild',
		value: function appendChild(child) {
			if (child) this._children.push(child);
			child.parent = this;
		}
	}, {
		key: 'removeChild',
		value: function removeChild(child) {
			if (!child) return false;
			for (var i = 0; i < this.children.length; i++) {
				if (child === this.children[i]) {
					var removed = this.children.splice(i, 1);
					removed.parent = null;
					return removed;
				}
			}
			return false;
		}
	}, {
		key: 'findChild',
		value: function findChild(child) {
			if (!child) return false;
			for (var i = 0; i < this.children.length; i++) {
				if (child === this.children[i]) {
					var found = this.children[i];
					return found;
				}
			}
			return false;
		}
	}, {
		key: 'template',
		value: function template() {
			return document.createTextNode(this.content);
		}
	}, {
		key: 'content',
		set: function set(c) {
			if (typeof c != 'string') c.toString();
			this._content = c;
		},
		get: function get() {
			return this._content;
		}
	}, {
		key: 'parent',
		set: function set(p) {
			// is this a node?
			// is this node me?
			// is it null?
			this._parent = p;
		},
		get: function get() {
			return this._parent;
		}
	}, {
		key: 'children',
		get: function get() {
			return this._children;
		}
	}]);

	return Node;
}();

module.exports = Node;
},{}],"y+FR":[function(require,module,exports) {
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

	function Element(settings) {
		var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
		var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

		_classCallCheck(this, Element);

		var _this = _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this, settings, children));

		_this.dom = null;
		_this.elementProperties = settings.el;
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
},{"./Node.js":"OygZ"}],"qeGK":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _store = require('./store.js');

var _store2 = _interopRequireDefault(_store);

var _element = require('./element.js');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Freshjs
 * A fresh view on things
 * 
 */

/**
 * Fresh main manager
 * :newNode: is the root of the app
 * :settings: is a javascript object with different settings
 * - {
 * 		store: {								## this tells Fresh to use a store
 * 			useState: /boolean/					## Should the store use the 'state' naming convention
 * 			default: {}							## the default structure of the store
 * 		},
 * 		renderer: {								## this tells Fresh to use a renderer
 * 			types: []							## why type(s) should be used? You can have multiple
 * 		}
 * - }
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
		};
		this.store = new _store2.default();
		this.Element = _element2.default;
		this.ordered = 0;
	}

	_createClass(Fresh, [{
		key: 'render',
		value: function render(node) {
			var dom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object' && node instanceof _element2.default) {
				// console.log('Instanceof Element: ', node);
				this.root = node;
			} else if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object' && node instanceof HTMLElement) {
				// console.log(node);
				this.node.appendChild(node);
			} else if (typeof node === 'function') {
				// console.log('Function: ', node);
				this.root = new node();
			} else {
				console.log('Dont Panic!', typeof node === 'undefined' ? 'undefined' : _typeof(node), node);
				return false;
			}

			if (dom) this.node = dom;
			// console.log('Template: ', this.dom(node.template()));
			// this.node.appendChild(this.root.template());
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
			this.ordered++;
			var component = null;
			// console.log('Component: ' + typeof tag + '\n', tag);
			// Custom Components will be functions
			if (typeof tag === 'function') {
				component = new tag();
				return component.template();
			}

			// regular html tags will be strings to create the elements
			if (typeof tag === 'string') {
				// console.log(tag, attrs, children);
				// fragments to append multiple children to the initial node
				var fragments = document.createDocumentFragment();
				// create the DOM element
				var element = document.createElement(tag);
				// iterrate over the children

				for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
					children[_key - 2] = arguments[_key];
				}

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
		}
	}]);

	return Fresh;
}();

exports.default = Fresh;
},{"./store.js":"iz0v","./element.js":"y+FR"}],"Focm":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Element = undefined;

var _fresh = require('./fresh.js');

var _fresh2 = _interopRequireDefault(_fresh);

var _Element = require('./Element.js');

var _Element2 = _interopRequireDefault(_Element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var f = new _fresh2.default();

exports.default = f;
exports.Element = _Element2.default;
},{"./fresh.js":"qeGK","./Element.js":"y+FR"}]},{},["Focm"], null)
//# sourceMappingURL=/fresh.map