const Fresh = require('../../index.js');
const Element = Fresh.Element;

class App extends Element {
    constructor() {
        super({el: { type: 'h1', classes: 'app' }}, 'Hello!');
        this.store = {};
    }
}
const app = new App();


Fresh.render(app, document.querySelector('#root'));