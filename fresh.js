import Element from './element.js';
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
		this.node = document.querySelector('#root');
		this.root = newNode;
		this.target = null;
		this.renderer = {
			mode: 'html',
		}
		this.store = null;
		this.Element = Element;
		this.ordered = 0;
	}
	
	render(node, dom = null) {
		if (typeof node === 'object' && node instanceof Element) {
			// console.log('Instanceof Element: ', node);
			this.root = node;
		} else if (typeof node === 'object' && node instanceof HTMLElement) {
			// console.log(node);
			this.node.appendChild(node);
		} else if (typeof node === 'function') {
			// console.log('Function: ', node);
			this.root = new node();
		} else {
			console.log('Dont Panic!', typeof node, node);
			return false;
		}
		
		if (dom) this.node = dom;
		// console.log(dom);
		// console.log('Template: ', this.dom(node.template()));
		// this.node.appendChild(this.root.template());
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
		this.ordered++;
		let component = null;
		// console.log('Component: ' + typeof tag + '\n', tag);
		// Custom Components will be functions
		if (typeof tag === 'function') {
			component = new tag();
			return component.template();
		}
		
		
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
  	}
}


export default Fresh;