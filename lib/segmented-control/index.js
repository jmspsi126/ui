'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

require('./segmented-control.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Creates a new SegmentedControl.
 * @class SegmentedControl  
 * @extends Component
 * @param {object} props
 * @param {string} props.label The label
 * @param {string} props.placeholder The placholder
 */
var SegmentedControl = function (_React$Component) {
    _inherits(SegmentedControl, _React$Component);

    _createClass(SegmentedControl, null, [{
        key: 'contextTypes',
        get: function get() {
            return {
                onChange: _react2.default.PropTypes.func
            };
        }
    }]);

    function SegmentedControl(props) {
        _classCallCheck(this, SegmentedControl);

        var _this = _possibleConstructorReturn(this, (SegmentedControl.__proto__ || Object.getPrototypeOf(SegmentedControl)).call(this, props));

        _this.state = {
            focused: false,
            dirty: _underscore2.default.isUndefined(_this.props.dirty) ? false : _this.props.dirty
        };

        return _this;
    }

    _createClass(SegmentedControl, [{
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
            this.setState({ dirty: true });
        }
    }, {
        key: 'render',


        // componentWillReceiveProps(nextProps){
        //     console.log(nextProps)
        // }

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
                        { className: 'ui__error-message' },
                        this.props.error
                    );
                }
            }

            var isDisabled = this.props.disabled;

            var inlineStyle = {};
            if (this.props.visible == false) {
                inlineStyle.display = 'none';
            }

            var currentOption = _underscore2.default.findWhere(this.props.options, { value: this.props.value });

            return _react2.default.createElement(
                'div',
                {
                    style: inlineStyle,
                    className: (0, _classnames2.default)('ui__segmented-control', {
                        'ui__segmented-control--layout-row': this.props.layout == 'row',
                        'ui__segmented-control--layout-column': this.props.layout == 'column'
                    }, isDisabled ? 'disabled' : false, error ? 'error' : false, this.props.block ? 'block' : false, this.props.required == true ? 'required' : false, this.state.focused == true ? 'focused' : false, this.props.className) },
                _react2.default.createElement(_label2.default, { block: true, text: this.props.label }),
                _react2.default.createElement(
                    'ul',
                    { className: 'ui__segmented-control__group' },
                    _underscore2.default.map(this.props.options, function (optionObj, optionIndex) {
                        return _react2.default.createElement(
                            'li',
                            {
                                key: optionObj.value,
                                onMouseDown: function onMouseDown(event) {
                                    event.preventDefault();
                                    _this2.setState({ focused: true });
                                    _this2.handleFocus();
                                },
                                className: (0, _classnames2.default)('ui__segmented-control__item', {
                                    'ui__segmented-control__item--disabled': _typeof(optionObj.disabled) && optionObj.disabled == true ? true : false,
                                    'ui__segmented-control__item--valign-top': _this2.props.vAlign == 'top',
                                    'ui__segmented-control__item--valign-center': _this2.props.vAlign == 'center',
                                    'ui__segmented-control__item--valign-bottom': _this2.props.vAlign == 'bottom',
                                    'ui__segmented-control__item--halign-left': _this2.props.hAlign == 'left',
                                    'ui__segmented-control__item--halign-center': _this2.props.hAlign == 'center',
                                    'ui__segmented-control__item--halign-right': _this2.props.hAlign == 'right'
                                }, _this2.props.value.toString() === optionObj.value.toString() ? 'active' : false) },
                            _react2.default.createElement(
                                'label',
                                null,
                                _react2.default.createElement('input', {
                                    className: 'radio',
                                    checked: _this2.props.value && optionObj.value && _this2.props.value.toString() === optionObj.value.toString() ? true : false,
                                    value: optionObj.value,
                                    type: "radio",
                                    onChange: _this2.handleChange.bind(_this2),
                                    onBlur: _this2.handleBlur.bind(_this2),
                                    onFocus: _this2.handleFocus.bind(_this2),
                                    disabled: _typeof(optionObj.disabled) && optionObj.disabled == true ? true : false
                                }),
                                _react2.default.createElement(
                                    'span',
                                    { className: (0, _classnames2.default)('dummyLabel') },
                                    optionObj.label
                                ),
                                _react2.default.createElement(
                                    'span',
                                    { className: (0, _classnames2.default)('labelText') },
                                    optionObj.label
                                )
                            )
                        );
                    })
                )
            );
        }
    }, {
        key: 'value',
        get: function get() {
            return this.field.value;
        }
    }]);

    return SegmentedControl;
}(_react2.default.Component);

SegmentedControl.defaultProps = {
    options: [],
    label: false,
    value: '',
    disabled: false,
    vAlign: 'center',
    hAlign: 'center',
    layout: 'row'
};
exports.default = SegmentedControl;