import Fresh from '../index.js';
import Header from '../dist/views/header.js';

class App extends Fresh.Element {
  constructor() {
    super({
      el: {
        type: 'div',
        classes: '.app'
      }
    }, 'Hello from the App!', [Header]);
    this.store = {};
  }

  template() {
    return Fresh.dom(Header, null);
  }

}

Fresh.render(Fresh.dom(App, null), document.querySelector('#root'));