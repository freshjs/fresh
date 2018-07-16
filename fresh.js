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
	}
	
	render(node, dom = null) {
		let n = null;
		if (typeof node === 'object' && node instanceof Element) {
			n = node; 
		} else if (typeof node === 'function') {
			n = new node();
		} else {
			return false;
		}
		dom.appendChild(node.template())
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