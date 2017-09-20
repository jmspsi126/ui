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
            select1: '',
            select2: ''
        };
        return _this;
    }

    _createClass(Test, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    Row,
                    null,
                    _react2.default.createElement(
                        Col,
                        { medium: 6 },
                        _react2.default.createElement(_selectField2.default, { block: true, value: this.state.select1, options: [{ value: '', label: "Choose..." }, { value: "1", label: "Option 1" }, { value: "2", label: "Option 2" }, { value: "3", label: "Option 3" }, { value: "4", label: "Option 4" }], onChange: function onChange(value) {
                                _this2.setState({ select1: value });
                            } })
                    ),
                    _react2.default.createElement(
                        Col,
                        { medium: 6 },
                        _react2.default.createElement(_textField2.default, { block: true, value: this.state.select1, onChange: function onChange(value) {
                                _this2.setState({ select1: value });
                            } })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { style: {
                            background: '#434343',
                            color: "#c2c2c2",
                            padding: '30px'
                        } },
                    _react2.default.createElement(
                        Row,
                        null,
                        _react2.default.createElement(
                            Col,
                            { medium: 6 },
                            _react2.default.createElement(_selectField2.default, { block: true, value: this.state.select1, options: [{ value: '', label: "Choose..." }, { value: "1", label: "Option 1" }, { value: "2", label: "Option 2" }, { value: "3", label: "Option 3" }, { value: "4", label: "Option 4" }], onChange: function onChange(value) {
                                    _this2.setState({ select1: value });
                                } })
                        ),
                        _react2.default.createElement(
                            Col,
                            { medium: 6 },
                            _react2.default.createElement(_textField2.default, { block: true, value: this.state.select1, onChange: function onChange(value) {
                                    _this2.setState({ select1: value });
                                } })
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