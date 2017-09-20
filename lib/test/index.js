'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = init;

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init(Class) {
    // create a new div element 
    // and give it some content 
    var rootDiv = document.createElement("div");
    rootDiv.setAttribute('id', 'root');
    document.body.appendChild(rootDiv); //add the text node to the newly created div. 

    _reactDom2.default.render(_react2.default.createElement(Class, null), document.getElementById('root'));
}