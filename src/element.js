import Node from './Node.js';

export default class Element extends Node {
	constructor(sets, content = '', children = []) {
		super(sets, children);
		this.dom = null;
		this.elementProperties = (sets) ? sets.el : null;
		this.innerHTML = content;
		this.localStore = (sets) ? sets.localStore : {};
		// TODO this is the props attributes stuff?
		this._a = [];

		// this.c = children;
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

	get attrs() {
		return this._a;
	}

	set attrs(atr) {
		this._a = atr;
	}

	get innerHTML() {
		return this.content;
	}

	set innerHTML(d) {
		this.content = document.createTextNode(d);
	}

	inherits(name, func) {
		if (!Element.prototype[name] && funct) Element.prototype[name] = func;
	}

	//TODO Element.appendEvent		(React: mount)
	//TODO Element.unappendEvent	(React: unmount)
	//TODO

	template() {
		const el = this.dom || document.createElement(this.elementProperties.type || 'div');
		if (this.elementProperties.classes) el.classList.add(this.elementProperties.classes);
		const content = this.innerHTML;
		const childs = this._children.map((child, i) => {
			return child.template();
		});
		el.appendChild(content);
		for (let i = 0; i < childs.length; i++) {
			el.appendChild(childs[i]);
		}
		return el;
	}
}
