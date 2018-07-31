import Fresh, { Element } from './index';

/**
 * Router is a Fresh Router module, providing simple route rendering.
 * This class acts as an instance of a router, allowing nested Routes 
 * to render on an associated View.
 */
class Router extends Element {
    constructor(children) {
        super();
        this.routes = {};
    }
    
    template() {
        return <div></div>;
    }
}

/**
 * Route is a defined route that takes a single child as a component
 */
class Route {
    constructor(child) {
        
    }
    
    template()  {
        return <div><pre>{this}</pre></div>;
    }
}

/**
 * View is a renderer, where the specified routes will render, if chosen
 */
class View {
    constructor() {
    }
}

// export the Router by default
export default Router;
// export the Route and View
export { Route, View };