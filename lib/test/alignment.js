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

var _verticalGuides = require('../vertical-guides');

var _verticalGuides2 = _interopRequireDefault(_verticalGuides);

var _checkbox = require('ui/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _button = require('ui/button');

var _button2 = _interopRequireDefault(_button);

var _textField = require('ui/text-field');

var _textField2 = _interopRequireDefault(_textField);

var _selectField = require('ui/select-field');

var _selectField2 = _interopRequireDefault(_selectField);

var _container = require('ui/container');

var _container2 = _interopRequireDefault(_container);

var _slider = require('ui/slider');

var _slider2 = _interopRequireDefault(_slider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import {Row,Cell} from 'uml-react-grid' 

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
                _react2.default.createElement(_slider2.default, { label: "Slider" }),
                _react2.default.createElement(_checkbox2.default, { checked: this.state.check1, onChange: function onChange(checked) {
                        return _this2.setState({ check1: checked });
                    }, label: "Checkbox" }),
                _react2.default.createElement(
                    _button2.default,
                    null,
                    'Button'
                ),
                _react2.default.createElement(_textField2.default, { mask: '999-999', maskChar: null, placeholder: 'Text Field' }),
                _react2.default.createElement(_textField2.default, { placeholder: 'Text Field', dirty: true, label: 'Label' }),
                _react2.default.createElement(_selectField2.default, { options: [{ label: 'Select Field', value: 'Select Field' }] }),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                    'div',
                    { style: { display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' } },
                    _react2.default.createElement(
                        Col,
                        null,
                        _react2.default.createElement(_checkbox2.default, { block: true, checked: this.state.check1, onChange: function onChange(checked) {
                                return _this2.setState({ check1: checked });
                            }, label: "Checkbox" })
                    ),
                    _react2.default.createElement(
                        Col,
                        null,
                        _react2.default.createElement(
                            _button2.default,
                            { block: true, primary: true },
                            'Button'
                        )
                    ),
                    _react2.default.createElement(
                        Col,
                        null,
                        _react2.default.createElement(
                            _button2.default,
                            { block: true },
                            'Button'
                        )
                    ),
                    _react2.default.createElement(
                        Col,
                        { style: { flex: '1' } },
                        _react2.default.createElement(_textField2.default, { label: "Label", block: true, placeholder: 'Text Field', prefix: '$' })
                    ),
                    _react2.default.createElement(
                        Col,
                        { style: { flex: '1' } },
                        _react2.default.createElement(_textField2.default, { dirty: true, error: 'Error Message', label: "Label", block: true, placeholder: 'Text Field', prefix: '$' })
                    ),
                    _react2.default.createElement(
                        Col,
                        { style: { flex: '1' } },
                        _react2.default.createElement(_textField2.default, { dirty: true, error: 'Error Message', block: true, placeholder: 'Text Field', prefix: '$' })
                    ),
                    _react2.default.createElement(
                        Col,
                        null,
                        _react2.default.createElement(_selectField2.default, { block: true, label: "Label", options: [{ label: 'Select Field', value: 'Select Field' }] })
                    ),
                    _react2.default.createElement(
                        Col,
                        null,
                        _react2.default.createElement(_selectField2.default, { block: true, label: "Label", dirty: true, required: true, error: 'Error Message', options: [{ label: 'Select Field', value: 'Select Field' }] })
                    )
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                    'div',
                    { style: { display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' } },
                    _react2.default.createElement(
                        Col,
                        null,
                        _react2.default.createElement(_checkbox2.default, { block: true, checked: this.state.check1, onChange: function onChange(checked) {
                                return _this2.setState({ check1: checked });
                            }, label: "Checkbox" })
                    ),
                    _react2.default.createElement(
                        Col,
                        null,
                        _react2.default.createElement(
                            _button2.default,
                            { block: true, primary: true },
                            'Button'
                        )
                    ),
                    _react2.default.createElement(
                        Col,
                        null,
                        _react2.default.createElement(
                            _button2.default,
                            { block: true },
                            'Button'
                        )
                    ),
                    _react2.default.createElement(
                        Col,
                        { style: { flex: '1' } },
                        _react2.default.createElement(_textField2.default, { label: "Label", block: true, placeholder: 'Text Field', prefix: '$' })
                    ),
                    _react2.default.createElement(
                        Col,
                        { style: { flex: '1' } },
                        _react2.default.createElement(_textField2.default, { dirty: true, error: 'Error Message', label: "Label", block: true, placeholder: 'Text Field', prefix: '$' })
                    ),
                    _react2.default.createElement(
                        Col,
                        { style: { flex: '1' } },
                        _react2.default.createElement(_textField2.default, { dirty: true, error: 'Error Message', block: true, placeholder: 'Text Field', prefix: '$' })
                    ),
                    _react2.default.createElement(
                        Col,
                        { style: { flex: '1' } },
                        _react2.default.createElement(
                            'p',
                            null,
                            'Lorem ipsum Officia pariatur tempor laboris amet sit irure proident deserunt sit reprehenderit in amet ut veniam Excepteur commodo ex ullamco ex tempor ut reprehenderit in commodo nostrud elit eiusmod laborum incididunt consectetur nostrud eiusmod velit.'
                        )
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
                this.renderElements()
            );
        }
    }]);

    return Test;
}(_react2.default.Component);

(0, _index2.default)(Test);