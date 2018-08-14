import Fresh from './index';
/**
 * Store is a stable container for basic state management
 * @type {Object}
 */
export default class Store {
    constructor(st = {}, settings = {}) {
        // set the store.  Verify that `st` is a object, not an array and not null or undefined, else set it to an object.
        this._store = (st && typeof st === 'object' && !Array.isArray(st)) ? st : {};
        // if a custom settings object is applied
        // isInheritable is set, then use it, else default false
        this.isInheritable = settings.isInheritable ? settings.isInheritable : false;
        
        this.reset(st);
    }

    /**
     * [get] store
     * 
     * get the value of the store
     */
    get store() {
        return this._store;
    }

    /**
     * [set] store
     * 
     * set the store
     */
    set store(sV) {
        this._store = sV;
    }

    /**
     * inheritable
     * 
     * define objects that can inherite the store as a local store
     */
    inheritable() {
    }

    /**
     * reset
     * @accepts storeState as sV
     * 
     * Resets the state, optionally with a base store to reset to
     */
    reset(sV) {
        this._store = sV;
    }

    /**
     * inheritableTemplate
     * 
     * 
     */
    inheritableTemplate() {
        return <div></div>;
    }

    /**
     * 
     * 
     */
    template(children) {
        if (this.isInheritable) return this.inheritableTemplate();
        return <div></div>;
    }
}