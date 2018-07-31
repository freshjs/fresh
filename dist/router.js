'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.View = exports.Route = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Router is a Fresh Router module, providing simple route rendering.
 * This class acts as an instance of a router, allowing nested Routes 
 * to render on an associated View.
 */
var Router = function (_Element) {
    _inherits(Router, _Element);

    function Router(children) {
        _classCallCheck(this, Router);

        var _this = _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this));

        _this.routes = {};
        return _this;
    }

    _createClass(Router, [{
        key: 'template',
        value: function template() {
            return _index2.default.dom('div', null);
        }
    }]);

    return Router;
}(_index.Element);

/**
 * Route is a defined route that takes a single child as a component
 */


var Route = function () {
    function Route(child) {
        _classCallCheck(this, Route);
    }

    _createClass(Route, [{
        key: 'template',
        value: function template() {
            return _index2.default.dom(
                'div',
                null,
                _index2.default.dom(
                    'pre',
                    null,
                    this
                )
            );
        }
    }]);

    return Route;
}();

/**
 * View is a renderer, where the specified routes will render, if chosen
 */


var View = function View() {
    _classCallCheck(this, View);
};

// export the Router by default


exports.default = Router;
// export the Route and View

exports.Route = Route;
exports.View = View;