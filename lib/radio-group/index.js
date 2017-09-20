'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _label = require('../label');

var _label2 = _interopRequireDefault(_label);

require('../styles.less');

require('./radio-group.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {};
var commonStyles = {};

/**
 * Creates a new RadioGroup.
 * @class RadioGroup  
 * @extends Component
 * @param {object} props
 * @param {string} props.label The label
 * @param {string} props.placeholder The placholder
 */

var RadioGroup = function (_React$Component) {
    _inherits(RadioGroup, _React$Component);

    function RadioGroup(props) {
        _classCallCheck(this, RadioGroup);

        var _this = _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call(this, props));

        _this.state = {
            focused: false,
            dirty: _underscore2.default.isUndefined(_this.props.dirty) ? false : _this.props.dirty
        };
        return _this;
    }

    _createClass(RadioGroup, [{
        key: 'handleChange',
        value: function handleChange(event) {
            this.setState({ dirty: true });
            if (this.props.onChange) {
                this.props.onChange(event.target.value, this);
            }
            if (this.context.onChange) {
                this.context.onChange(event.target.value, this);
            }
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(event) {
            this.setState({ dirty: true, focused: false });
            if (this.props.onBlur) {
                this.props.onBlur(event);
            }
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(event) {
            this.setState({ focused: true });
            if (this.props.onFocus) {
                this.props.onFocus(event);
            }
        }
    }, {
        key: 'handleKeyPress',


        /**
         * [handleKeyPress description]
         * @param  {[type]} event [description]
         * @return {[type]}       [description]
         */
        value: function handleKeyPress(event) {
            this.setState({ dirty: true });
            if (this.props.onAction && event.key === 'Enter') {
                this.props.onAction(event.target.value, event, this);
            }
            if (this.props.onKeyPress) {
                return this.props.onKeyPress(event.target.value, event, this);
            }
            if (this.context.onChange) {
                return this.context.onChange(event.target.value, event, this);
            }
        }
    }, {
        key: 'handleRadioChange',
        value: function handleRadioChange(event) {
            console.log(event.currentTarget.value);
            this.setState({ dirty: true });
        }
    }, {
        key: 'render',


        /**
         * render
         * @return {ReactElement} markup
         */
        value: function render() {
            var _this2 = this;

            var props = _underscore2.default.omit(this.props, 'className', 'style', 'required', 'password', 'label');
            props.ref = function (node) {
                _this2.field = node;
            };
            props.className = (0, _classnames2.default)('field', this.props.selectClassName);
            props.placeholder = this.props.placeholder;
            props.type = this.props.type;
            props.value = this.props.value || '';
            props.defaultValue = this.props.defaultValue;
            props.onChange = this.handleChange.bind(this);
            props.onBlur = this.handleBlur.bind(this);
            props.onFocus = this.handleFocus.bind(this);

            var select = _react2.default.createElement('select', props);

            var error = false;
            var errorMessage = null;
            if (this.props.error && (this.props.dirty || this.state.dirty)) {
                error = true;
                if (this.props.error) {
                    errorMessage = _react2.default.createElement(
                        'div',
                        { className: 'ui__errorMessage' },
                        this.props.error
                    );
                }
            }

            var isDisabled = this.props.disabled;

            var label = null;
            if (typeof this.props.label != 'undefined') {
                label = _react2.default.createElement(
                    'div',
                    { className: 'label' },
                    this.props.label
                );
            }

            var inlineStyle = {};
            if (this.props.visible == false) {
                inlineStyle.display = 'none';
            }

            var currentOption = _underscore2.default.findWhere(this.props.options, { value: this.props.value });

            return _react2.default.createElement(
                'div',
                {
                    id: this.props.id,
                    style: inlineStyle,
                    className: (0, _classnames2.default)('ui-radio-group', isDisabled ? 'disabled' : false, error ? 'error' : false, this.props.block ? 'block' : false, this.props.required == true ? 'required' : false, this.state.focused == true ? 'focused' : false, this.props.className) },
                _react2.default.createElement(
                    'fieldset',
                    { className: 'fieldset' },
                    _react2.default.createElement(
                        'legend',
                        { className: 'legend' },
                        _react2.default.createElement(_label2.default, { text: this.props.label }),
                        errorMessage
                    ),
                    _react2.default.createElement(
                        'ul',
                        { className: 'group' },
                        _underscore2.default.map(this.props.options, function (optionObj) {
                            return _react2.default.createElement(
                                'li',
                                { key: optionObj.value },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    _react2.default.createElement('input', {
                                        disabled: _this2.props.disabled,
                                        className: 'radio',
                                        checked: _this2.props.value.toString() === optionObj.value.toString(),
                                        value: optionObj.value,
                                        type: "radio",
                                        onChange: _this2.handleChange.bind(_this2),
                                        onFocus: _this2.handleFocus.bind(_this2),
                                        onBlur: _this2.handleBlur.bind(_this2)
                                    }),
                                    _react2.default.createElement(
                                        'span',
                                        { className: (0, _classnames2.default)('labelText') },
                                        optionObj.label
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'indicatorContainer' },
                                        _react2.default.createElement('span', { className: (0, _classnames2.default)('indicator', _this2.props.value.toString() === optionObj.value.toString() ? 'active' : false) })
                                    )
                                )
                            );
                        })
                    )
                )
            );
        }
    }, {
        key: 'value',
        get: function get() {
            return this.field.value;
        }
    }]);

    return RadioGroup;
}(_react2.default.Component);

RadioGroup.styles = styles;
RadioGroup.defaultProps = {
    options: [],
    label: null,
    disabled: false,
    value: ''
};
exports.default = RadioGroup;