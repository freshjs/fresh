import Fresh from './fresh.js';
import Element from './element.js';
import Node from './node.js';
import Store from './store.js';

// add the map to the object prototype
Object.prototype.map = function(mapper) {
    let output;
    let keys = Object.keys(this);
    for (let i = 0; i < keys.length; i++) {
        const o = {};
        o[keys[i]] = this[keys[i]];
        const v = mapper(o, i);
        if (v) output = Object.assign(output, v);
    }
    return output;
}

// Check if there is a Fresh instance on the window object
// If not, assign it.
if (!window.Fresh) window.Fresh = new Fresh();

export default window.Fresh;
export { Element, Node, Store };