// import Store from './store.js';
import Element from './element';
/**
 * Freshjs
 * A fresh view on things
 *
 */

export default class Fresh {
	constructor(newNode = null, settings = {}) {
		this.node = document.querySelector('#root');
		this.root = newNode;
		this.target = null;
		this.renderer = {
			mode: 'html',
		}
		// this.store = new Store();
		this.Element = new Element();
		// this.ViewElement = ViewElement;
		this.ordered = 0;
	}

	render(node, dom = null) {
		if (typeof node === 'object' && node instanceof Element) {
		// node has already been instantiated and is an Fresh Element
			console.log('Instanceof Element: ', node);
			this.root = node;
		} else if (typeof node === 'object' && node instanceof HTMLElement) {
		// node has already been instantiated and is an HTMLElement (DOM Element)
			this.node.appendChild(node);
		} else if (typeof node === 'function') {
		// node has not been instantiated.  Instantiated it!
			console.log('Function: ', node);
			node = new node();
		} else {
			return false;
		}
		
		console.log(node);

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

	dom(tag, attrs, ...children) {
		console.log('Tag: ', tag);
		console.log('Attributes: ', attrs);
		console.log('Children: ', children);
		this.ordered++;
		let component = null;
		// console.log('Component: ' + typeof tag + '\n', tag);
		// Custom Components will be functions
		if (typeof tag === 'function') {
			component = new tag();
			return component.template();
		}

		console.log('Attributes: ', attrs);

		// regular html tags will be strings to create the elements
		if (typeof tag === 'string') {
			// console.log(tag, attrs, children);
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
