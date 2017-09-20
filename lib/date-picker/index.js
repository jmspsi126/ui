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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _label = require('../label');

var _label2 = _interopRequireDefault(_label);

var _errorMessage = require('../error-message');

var _errorMessage2 = _interopRequireDefault(_errorMessage);

var _textField = require('../text-field');

var _textField2 = _interopRequireDefault(_textField);

var _calendar = require('../calendar');

var _calendar2 = _interopRequireDefault(_calendar);

require('../styles.less');

require('./styles.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Creates a new DatePicker.
 * @class DatePicker  
 * @extends Component
 * @param {object} props
 * @param {string} props.label The label
 * @param {string} props.placeholder The placholder
 */
var DatePicker = function (_React$Component) {
    _inherits(DatePicker, _React$Component);

    function DatePicker(props) {
        _classCallCheck(this, DatePicker);

        var _this = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props));

        _this.state = {
            value: props.value,
            focused: false,
            showPopup: false,
            popupStyle: _this.getPopupStyle(false),
            dirty: _underscore2.default.isUndefined(_this.props.dirty) ? false : _this.props.dirty
        };
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleDocumentFocusIn = _this.handleDocumentFocusIn.bind(_this);
        _this.handleDocumentFocusOut = _this.handleDocumentFocusOut.bind(_this);
        _this.handleScroll = _this.handleScroll.bind(_this);
        return _this;
    }

    _createClass(DatePicker, [{
        key: 'handleChange',
        value: function handleChange(value) {
            if (this.props.mode == 'date') {
                this.setState({
                    dirty: true,
                    value: value,
                    showPopup: false
                });
            } else {
                this.setState({
                    dirty: true,
                    value: value
                });
            }
            if (this.props.onChange) {
                this.props.onChange(value, this);
            }
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(event) {
            this.setState({ dirty: true });
            if (this.props.onBlur) {
                this.props.onBlur(event);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.state.value !== nextProps.value) {
                this.setState({ value: nextProps.value });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.document.addEventListener('scroll', this.handleScroll);
            window.document.addEventListener('focusin', this.handleDocumentFocusIn);
            //window.document.addEventListener('focusout', this.handleDocumentFocusOut)
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.document.removeEventListener('scroll', this.handleScroll);
            window.document.removeEventListener('focusin', this.handleDocumentFocusIn);
            //window.document.removeEventListener('focusout', this.handleDocumentFocusOut)
        }

        /**
         * render
         * @return {ReactElement} markup
         */

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

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

            var inlineStyle = _extends({}, this.props.style);
            if (this.props.visible == false) {
                inlineStyle.display = 'none';
            }

            return _react2.default.createElement(
                'div',
                {
                    ref: function ref(node) {
                        return _this2.node = node;
                    },
                    id: this.props.id,
                    style: this.props.style,
                    className: (0, _classnames2.default)('ui-date-picker', this.props.disabled ? 'disabled' : false, error ? 'error' : false, this.props.prefix ? 'hasPrefix' : false, this.props.block ? 'block' : false, this.props.required == true ? 'required' : false, this.props.className) },
                _react2.default.createElement(_textField2.default, _extends({}, _underscore2.default.pick(this.props, 'label', 'placeholder', 'prefix'), {
                    block: true,
                    value: this.state.value ? (0, _moment2.default)(this.state.value).format(this.props.format) : '',
                    onChange: this.handleChange,
                    onFocus: this.handleFocus,
                    onBlur: this.handleBlur,
                    readOnly: 'true',
                    ignoreInput: true
                })),
                this.state.showPopup ? _react2.default.createElement('div', { style: { zIndex: 99998, position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0)' }, onClick: this.handleDocumentFocusOut }) : null,
                _react2.default.createElement(
                    'div',
                    { ref: function ref(node) {
                            return _this2.popupNode = node;
                        }, className: (0, _classnames2.default)('ui-date-picker__popup', this.state.showPopup ? 'ui-date-picker__popup__visible' : ''), style: this.state.popupStyle },
                    _react2.default.createElement(
                        'div',
                        { ref: function ref(node) {
                                return _this2.popupNodeInside = node;
                            }, className: (0, _classnames2.default)('ui-date-picker__popup-inside') },
                        _react2.default.createElement(_calendar2.default, {
                            enabledDates: this.props.enabledDates,
                            date: this.state.value,
                            onDaySelect: this.handleChange
                        })
                    )
                )
            );
        }
    }, {
        key: 'handleDocumentFocusIn',
        value: function handleDocumentFocusIn(event) {
            if (!this.node.contains(event.target) && event.target !== this.node) {
                this.setState(function (state) {
                    return {
                        focused: false,
                        showPopup: false
                    };
                });
            }
        }
    }, {
        key: 'handleDocumentFocusOut',
        value: function handleDocumentFocusOut(event) {
            if (!this.node || !this.node.contains(event.relatedTarget) && event.relatedTarget !== this.node) {
                this.setState(function (state) {
                    return {
                        focused: false,
                        showPopup: false
                    };
                });
            }
        }
    }, {
        key: 'handleScroll',
        value: function handleScroll(event) {
            var _this3 = this;

            if (this.state.showPopup) {
                this.setState(function (state) {
                    return {
                        popupStyle: _this3.getPopupStyle(state.showPopup)
                    };
                });
            }
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(event) {
            this.setState({
                focused: true,
                showPopup: true,
                popupStyle: this.getPopupStyle(true)
            });
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(event) {
            // this.setState(state=>({
            //     focused: state.calendarFocused?true:false
            // }))
        }
    }, {
        key: 'getPopupStyle',
        value: function getPopupStyle(visible) {
            var style = {};
            if (!this.popupNode || !this.node) {
                return style;
            }

            var inputBounds = this.node.getBoundingClientRect();
            var popupBounds = this.popupNodeInside.getBoundingClientRect();
            style.width = popupBounds.width + 'px';

            if (visible) {
                if (inputBounds.top + inputBounds.height + popupBounds.height <= window.innerHeight) {
                    if (inputBounds.top + inputBounds.height < 0) {
                        style.top = '0px';
                    } else {
                        style.top = inputBounds.top + inputBounds.height + 'px';
                    }
                    style.bottom = 'auto';
                } else if (inputBounds.top - popupBounds.height >= 0) {
                    style.top = 'auto';
                    if (window.innerHeight - inputBounds.top + popupBounds.height > window.innerHeight) {
                        style.bottom = '0px';
                    } else {
                        style.bottom = window.innerHeight - inputBounds.top + 'px';
                    }
                } else {
                    style.top = '0px';
                    style.bottom = 'auto';
                }

                if (inputBounds.left + popupBounds.width < window.innerWidth) {
                    style.left = inputBounds.left + 'px';
                    style.right = 'auto';
                } else {
                    style.left = 'auto';
                    style.right = '0';
                }

                // if(window.innerWidth < 500){
                //     style = {top:'0px', left:'0px', right:'0px', width:'100%'}
                // }
                //style.width = inputBounds.width+'px'
                //console.log(style.top)
                return style;
            }

            return _extends({}, this.state.popupStyle);
        }
    }]);

    return DatePicker;
}(_react2.default.Component);

DatePicker.defaultProps = {
    label: false,
    placeholder: '',
    onChange: null,
    format: 'MM/DD/YYYY',
    mode: 'date',
    enabledDates: null
};
exports.default = DatePicker;