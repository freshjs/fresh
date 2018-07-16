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
		const childs = this.children.map((child, i) => { return child.template();});
		el.appendChild(content);
		for (let i = 0; i < childs.length; i++) {
			el.appendChild(childs[i]);
		}
		return el;
	}
}

module.exports = Element;