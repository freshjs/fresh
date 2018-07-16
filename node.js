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