'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _TextField$defaultPro;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactInputMask = require('react-input-mask');

var _reactInputMask2 = _interopRequireDefault(_reactInputMask);

var _label = require('../label');

var _label2 = _interopRequireDefault(_label);

var _errorMessage = require('../error-message');

var _errorMessage2 = _interopRequireDefault(_errorMessage);

require('../styles.less');

require('./text-field.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import MaskedField from 'react-maskedinput'


/**
 * Creates a new Textfield.
 * @class Textfield  
 * @extends Component
 * @param {object} props
 * @param {string} props.label The label
 * @param {string} props.placeholder The placholder
 */
var TextField = function (_React$Component) {
    _inherits(TextField, _React$Component);

    function TextField(props) {
        _classCallCheck(this, TextField);

        var _this = _possibleConstructorReturn(this, (TextField.__proto__ || Object.getPrototypeOf(TextField)).call(this, props));

        _this.state = {
            value: props.value,
            focus: false,
            dirty: _underscore2.default.isUndefined(_this.props.dirty) ? false : _this.props.dirty
        };
        return _this;
    }

    _createClass(TextField, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            /*    var initialValue = this.props.value
                setTimeout(()=>{
                    if(initialValue.toString() !== this.field.value){
                        console.log(this.field.value)
                    }
                },100)*/
        }
    }, {
        key: 'handleChange',
        value: function handleChange(event) {
            //console.log(event.target.value)
            var value = event.target.value;
            // if(this.props.mask){
            //     value = this.field.mask.getRawValue()
            //     console.log(this.field.mask.getValue())
            // }
            this.setState({ dirty: true, value: value });
            if (this.props.onChange) {
                this.props.onChange(value, this);
            }
            if (this.context.onChange) {
                this.context.onChange(value, this);
            }
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(event) {
            this.setState({ dirty: true, focus: false });
            if (this.props.onBlur) {
                this.props.onBlur(event);
            }
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(event) {
            this.setState({ focus: true });
            if (this.props.ignoreInput) {
                event.preventDefault();
            }
            if (this.props.onFocus) {
                this.props.onFocus(event);
            }
        }
    }, {
        key: 'handleOnTouchStart',
        value: function handleOnTouchStart(event) {
            if (this.props.ignoreInput) {
                event.preventDefault();
            }
            this.setState({ focus: true });
            if (this.props.onFocus) {
                this.props.onFocus(event);
            }
        }

        /**
         * [handleKeyPress description]
         * @param  {[type]} event [description]
         * @return {[type]}       [description]
         */

    }, {
        key: 'handleKeyPress',
        value: function handleKeyPress(event) {
            this.setState({ dirty: true });
            if (this.props.onAction && event.key === 'Enter') {
                this.props.onAction(event.target.value, event, this);
            }
            if (this.props.onKeyPress) {
                return this.props.onKeyPress(event.target.value, event, this);
            }
            // if(this.context.onChange){
            //     return this.context.onChange(event.target.value, event, this)
            // }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.state.value !== nextProps.value) {
                this.setState({ value: nextProps.value });
            }
        }
    }, {
        key: 'render',


        /**
         * render
         * @return {ReactElement} markup
         */
        value: function render() {
            var _this2 = this;

            var props = _underscore2.default.omit.apply(_underscore2.default, [this.props].concat(_toConsumableArray(_underscore2.default.keys(this.constructor.defaultProps))));
            props.ref = function (node) {
                _this2.field = node;
            };
            props.className = (0, _classnames2.default)('ui-text-field__field', this.props.inputClassName);
            props.placeholder = this.props.placeholder;
            props.type = this.props.type;
            props.value = this.state.value || '';
            props.defaultValue = this.props.defaultValue;
            props.onFocus = this.handleFocus.bind(this);
            props.onBlur = this.handleBlur.bind(this);
            props.onChange = this.handleChange.bind(this);
            if (this.props.ignoreInput) {
                props.onTouchStart = this.handleOnTouchStart.bind(this);
            }

            var textfield;

            if (this.props.multiline) {
                textfield = _react2.default.createElement('textarea', props);
            } else if (this.props.mask) {
                props.mask = this.props.mask;
                //props.isRevealingMask = this.props.isRevealingMask
                props.maskChar = this.props.maskChar;
                props.alwaysShowMask = this.props.alwaysShowMask;
                props.onKeyPress = this.handleKeyPress.bind(this);
                textfield = _react2.default.createElement(_reactInputMask2.default, props);
            } else {
                props.onKeyPress = this.handleKeyPress.bind(this);
                textfield = _react2.default.createElement('input', props);
            }

            var error = false;
            var errorMessage = null;
            if (this.props.error && (this.props.dirty || this.state.dirty)) {
                error = true;
                if (this.props.error) {
                    errorMessage = _react2.default.createElement(
                        _errorMessage2.default,
                        null,
                        this.props.error
                    );
                }
            }

            var isDisabled = this.props.disabled;

            var inlineStyle = _extends({}, this.props.style);
            if (this.props.visible == false) {
                inlineStyle.display = 'none';
            }

            return _react2.default.createElement(
                'div',
                {
                    id: this.props.id,
                    style: inlineStyle,
                    className: (0, _classnames2.default)('ui-text-field', isDisabled ? 'disabled' : false, error ? 'error' : false, this.props.prefix ? 'hasPrefix' : false, this.props.block ? 'block' : false, this.props.required == true ? 'required' : false, this.props.className) },
                _react2.default.createElement(
                    _label2.default,
                    { block: true, text: this.props.label, errorMessage: errorMessage, required: this.props.required },
                    _react2.default.createElement(
                        'div',
                        { className: 'ui-text-field__fieldContainer' },
                        this.props.prefix ? _react2.default.createElement(
                            'span',
                            { className: 'ui-text-field__prefix' },
                            this.props.prefix
                        ) : null,
                        textfield,
                        _react2.default.createElement('div', { className: 'ui-text-field__fieldFrame' })
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

    return TextField;
}(_react2.default.Component);

TextField.defaultProps = (_TextField$defaultPro = {
    type: 'text',
    label: null,
    value: '',
    onAction: null,
    onKeyPress: null,
    onChange: null,
    onFocus: null,
    onBlur: null
}, _defineProperty(_TextField$defaultPro, 'onKeyPress', null), _defineProperty(_TextField$defaultPro, 'error', false), _defineProperty(_TextField$defaultPro, 'placeholder', ''), _defineProperty(_TextField$defaultPro, 'dirty', false), _defineProperty(_TextField$defaultPro, 'block', false), _defineProperty(_TextField$defaultPro, 'multiline', false), _defineProperty(_TextField$defaultPro, 'ignoreInput', false), _defineProperty(_TextField$defaultPro, 'mask', null), _defineProperty(_TextField$defaultPro, 'maskChar', ' '), _defineProperty(_TextField$defaultPro, 'alwaysShowMask', false), _TextField$defaultPro);
exports.default = TextField;