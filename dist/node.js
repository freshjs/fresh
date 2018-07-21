'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
		key: 'inherits',
		value: function inherits(name, func) {
			if (!Node.prototype[name] && funct) Node.prototype[name] = func;
		}
	}, {
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
		key: 'children',
		get: function get() {
			return this._children;
		},
		set: function set(ch) {
			this._children = ch;
			// this.render();
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
	}]);

	return Node;
}();

exports.default = Node;