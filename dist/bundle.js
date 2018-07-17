(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class Node {
    constructor(s = {}, children = []) {
		this._content = s.content || null;
		this._parent = s.parent || null;
		this._children = children.map((child) => {
            return new child();
        });
	}
	
	set content(c) {
		if (typeof c != 'string') c.toString();
		this._content = c;
	}
	
	get content() {
		return this._content;
	}
	
	set parent(p) {
		// is this a node?
		// is this node me?
		// is it null?
		this._parent = p;
	}
	
	get parent() {
		return this._parent;
	}
	
	get children() {
		return this._children;
	}

	appendChild(child) {
		if (child) this._children.push(child);
		child.parent = this;
	}
	
	removeChild(child) {
		if (!child) return false;
		for (let i = 0; i < this.children.length; i++) {
			if (child === this.children[i]) {
				const removed = this.children.splice(i, 1);
				removed.parent = null;
				return removed;
			}
		}
		return false;
	}
	
	findChild(child) {
		if (!child) return false;
		for (let i = 0; i < this.children.length; i++) {
			if (child === this.children[i]) {
				const found = this.children[i];
				return found;
			}
		}
		return false;
	}
	
	template() {
		return document.createTextNode(this.content);
	}
}

module.exports = Node;
},{}],2:[function(require,module,exports){
const Fresh = require('../../index.js');
const Element = Fresh.Element;

class Header extends Fresh.Element {
    constructor() {
        super({el: { type: 'header', classes: 'app-header' }}, '');
        this.store = {};
    }
    
    template() {
        const e = document.createElement('header');
        e.classList.add('app-header');
        const h1 = document.createElement('h1');
        const t = document.createTextNode('Hello, World! -- From Header');
        h1.appendChild(t);
        e.appendChild(h1);
        return e;
    }
}


module.exports = Header;
},{"../../index.js":5}],3:[function(require,module,exports){
const Node = require('./Node.js');

class Element extends Node {
	constructor(settings, content = '', children = []) {
		super(settings, children);
		this.dom = null;
		this.elementProperties = { ...settings.el };
		this.innerHTML = content;
		this.localStore = settings.localStore || {};
	}
	
	get element() {
		return this.dom || null;
	}
	
	set element(e) {
		this.dom = e;
	}
	
	get type() {
		return this.elementProperties.type || null;
	}
	
	set type(t) {
		this.elementProperties.type = t;
	}
	
	get innerHTML() {
		return this.content;
	}
	
	set innerHTML(d) {
		this.content = document.createTextNode(d);
	}
	
	template() {
		const el = this.dom || document.createElement(this.elementProperties.type || 'div');
		if (this.elementProperties.classes) el.classList.add(this.elementProperties.classes);
		const content = this.innerHTML;
		const childs = this.children.map((child, i) => { 
			return child.template();
		});
		el.appendChild(content);
		for (let i = 0; i < childs.length; i++) {
			el.appendChild(childs[i]);
		}
		return el;
	}
}

module.exports = Element;
},{"./Node.js":1}],4:[function(require,module,exports){
const Element = require('./element.js');

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
class Fresh {
	constructor(newNode = null, settings = {}) {
		this.node = document.querySelector('.node-view');
		this.root = newNode;
		this.target = null;
		this.renderer = {
			mode: 'html',
		}
		this.store = null;
		this.Element = Element;
	}
	
	render(node, dom = null) {
		if (typeof node === 'object' && node instanceof Element) {
			console.log('object Element', node);
			this.root = node; 
		} else if (typeof node === 'function') {
			console.log('function', node);
			this.root = new node();
		} else {
			console.log('Dont Panic!');
			return false;
		}
		
		if (dom) this.node = dom;
		console.log(dom);
		console.log('Template: ', this.dom(node.template()));
		this.node.appendChild(this.root.template());
	}
	
	walk(n) {
		console.log(n);
		let list = n.children;
		for (let i = 0; i < list.length; i++) {
			console.log(list.name);
			this.walk(list[i]);
		}
	}
	
	parseJson(j) {
		const data = (typeof j === 'string') ? j : j.parse(j);
		let keys = Object.keys(j);
		for (let i = 0; i < keys.length; i++) {
			const nodeData = data[keys[i]];
		}
	}
	
	createNodeFromData(titleStr, layerStr) {
		
	}
	
	dom(tag, attrs, ...children) {
		// Custom Components will be functions
		if (typeof tag === 'function') {
			return new tag();
		}
		// regular html tags will be strings to create the elements
		if (typeof tag === 'string') {
			// fragments to append multiple children to the initial node
			const fragments = document.createDocumentFragment();
			// create the DOM element
			const element = document.createElement(tag);
			// iterrate over the children
			children.forEach(child => {
				// if the child is an HTML Element
				if (child instanceof HTMLElement) {
					// append the html element to the fragment container
					fragments.appendChild(child)
				// if it's a string
				} else if (typeof child === 'string') {
					// create a text Node out of the contents
					const textnode = document.createTextNode(child)
					// append the text node to the fragment container
					fragments.appendChild(textnode)
				} else {
					// later other things could not be HTMLElement not strings
					console.log('not appendable', child);
				}
			});
			
			element.appendChild(fragments);
    		// Merge element with attributes
    		Object.assign(element, attrs);
			console.log(element);
    		return element;
		}
  	}
}


module.exports =  Fresh;
},{"./element.js":3}],5:[function(require,module,exports){
const Fresh = require('./fresh.js')

const f = new Fresh();

module.exports = f;

},{"./fresh.js":4}],6:[function(require,module,exports){
const Fresh = require('../index.js');

const Header = require('../dist/views/header.js');

class App extends Fresh.Element {
  constructor() {
    super({
      el: {
        type: 'div',
        classes: '.app'
      }
    }, 'Hello from the App!', [Header]);
    this.store = {};
  }

  template() {
    return Fresh.dom(Header, null, "Hello");
  }

}

Fresh.render(Fresh.dom(App, null), document.querySelector('#root'));
},{"../dist/views/header.js":2,"../index.js":5}]},{},[6]);
