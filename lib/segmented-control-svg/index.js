'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _label = require('../label');

var _label2 = _interopRequireDefault(_label);

var _styles = require('../styles.less');

var _styles2 = _interopRequireDefault(_styles);

var _segmentedControl = require('./segmented-control.less');

var _segmentedControl2 = _interopRequireDefault(_segmentedControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

    _createClass(RadioGroup, null, [{
        key: 'contextTypes',
        get: function get() {
            return {
                onChange: _react2.default.PropTypes.func
            };
        }
    }, {
        key: 'defaultProps',
        get: function get() {
            return {
                options: [],
                label: undefined,
                value: ''
            };
        }
    }]);

    function RadioGroup(props) {
        _classCallCheck(this, RadioGroup);

        var _this = _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call(this, props));

        _this.state = {
            focused: false,
            dirty: _underscore2.default.isUndefined(_this.props.dirty) ? false : _this.props.dirty,
            itemWidth: 100,
            itemHeight: 100
        };

        return _this;
    }

    _createClass(RadioGroup, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.boundHandleResize = _underscore2.default.bind(this.handleResize, this);
            window.addEventListener('resize', this.boundHandleResize);
            this.handleResize();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('resize', this.boundHandleResize);
        }
    }, {
        key: 'handleResize',
        value: function handleResize() {
            var node = _reactDom2.default.findDOMNode(this);
            var rect = node.querySelector('li').getBoundingClientRect();
            this.setState({
                itemWidth: rect.width,
                itemHeight: rect.height
            });
        }
    }, {
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
            console.log('blur');
            this.setState({ dirty: true, focused: false });
            if (this.props.onBlur) {
                this.props.onBlur(event);
            }
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(event) {
            console.log('focus');
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
            props.className = (0, _classnames2.default)(_segmentedControl2.default.field, this.props.selectClassName);
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
                        { className: _styles2.default.errorMessage },
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

                    id: this.props.id,
                    style: inlineStyle,
                    onMouseDown: function onMouseDown() {
                        console.log('mouse down');
                        _this2.handleFocus();
                    },
                    className: (0, _classnames2.default)(_segmentedControl2.default.root, isDisabled ? _segmentedControl2.default.disabled : false, error ? _segmentedControl2.default.error : false, this.props.block ? _segmentedControl2.default.block : false, this.props.required == true ? _segmentedControl2.default.required : false, this.state.focused == true ? _segmentedControl2.default.focused : false, this.props.className) },
                _react2.default.createElement(
                    'ul',
                    { className: _segmentedControl2.default.group },
                    _underscore2.default.map(this.props.options, function (optionObj, optionIndex) {
                        return _react2.default.createElement(
                            'li',
                            { key: optionObj.value, className: (0, _classnames2.default)(_segmentedControl2.default.item, _this2.props.value.toString() === optionObj.value.toString() ? _segmentedControl2.default.active : false) },
                            _react2.default.createElement(
                                'label',
                                null,
                                _react2.default.createElement('input', {
                                    className: _segmentedControl2.default.radio,
                                    checked: _this2.props.value.toString() === optionObj.value.toString(),
                                    value: optionObj.value,
                                    type: "radio",
                                    onChange: _this2.handleChange.bind(_this2),
                                    onBlur: _this2.handleBlur.bind(_this2),
                                    onFocus: _this2.handleFocus.bind(_this2),
                                    onMouseDown: _this2.handleFocus.bind(_this2)

                                }),
                                _react2.default.createElement(
                                    'span',
                                    { className: (0, _classnames2.default)(_segmentedControl2.default.labelText) },
                                    optionObj.label
                                ),
                                _react2.default.createElement('svg', { viewBox: '0 0 ' + _this2.state.itemWidth + ' ' + _this2.state.itemHeight,
                                    preserveAspectRatio: 'none', style: { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }, dangerouslySetInnerHTML: { __html: _this2.props.value.toString() === optionObj.value.toString() ? '\n                            <defs>\n                                <mask id="mask_' + optionObj.value + '_' + Math.round(_this2.state.itemWidth) + '_' + Math.round(_this2.state.itemHeight) + '_' + _this2.props.value.toString() + '_' + optionIndex + '" x="0" y="0" width="' + _this2.state.itemWidth + '" height="' + _this2.state.itemHeight + '" >\n                                    <rect x="0" y="0" width="' + _this2.state.itemWidth + '" height="' + _this2.state.itemHeight + '" fill="#fff" />\n                                    <text class="' + _segmentedControl2.default.svgText + '" text-anchor="middle" x="' + _this2.state.itemWidth / 2 + '" y="' + _this2.state.itemHeight / 2 + '" dy="1" width="' + _this2.state.itemWidth + '" height="' + _this2.state.itemHeight + '" alignment-baseline="central" font-size="1em">' + optionObj.label + '</text>    \n                                </mask>\n                            </defs>\n                            <rect x="0" y="0" width="' + _this2.state.itemWidth + '" height="' + _this2.state.itemHeight + '" class="' + _segmentedControl2.default.svgBG + '" mask="url(#mask_' + optionObj.value + '_' + Math.round(_this2.state.itemWidth) + '_' + Math.round(_this2.state.itemHeight) + '_' + _this2.props.value.toString() + '_' + optionIndex + ')" fill="currentColor"/>    \n                        ' : '\n                            <text class="' + _segmentedControl2.default.svgText + '" fill="currentColor" text-anchor="middle" x="' + _this2.state.itemWidth / 2 + '" y="' + _this2.state.itemHeight / 2 + '" dy="1" width="' + _this2.state.itemWidth + '" height="' + _this2.state.itemHeight + '" alignment-baseline="central" font-size="1em">' + optionObj.label + '</text>    \n                        '
                                    } })
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

    return RadioGroup;
}(_react2.default.Component);

RadioGroup.styles = _segmentedControl2.default;
exports.default = RadioGroup;