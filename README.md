# Fresh.js
> **Fresh.js** is a rendering framework started as an experiemental project to understand current rendering frameworks like React & Vue.

<hr>

<h1 align='center'>🚨 Status: Severe Case of Alpha 🚨</h1>
<h2 align='center'> 🚧 🚧 Read before using 🚧 🚧 </h2>
<p align='center'>
This package is currently under active development and should be considered unstable. There is heaving retooling, restructuring, reconfiguring, reflowing, hard-hat zone, construction 500ft ahead, men working overhead, watch your head.
</p>

<p align='center'>
That said, there is a Github repository that you can always submit issues to.
👍
</p>

<hr>

## freshjs-core
This is the core framework for **Fresh.js**. This is all you need to work with **Fresh.js**.

## Installing
### Dependencies
```
npm install -s babel-cli@6.26.0 babel-core@6.26.3 babel-plugin-syntax-jsx@6.18.0 babel-plugin-transform-react-jsx@6.24.1 babel-preset-react@^6.24.1 
```
### Fresh.js Core
```
npm install -s freshjs-core
```
### Configure Babel
```
$ touch .babelrc
$ echo "{\"presets\": [\"react\"],\"plugins\": [\"babel-plugin-syntax-jsx\",[\"babel-plugin-transform-react-jsx\",{ \"pragma\": \"Fresh.dom\" }]]}" > . .babelrc
```

## Usage
```
// ES6
import Fresh from 'freshjs-core';

class App extends Fresh.Element {
    constructor() {
        super();
    }
    
    template() {
        return <div>It's Fresh</div>
    }
}

Fresh.render(App, document.querySelector('#app'));
```

### Running _( with Parcel )_
```
$ parcel public/index.html --out-dir dist
Server running at http://localhost:1234
✨  Built in 643ms.
```

## Recommendations
**Fresh.js** was developed and tested using the [Parcel](https://parceljs.org/ "Parcel JS Homepage"). While it is absolutely possible to use **Webpack**, I currently do not have instructions ready for such an actively-developed and growing framework, but it's on the list.