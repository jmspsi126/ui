'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('underscore');
var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');

var ModelDisplay = function (_React$Component) {
    _inherits(ModelDisplay, _React$Component);

    function ModelDisplay() {
        _classCallCheck(this, ModelDisplay);

        return _possibleConstructorReturn(this, (ModelDisplay.__proto__ || Object.getPrototypeOf(ModelDisplay)).call(this));
    }

    _createClass(ModelDisplay, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.model) {
                this.props.model.on('change', function () {
                    this.forceUpdate();
                }, this);
            }

            if (this.props.collection) {
                this.props.collection.on('add remove reset sort', function () {
                    this.forceUpdate();
                }, this);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var json = null;
            if (this.props.model) {
                json = React.createElement(
                    'pre',
                    null,
                    JSON.stringify(this.props.model.toJSON(), null, 4)
                );
            }

            var errors = null;
            if (this.props.model) {
                errors = React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h3',
                        null,
                        'Errors'
                    ),
                    React.createElement(
                        'pre',
                        null,
                        JSON.stringify(this.props.model.errors, null, 4)
                    )
                );
            }

            return React.createElement(
                'div',
                null,
                json,
                errors
            );
        }
    }]);

    return ModelDisplay;
}(React.Component);

module.exports = ModelDisplay;