import Fresh from './fresh.js';
import Element from './element.js';
import Node from './node.js';

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

// // New fresh
const f = new Fresh();
const b = new Element();
// 
// export default f;
// export Element;

export default f;
export { Element, Node };