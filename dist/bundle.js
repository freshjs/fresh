(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
class Node {
    constructor(s = {}, children) {
		this._content = s.content || null;
		this._parent = s.parent || null;
		this._children = children || [];
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
const Node = require('./Node.js');

class Element extends Node {
	constructor(settings, content = '', children = []) {
		super(settings, children);
		this.dom = null;
		this.elementProperties = { ...settings.el };
		this.innerHTML = content;
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
		const el = this.dom || document.createElement('div');
		if (this.elementProperties.classes) el.classList.add(this.elementProperties.classes);
		const content = this.innerHTML;
		const childs = this.children.map((child, i) => { return child.template();});
		el.appendChild(content);
		for (let i = 0; i < childs.length; i++) {
			el.appendChild(childs[i]);
		}
		return el;
	}
}

module.exports = Element;
},{"./Node.js":1}],3:[function(require,module,exports){
const Element = require('./element.js');

// A Fresh View
class Fresh {
	constructor(newNode = null) {
		this.node = document.querySelector('.node-view');
		this.root = newNode;
		this.target = null;
		
		// this.manual();
		
		// this.walk(this.root);
	}
	
	render(node, dom = null) {
		dom.appendChild(node.template())
	}
	
	manual() {
		const glxy = new Node('Milky Way', 'title');
		this.root = glxy;
		const ss = new Node('Sol -- A solar system', 'solar system');
		glxy.appendChild(ss);
		const plnt = new Node('Earth -- A planet', 'Planetary Object');
		ss.appendChild(plnt);
		const plnt1 = new Node('Mars -- A much better planet', 'Planetary Object');
		const plnt2 = new Node('Pluto -- A planet in my heart', 'Planetary Object');
		ss.appendChild(plnt1);
		ss.appendChild(plnt2);
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
}

module.exports = Fresh;
},{"./element.js":2}],4:[function(require,module,exports){
const Element = require('./element.js');
const Fresh = require('./fresh.js')

module.exports = {
  Fresh,
  Element,
}

},{"./element.js":2,"./fresh.js":3}]},{},[4]);
