'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _checkbox = require('ui/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _button = require('ui/button');

var _button2 = _interopRequireDefault(_button);

var _container = require('ui/container');

var _container2 = _interopRequireDefault(_container);

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
            check1: false,
            check2: true,
            check3: false,
            check4: true
        };

        return _this;
    }

    _createClass(Test, [{
        key: 'renderElements',
        value: function renderElements() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h3',
                    null,
                    'Inline'
                ),
                _react2.default.createElement(_checkbox2.default, { checked: this.state.check1, onChange: function onChange(checked) {
                        return _this2.setState({ check1: checked });
                    }, label: "Checkbox Label" }),
                _react2.default.createElement(
                    _checkbox2.default,
                    { checked: this.state.check2, onChange: function onChange(checked) {
                            return _this2.setState({ check2: checked });
                        } },
                    'Checkbox Label',
                    _react2.default.createElement('br', null),
                    'that is a bit long'
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                    'h3',
                    null,
                    'Block'
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_checkbox2.default, { block: true, checked: this.state.check3, onChange: function onChange(checked) {
                            return _this2.setState({ check3: checked });
                        }, label: "Checkbox Label" }),
                    _react2.default.createElement(
                        _checkbox2.default,
                        { block: true, checked: this.state.check4, onChange: function onChange(checked) {
                                return _this2.setState({ check4: checked });
                            } },
                        'Checkbox Label that is a bit long'
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: { padding: '2em' } },
                _react2.default.createElement(
                    'h3',
                    null,
                    'Checkbox'
                ),
                this.renderElements()
            );
        }
    }]);

    return Test;
}(_react2.default.Component);

(0, _index2.default)(Test);