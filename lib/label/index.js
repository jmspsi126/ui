'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./styles.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Creates a new Label.
 */
var Label = function (_React$Component) {
    _inherits(Label, _React$Component);

    function Label(props) {
        _classCallCheck(this, Label);

        return _possibleConstructorReturn(this, (Label.__proto__ || Object.getPrototypeOf(Label)).call(this, props));
    }

    _createClass(Label, [{
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'label',
                _extends({
                    className: (0, _classnames2.default)('ui-label', this.props.block ? 'ui-label__block' : false, this.props.className)
                }, _underscore2.default.omit.apply(_underscore2.default, [this.props].concat(_toConsumableArray(_underscore2.default.keys(this.constructor.defaultProps))))),
                this.props.text ? _react2.default.createElement(
                    'div',
                    { className: (0, _classnames2.default)('ui-label__text', this.props.textClassName) },
                    this.props.text,
                    '\xA0',
                    this.props.required ? _react2.default.createElement('span', { className: 'ui-label__required' }) : null,
                    this.props.errorMessage ? this.props.errorMessage : null
                ) : null,
                this.props.children
            );
        }
    }]);

    return Label;
}(_react2.default.Component);

Label.defaultProps = {
    text: false,
    errorMessage: false,
    required: false,
    block: false
};
exports.default = Label;