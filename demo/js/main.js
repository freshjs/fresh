const { Fresh, Element } = require('../../index.js');

const fresh = new Fresh(null, );

class App extends Element {
    constructor() {
        super({el: { type: 'h1', classes: '.app' }}, 'Hello!');
        this.store = {};
    }
    
    // template() {
    //     // emmet-style
    //     // return `div>`;
    //     // html-style
    //     // web components
    //     // 
    // }
}
const app = new App();

console.log(typeof App);
console.log(typeof app);

fresh.render(app, document.querySelector('#root'));