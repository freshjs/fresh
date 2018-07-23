import Fresh from './index';
/**
 * Store is a stable container for basic state management
 * @type {Object}
 */
export default class Store {
    constructor(st = {}) {
        this._store;
        
        this.reset(st);
    }
    
    get store() {
        return this._store;
    }
    
    set store(sV) {
        this._store = sV;
    }
    
    reset(sV) {
        this._store = sV;
    }
}