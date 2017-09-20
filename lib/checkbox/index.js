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
 * Creates a new Checbox component.
 * @class Checbox  
 * @extends Component
 * @param {object} props
 * @param {string} props.label The label
 * @param {string} props.dirty Whether or not the component is has been interacted with
 */
var Checkbox = function (_React$Component) {
    _inherits(Checkbox, _React$Component);

    function Checkbox(props) {
        _classCallCheck(this, Checkbox);

        var _this = _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, props));

        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(Checkbox, [{
        key: 'handleChange',
        value: function handleChange(event) {
            if (this.props.onChange) {
                this.props.onChange(event.target.checked, event);
            }
        }

        /**
         * render
         * @return {ReactElement} markup
         */

    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('ui-checkbox', this.props.block ? 'ui-checkbox-block' : '', this.props.className) },
                _react2.default.createElement(
                    'label',
                    { className: 'ui-checkbox__label-wrap' },
                    _react2.default.createElement('input', _extends({}, _underscore2.default.omit.apply(_underscore2.default, [this.props, 'children', 'dangerouslySetInnerHTML'].concat(_toConsumableArray(_underscore2.default.keys(this.constructor.defaultProps)))), {
                        className: 'ui-checkbox__input',
                        type: 'checkbox',
                        checked: this.props.checked,
                        onChange: this.handleChange
                    })),
                    _react2.default.createElement(
                        'div',
                        { className: 'ui-checkbox__inside' },
                        _react2.default.createElement(
                            'div',
                            { className: 'ui-checkbox__icon-container' },
                            _react2.default.createElement(
                                'div',
                                { className: 'ui-checkbox__icon' },
                                _react2.default.createElement('span', null)
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'ui-checkbox__label' },
                            this.props.label,
                            this.props.children
                        )
                    )
                )
            );
        }
    }]);

    return Checkbox;
}(_react2.default.Component);

Checkbox.defaultProps = {
    checked: false,
    block: false,
    dirty: false,
    error: false,
    label: ""
};
exports.default = Checkbox;