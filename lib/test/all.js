'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _selectField = require('ui/select-field');

var _selectField2 = _interopRequireDefault(_selectField);

var _textField = require('ui/text-field');

var _textField2 = _interopRequireDefault(_textField);

var _radioGroup = require('ui/radio-group');

var _radioGroup2 = _interopRequireDefault(_radioGroup);

var _checkbox = require('ui/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _button = require('ui/button');

var _button2 = _interopRequireDefault(_button);

var _container = require('ui/container');

var _container2 = _interopRequireDefault(_container);

var _segmentedControl = require('ui/segmented-control');

var _segmentedControl2 = _interopRequireDefault(_segmentedControl);

var _label = require('ui/label');

var _label2 = _interopRequireDefault(_label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Row = function Row(props) {
    return _react2.default.createElement(
        'div',
        { style: _extends({ paddingRight: '1em', paddingBottom: '1em', minWidth: '200px', flexGrow: '1' }, props.style) },
        props.children
    );
};
var Col = function Col(props) {
    return _react2.default.createElement(
        'div',
        { style: _extends({ paddingRight: '1em', paddingBottom: '1em', minWidth: '200px', flexGrow: '1' }, props.style) },
        props.children
    );
};

var Test = function (_React$Component) {
    _inherits(Test, _React$Component);

    _createClass(Test, null, [{
        key: 'defaultProps',
        get: function get() {
            return {};
        }
    }]);

    function Test(props) {
        _classCallCheck(this, Test);

        var _this = _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this, props));

        _this.state = {
            select1: '1',
            select2: '',
            set1: [{ value: "1", label: "Option 1" }, { value: "2", label: "Option 2" }, { value: "3", label: "Option 3" }, { value: "4", label: "Option 4" }]
        };

        return _this;
    }

    _createClass(Test, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var elements = _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h2',
                    null,
                    'Label'
                ),
                _react2.default.createElement(
                    Row,
                    null,
                    _react2.default.createElement(
                        Col,
                        { medium: 12 },
                        _react2.default.createElement(
                            _container2.default,
                            null,
                            _react2.default.createElement(_label2.default, { text: "Label" })
                        )
                    )
                ),
                _react2.default.createElement(
                    'h2',
                    null,
                    'Checkbox'
                ),
                _react2.default.createElement(
                    Row,
                    null,
                    _react2.default.createElement(
                        Col,
                        null,
                        _react2.default.createElement(
                            _container2.default,
                            null,
                            _react2.default.createElement(_checkbox2.default, { label: "Checkbox Label" })
                        )
                    )
                ),
                _react2.default.createElement(
                    'h2',
                    null,
                    'Select Field'
                ),
                _react2.default.createElement(
                    Row,
                    null,
                    _react2.default.createElement(
                        Col,
                        { medium: 6 },
                        _react2.default.createElement(
                            _container2.default,
                            null,
                            _react2.default.createElement(_selectField2.default, { label: "Select Field", block: true, value: this.state.select1, options: [{ value: '', label: "Choose..." }].concat(this.state.set1), onChange: function onChange(value) {
                                    _this2.setState({ select1: value });
                                } })
                        )
                    ),
                    _react2.default.createElement(
                        Col,
                        { medium: 6 },
                        _react2.default.createElement(
                            _container2.default,
                            null,
                            _react2.default.createElement(_selectField2.default, { label: "Select Field Error", block: true, value: this.state.select1, options: [{ value: '', label: "Choose..." }].concat(this.state.set1), onChange: function onChange(value) {
                                    _this2.setState({ select1: value });
                                }, error: "Error Message", dirty: true })
                        )
                    )
                ),
                _react2.default.createElement(
                    'h2',
                    null,
                    'Text Field'
                ),
                _react2.default.createElement(
                    Row,
                    null,
                    _react2.default.createElement(
                        Col,
                        { medium: 6 },
                        _react2.default.createElement(
                            _container2.default,
                            null,
                            _react2.default.createElement(_textField2.default, { label: "Text Field", block: true, value: this.state.select1, onChange: function onChange(value) {
                                    _this2.setState({ select1: value });
                                } })
                        )
                    ),
                    _react2.default.createElement(
                        Col,
                        { medium: 6 },
                        _react2.default.createElement(
                            _container2.default,
                            null,
                            _react2.default.createElement(_textField2.default, { label: "Text Field With Prefix", block: true, value: this.state.select1, onChange: function onChange(value) {
                                    _this2.setState({ select1: value });
                                }, prefix: "$" })
                        )
                    ),
                    _react2.default.createElement(
                        Col,
                        { medium: 6 },
                        _react2.default.createElement(
                            _container2.default,
                            null,
                            _react2.default.createElement(_textField2.default, { label: "Text Field Error", block: true, value: this.state.select1, onChange: function onChange(value) {
                                    _this2.setState({ select1: value });
                                }, error: "Error Message", dirty: true })
                        )
                    )
                ),
                _react2.default.createElement(
                    'h2',
                    null,
                    'Radio Group'
                ),
                _react2.default.createElement(
                    Row,
                    null,
                    _react2.default.createElement(
                        Col,
                        { medium: 6 },
                        _react2.default.createElement(
                            _container2.default,
                            null,
                            _react2.default.createElement(_radioGroup2.default, { label: "Radio Group", block: true, value: this.state.select1, options: this.state.set1, onChange: function onChange(value) {
                                    _this2.setState({ select1: value });
                                } })
                        )
                    ),
                    _react2.default.createElement(
                        Col,
                        { medium: 6 },
                        _react2.default.createElement(
                            _container2.default,
                            null,
                            _react2.default.createElement(_radioGroup2.default, { label: "Radio Group Error", block: true, value: this.state.select1, options: this.state.set1, onChange: function onChange(value) {
                                    _this2.setState({ select1: value });
                                }, error: "Error Message", dirty: true })
                        )
                    )
                ),
                _react2.default.createElement(
                    'h2',
                    null,
                    'Segmented Control'
                ),
                _react2.default.createElement(
                    Row,
                    null,
                    _react2.default.createElement(
                        Col,
                        { xlarge: 6 },
                        _react2.default.createElement(
                            _container2.default,
                            null,
                            _react2.default.createElement(_segmentedControl2.default, { block: true, value: this.state.select1, options: this.state.set1, onChange: function onChange(value) {
                                    _this2.setState({ select1: value });
                                } })
                        )
                    ),
                    _react2.default.createElement(
                        Col,
                        { xlarge: 6 },
                        _react2.default.createElement(
                            _container2.default,
                            null,
                            _react2.default.createElement(
                                'div',
                                { style: { fontSize: '.75em' } },
                                _react2.default.createElement(_segmentedControl2.default, { value: this.state.select1, options: this.state.set1, onChange: function onChange(value) {
                                        _this2.setState({ select1: value });
                                    }, error: "Error Message", dirty: true })
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'h2',
                    null,
                    'Button'
                ),
                _react2.default.createElement(
                    Row,
                    null,
                    _react2.default.createElement(
                        Col,
                        { medium: 12 },
                        _react2.default.createElement(
                            _button2.default,
                            null,
                            'Default'
                        ),
                        ' ',
                        _react2.default.createElement(
                            _button2.default,
                            { primary: true },
                            'Primary'
                        )
                    ),
                    _react2.default.createElement(
                        Col,
                        { medium: 12 },
                        _react2.default.createElement(
                            _button2.default,
                            { outline: true },
                            'Outline'
                        ),
                        ' ',
                        _react2.default.createElement(
                            _button2.default,
                            { primary: true, outline: true },
                            'Outline Primary'
                        ),
                        ' ',
                        _react2.default.createElement(_textField2.default, { value: this.state.select1, onChange: function onChange(value) {
                                _this2.setState({ select1: value });
                            } })
                    )
                )
            );

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    Row,
                    { collapse: true },
                    _react2.default.createElement(
                        Col,
                        { medium: 12, large: 6 },
                        _react2.default.createElement(
                            'div',
                            { style: { padding: '2em' } },
                            elements
                        )
                    ),
                    _react2.default.createElement(
                        Col,
                        { medium: 12, large: 6 },
                        _react2.default.createElement(
                            'div',
                            { style: {
                                    '--ui-color-primary': '#0095ff',
                                    '--ui-padding': '.2em',
                                    background: '#232323', color: "#c2c2c2", padding: '2em' } },
                            elements
                        )
                    )
                )
            );
        }
    }]);

    return Test;
}(_react2.default.Component);

exports.default = Test;


(0, _index2.default)(Test);