import Node from './node';
import Store from './store';
import { deepEquals } from './helpers/fresh-helpers/index.js'

/**
 * Element is a base extendable class that Elements on the page extend to.
 * It takes in `sets`, which are akin to react's props.
 * @type {String}
 */
export default class Element extends Node {
	constructor(sets, content = '', children = []) {
		// Call the Node constructor
		// TODO node should take children, parent
		super(sets, children);
		// This is the HTMLElement reference; null means it is not set
		this._dom = null;
		// TODO Element - What should be stored or should it be stored? defaulting to sets for now
		this.elementProperties = sets;
		// TODO Element - this might not need to exist
		this.innerHTML = content;
		// localStore is the local state of this element
		// set to null until the first time someone uses it, 
		// or unless there is a setting triggered to always use it initially
		// this.localStore = new Store();
		this.localStore = null;
		// set the Sets property
		this._sets = sets || [];
		// set the previous sets property
		this._prevSets = [];

		// this.c = children;
	}
	
	get sets() {
		return this._sets;
	}
	
	set sets(sTS) {
		this._revSets = this._sets;
		this._sets = sTS;
		if (!deepEquals(this._revSets, this._sets)) Fresh.render(this, this._dom);
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
		return this._sets;
	}

	set attrs(atr) {
		this._sets = atr;
	}

	get innerHTML() {
		return this.content;
	}

	set innerHTML(d) {
		this.content = document.createTextNode(d);
	}

	get store() {
		if (!this.localStore) this.localStore = new Store();
		return this.localStore.store;
	}

	set store(sV) {
		if (!this.localStore) this.localStore = new Store();
		this.localStore.reset(sV);
	}

	inherits(name, func) {
		if (!Element.prototype[name] && funct) Element.prototype[name] = func;
	}
	
	updateStore(newSt) {
		let same = deepEquals(this._revSets, this._sets);
		this.store = Object.assign(this.store, newSt);
		if (!same) Fresh.render(this, this._dom);
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
