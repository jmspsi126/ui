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

require('./button.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_React$Component) {
    _inherits(Button, _React$Component);

    _createClass(Button, null, [{
        key: 'defaultProps',
        get: function get() {
            return {
                type: "button",
                disabled: false,
                style: {},
                isLoading: false,
                className: ""
            };
        }
    }]);

    function Button(props) {
        _classCallCheck(this, Button);

        var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

        _this.container = 'button';
        return _this;
    }

    _createClass(Button, [{
        key: 'render',
        value: function render() {

            if (this.props.href) {
                this.container = "a";
            }

            var isDisabled = this.props.disabled;

            var label = this.props.label;
            if (this.props.isLoading == true) {
                isDisabled = true;
                label = _react2.default.createElement(
                    'span',
                    { style: { position: 'relative' } },
                    _react2.default.createElement(
                        'span',
                        { style: { visibility: 'hidden' } },
                        label
                    ),
                    _react2.default.createElement('div', { className: 'loading-icon' })
                );
            }

            var content = null;
            if (this.props.children) {
                content = _react2.default.createElement(
                    'span',
                    { className: 'label' },
                    this.props.children
                );
            } else {
                content = _react2.default.createElement(
                    'span',
                    { className: 'label' },
                    label
                );
            }

            var inlineStyle = {};
            if (this.props.visible == false) {
                inlineStyle.display = 'none';
            }
            _underscore2.default.extend(inlineStyle, this.props.style);

            return _react2.default.createElement(
                this.container,
                _extends({}, _underscore2.default.pick(this.props, 'download', 'title', 'alt'), {
                    type: this.props.href ? undefined : this.props.type,
                    href: isDisabled ? undefined : this.props.href,
                    onClick: isDisabled ? undefined : this.props.onClick,
                    style: inlineStyle,
                    className: (0, _classnames2.default)('ui__button', isDisabled ? 'disabled' : false, this.props.collapseMargin ? 'collapseMargin' : false, this.props.primary ? 'primary' : false, this.props.block ? 'block' : false, this.props.chromeless ? 'chromeless' : false, this.props.outline ? 'outline' : false, this.props.className),
                    disabled: isDisabled === true ? 'disabled' : false
                }),
                content
            );
        }
    }]);

    return Button;
}(_react2.default.Component);

exports.default = Button;