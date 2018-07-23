// import Store from './store.js';
import Element from './element';
import Node from './node';
import { Iterator, deepEquals } from './helpers/fresh-helpers/index.js';

/**
 * Freshjs
 * A fresh view on things
 *
 */

export default class Fresh {
	constructor(...attrs) {
		// rootNode is the root app element and the rootDom is the element on the site the rootNode will render
		// if no rootDom is placed, render will not be called.

		// Uninitialized variables with defaults to be set after inspection and parsing of constructor arguments
		// rN:	rootNode	-- root Element Node
		// rD:	rootDom		-- root DOM Element to render to
		// t:	target		-- the current targeted DOM
		// rR:	renderer	-- renderer type (default 'jsx';
		let _rootNode, _rootDom, _target, _renderer, _settings;
		let settingsArr = [];
		// If rootNode is an HTMLElement or a Element, then it's assigned
		if (attrs[0] instanceof HTMLElement || attrs[0] instanceof Element) {
			let a = attrs[0];

		} else
		// if it's an array, then it's parsed
		if (Array.isArray(attrs[0])) {
			const r = attrs[0];
			// itterate over the array and look for object sets or arrays
			for (let i = 0; i < r.length; i++) {
				// pull out the item
				let s = r[i];
				// is it an array?
				if (Array.isArray(s)) {
					const ob = {a, b} = s;
					if (ob[a] && ob[b]) s = ob;
				} else
				// is it an object?
				if (typeof s === 'object') {

				}

			};

		} else
		// if it's an object, then it's parsed
		if (!Array.isArray(attrs[0]) && typeof attrs[0] === 'object') {
			// get the keys for the settings object
			const k = Object.keys(attrs[0]);
			// loop over the keys
			for (let i = 0; i < k.length; i++) {
				// the key
				const ky = k[i];
				// setting object
				const v = {};
				// if the key is defined
				if (attrs[0][ky]) {
					// assign a key:value pair to the settings object
					v[ky] = k[ky];
					// append it to the settingsArr
					settingsArr.push(v);
				}
			}
		}
		// else, a bunch of stuff is set to default and not rendered
		else {
			for (let i = 0; i < attrs.length; i++) {
				switch(i) {
					case 1:
						_rootNode = attrs[i];
						break;
					case 2:
						_rootDom = attrs[i];
						break;
					case 3:
						_renderer = attrs[i];
						break;
				}
			}
		}

		this.node = _rootDom;
		this.root = _rootNode;
		this.renderer = _renderer;

		// this.node = document.querySelector('#root');
		// this.root = newNode;
		// this.target = null;
		// this.renderer = {
		// 	mode: 'jsx',
		// }
		// // this.store = new Store();
		this.Element = new Element();
		// // this.ViewElement = ViewElement;
		this.ordered = 0;
		this.Iterator = Iterator;
		this.deepEquals = deepEquals;
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
		if (!Fresh.prototype[name] && funct) Fresh.prototype[name] = func;
	}

	render(node, dom = null) {
		console.log(`Fresh.render()`);
		if (typeof node === 'object' && node instanceof Element) {
		// node has already been instantiated and is an Fresh Element
			// console.log('Instanceof Element: ', node);
			const t = node.template();
			node._dom.parentNode.replaceChild(t, dom);
			node._dom = t;
		} else if (typeof node === 'object' && node instanceof HTMLElement) {
		// node has already been instantiated and is an HTMLElement (DOM Element)
			this.node.appendChild(node);
		} else if (typeof node === 'function') {
		// node has not been instantiated.  Instantiated it!
			// console.log('Function: ', node);
			node = new node();
		} else {
			return false;
		}

		// If there is a valid query selector, assign it to the DOM;
		if (dom) this.node = dom;

		const t = this.dom(node.template());

		this.node.appendChild(t);
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

	registerStyles() {
	}

	createIterator(its, ac, op) {
		return new this.Iterator(its, ac, op);
	};

	callError(err, attrs = {breaking: false, type: 'log'}) {

	}

	/**
	 * Hooks into JSX renderer
	 * @method dom
	 * @param  {[type]} tag      the HTML|JSX tag, which would be a (un)instantiated class or a string for html
	 * @param  {[type]} attrs    the attributes that the JSX Class or HTML string should get
	 * @param  {[type]} children an array of it's children
	 * @return {[type]}          returns the Class or the DOM element
	 */
	dom(tag, attrs, ...children) {
		// counter for debugging purposes only
		this.ordered++;
		// set the component just to start.
		let component = null;
		// Custom Components will be functions
		if (typeof tag === 'function') {
			// console.log(tag, '\n\n________\n\n');
			// if no attributes were passed, make it an empty array
			if (!attrs) attrs = [];
			component = new tag(attrs);
			component.children = children;
			const t = component.template();
			component._dom = t;
			
			// console.log('Tracker:\n\n\n', tag, attrs, children);
			
			return t;
		}

		// regular html tags will be strings to create the elements
		if (typeof tag === 'string') {
			// console.log('Tracker:\n\n\n', tag, attrs, children);
			// console.log(tag, attrs, children);
			// fragments to append multiple children to the initial node
			const fragments = document.createDocumentFragment();
			// create the DOM element
			const element = document.createElement(tag);
			// itterate over attributes
			for (let attr in attrs) {
				// console.log('Attribute Pair: ', attr, attrs[attr]);
				let a = null;
				let v = attrs[attr];
				switch(attr) {
					case 'onClick':
						a = 'onclick';
						break;
					case 'classes':
					case 'classList':
						a = 'class';
						v = v.replace('.', '');
						break;
				}
				if (a) element.setAttribute(a, v);
			}

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
					// console.log(textnode, fragments);
				} else if (Array.isArray(child)) {
					// Array of elements
					for(let i = 0; i < child.length; i++) {
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
		if (typeof tag === 'object' && tag instanceof HTMLElement) {
			return tag;
		}
  	}
}
