"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = _interopRequireDefault(require("./element"));

var _node = _interopRequireDefault(require("./node"));

var _index = require("./helpers/fresh-helpers/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Freshjs
 * A fresh view on things
 *
 */
var Fresh = /*#__PURE__*/function () {
  function Fresh() {
    _classCallCheck(this, Fresh);

    // rootNode is the root app element and the rootDom is the element on the site the rootNode will render
    // if no rootDom is placed, render will not be called.
    // Uninitialized variables with defaults to be set after inspection and parsing of constructor arguments
    // rN:	rootNode	-- root Element Node
    // rD:	rootDom		-- root DOM Element to render to
    // t:	target		-- the current targeted DOM
    // rR:	renderer	-- renderer type (default 'jsx';
    var _rootNode, _rootDom, _target, _renderer, _settings;

    var settingsArr = []; // If rootNode is an HTMLElement or a Element, then it's assigned

    for (var _len = arguments.length, attrs = new Array(_len), _key = 0; _key < _len; _key++) {
      attrs[_key] = arguments[_key];
    }

    if (attrs[0] instanceof HTMLElement || attrs[0] instanceof _element.default) {
      var _a = attrs[0];
    } else // if it's an array, then it's parsed
      if (Array.isArray(attrs[0])) {
        var r = attrs[0]; // itterate over the array and look for object sets or arrays

        for (var i = 0; i < r.length; i++) {
          // pull out the item
          var s = r[i]; // is it an array?

          if (Array.isArray(s)) {
            var _s;

            var ob = (_s = s, a = _s.a, b = _s.b, _s);
            if (ob[a] && ob[b]) s = ob;
          } else // is it an object?
            if (_typeof(s) === 'object') {}
        }

        ;
      } else // if it's an object, then it's parsed
        if (!Array.isArray(attrs[0]) && _typeof(attrs[0]) === 'object') {
          // get the keys for the settings object
          var k = Object.keys(attrs[0]); // loop over the keys

          for (var _i = 0; _i < k.length; _i++) {
            // the key
            var ky = k[_i]; // setting object

            var v = {}; // if the key is defined

            if (attrs[0][ky]) {
              // assign a key:value pair to the settings object
              v[ky] = k[ky]; // append it to the settingsArr

              settingsArr.push(v);
            }
          }
        } // else, a bunch of stuff is set to default and not rendered
        else {
          for (var _i2 = 0; _i2 < attrs.length; _i2++) {
            switch (_i2) {
              case 1:
                _rootNode = attrs[_i2];
                break;

              case 2:
                _rootDom = attrs[_i2];
                break;

              case 3:
                _renderer = attrs[_i2];
                break;
            }
          }
        }

    this.node = _rootDom;
    this.root = _rootNode;
    this.renderer = _renderer; // this.node = document.querySelector('#root');
    // this.root = newNode;
    // this.target = null;
    // this.renderer = {
    // 	mode: 'jsx',
    // }
    // // this.store = new Store();

    this.Element = new _element.default(); // // this.ViewElement = ViewElement;

    this.ordered = 0;
    this.Iterator = _index.Iterator;
    this.deepEquals = _index.deepEquals;
  }

  _createClass(Fresh, [{
    key: "store",
    get: function get() {
      if (!this.localStore) this.localStore = new Store();
      return this.localStore.store;
    },
    set: function set(sV) {
      if (!this.localStore) this.localStore = new Store();
      this.localStore.reset(sV);
    }
  }, {
    key: "inherits",
    value: function inherits(name, func) {
      if (!Fresh.prototype[name] && funct) Fresh.prototype[name] = func;
    }
  }, {
    key: "use",
    value: function use() {}
  }, {
    key: "render",
    value: function render(node) {
      var dom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      console.log("Fresh.render()");
      console.log(node);

      if (_typeof(node) === 'object' && node instanceof _element.default) {
        // node has already been instantiated and is an Fresh Element
        // console.log('Instanceof Element: ', node);
        var _t = node.template();

        node._dom.parentNode.replaceChild(_t, dom);

        node._dom = _t;
        node.elementRendered();
      } else if (_typeof(node) === 'object' && node instanceof HTMLElement) {
        // node has already been instantiated and is an HTMLElement (DOM Element)
        this.node.appendChild(node);
      } else if (typeof node === 'function') {
        // node has not been instantiated.  Instantiated it!
        // console.log('Function: ', node);
        node = new node();
      } else {
        return false;
      } // If there is a valid query selector, assign it to the DOM;


      if (dom) this.node = dom;
      var t = this.dom(node.template());
      this.node.appendChild(t);
    }
    /**
     * Removes or "unmounts" an Element from the dom.
     * @method remove
     * @param  {[type]} node [description]
     * @return {[type]}      [description]
     */

  }, {
    key: "remove",
    value: function remove(node) {}
  }, {
    key: "walk",
    value: function walk(n) {
      console.log(n);
      var list = n.children;

      for (var i = 0; i < list.length; i++) {
        console.log(list.name);
        this.walk(list[i]);
      }
    }
  }, {
    key: "parseJson",
    value: function parseJson(j) {
      var data = typeof j === 'string' ? j : j.parse(j);
      var keys = Object.keys(j);

      for (var i = 0; i < keys.length; i++) {
        var nodeData = data[keys[i]];
      }
    }
  }, {
    key: "createNodeFromData",
    value: function createNodeFromData(titleStr, layerStr) {}
  }, {
    key: "registerStyles",
    value: function registerStyles() {}
  }, {
    key: "createIterator",
    value: function createIterator(its, ac, op) {
      return new this.Iterator(its, ac, op);
    }
  }, {
    key: "callError",
    value: function callError(err) {
      var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        breaking: false,
        type: 'log'
      };
    }
    /**
     * Hooks into JSX renderer
     * @method dom
     * @param  {[type]} tag      the HTML|JSX tag, which would be a (un)instantiated class or a string for html
     * @param  {[type]} attrs    the attributes that the JSX Class or HTML string should get
     * @param  {[type]} children an array of it's children
     * @return {[type]}          returns the Class or the DOM element
     */

  }, {
    key: "dom",
    value: function dom(tag, attrs) {
      // counter for debugging purposes only
      this.ordered++; // set the component just to start.

      var component = null; // Custom Components will be functions

      for (var _len2 = arguments.length, children = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        children[_key2 - 2] = arguments[_key2];
      }

      if (typeof tag === 'function') {
        // console.log(tag, '\n\n________\n\n');
        // if no attributes were passed, make it an empty array
        // console.log('\nElement Class');
        // console.log(tag, attrs, children);
        if (!attrs) attrs = [];
        component = new tag(attrs);
        component.children = children;
        var t = component.template();
        component._dom = t; // console.log('Tracker:\n\n\n', tag, attrs, children);

        return t;
      } // regular html tags will be strings to create the elements


      if (typeof tag === 'string') {
        // console.log('Tracker:\n\n\n', tag, attrs, children);
        // console.log('\nHTML String');
        // console.log(tag, attrs, children);
        // fragments to append multiple children to the initial node
        var fragments = document.createDocumentFragment(); // create the DOM element

        var element = document.createElement(tag); // itterate over attributes

        for (var attr in attrs) {
          // console.log('Attribute Pair: ', attr, attrs[attr]);
          var _t2 = 'attr';
          var _a2 = null;
          var v = attrs[attr];

          switch (attr) {
            case 'onClick':
              _a2 = 'onclick';
              break;

            case 'classes':
            case 'classList':
              _a2 = 'class';
              v = v.replace('.', '');
              break;

            case 'onInput':
              _t2 = 'evnt';
              _a2 = 'input';
              break;

            case 'onChange':
              _a2 = 'onchange';
          }

          if (_t2 === 'attr' && _a2) element.setAttribute(_a2, v);
          if (_t2 === 'evnt' && _a2) element.addEventListener(_a2, v);
        } // iterrate over the children


        children.forEach(function (child) {
          // if the child is an HTML Element
          if (child instanceof HTMLElement) {
            // append the html element to the fragment container
            fragments.appendChild(child); // if it's a string
          } else if (typeof child === 'string') {
            // create a text Node out of the contents
            var textnode = document.createTextNode(child); // append the text node to the fragment container

            fragments.appendChild(textnode); // console.log(textnode, fragments);
          } else if (Array.isArray(child)) {
            // Array of elements
            for (var i = 0; i < child.length; i++) {
              // console.log('tag: ', child[i] instanceof HTMLElement);
              fragments.appendChild(child[i]);
            }
          } else {// later other things could not be HTMLElement not strings
            // console.log('not appendable', child);
          }
        });
        element.appendChild(fragments); // console.log("Appended to: ", element);
        // Merge element with attributes

        Object.assign(element, attrs); // console.log(element);

        return element;
      } // html element


      if (_typeof(tag) === 'object' && tag instanceof HTMLElement) {
        console.log(tag);
        return tag;
      }
    }
  }]);

  return Fresh;
}();

exports.default = Fresh;