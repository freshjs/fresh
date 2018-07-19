import Fresh, { Element } from '../../index.js';

class App extends Element {
    constructor() {
        super({ el: { type: 'div', classes: '.app' } }, 'Hello from the App!');
        this.store = {};
    }

    template() {
        return <div className='red'>Hello, Fresh!</div>;
    }
}

Fresh.render(App, document.querySelector('#root'));