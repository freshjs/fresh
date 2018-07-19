/**
 * Iterator --
 * 
 * Iterator is a type of data container. It can take in a variety of data once or at different times,
 * sort it and operate on it with pre-defined actions and operators.  Operator plugins can be added to 
 * the Iterator for other features.
 * The data can then be pumped out with a variety of options or searched through.
 * @type {[type]}
 */
export default class {
    constructor(things, action = none, op = null) {
        let a = things;
        if (action === 'split-string' && typeof op === 'string') a = things.split(op);
        this._children = a;
    }

    get values() {
        return this._children;
    }

    set values(v) {
        this._children = v;
        return this;
    }

    iterate(func = null) {
        const iter = (func) ? func : t => t;
        for (let i = 0; i < this._children.length; i++) {
            this_children[i] = iter(this._children[i]);
        }
        return this;
    }
}