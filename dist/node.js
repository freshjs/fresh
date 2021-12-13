"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Node = /*#__PURE__*/function () {
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
    key: "children",
    get: function get() {
      return this._children;
    },
    set: function set(ch) {
      this._children = ch; // this.render();
    }
  }, {
    key: "content",
    get: function get() {
      return this._content;
    },
    set: function set(c) {
      if (typeof c != 'string') c.toString();
      this._content = c;
    }
  }, {
    key: "parent",
    get: function get() {
      return this._parent;
    },
    set: function set(p) {
      // is this a node?
      // is this node me?
      // is it null?
      this._parent = p;
    }
  }, {
    key: "inherits",
    value: function inherits(name, func) {
      if (!Node.prototype[name] && funct) Node.prototype[name] = func;
    }
  }, {
    key: "appendChild",
    value: function appendChild(child) {
      if (child) this._children.push(child);
      child.parent = this;
    }
  }, {
    key: "removeChild",
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
    key: "findChild",
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
    key: "template",
    value: function template() {
      return document.createTextNode(this.content);
    }
  }]);

  return Node;
}();

exports.default = Node;