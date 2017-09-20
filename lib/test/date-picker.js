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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

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

var _datePicker = require('../date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _calendar = require('../calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _segmentedControl = require('../segmented-control');

var _segmentedControl2 = _interopRequireDefault(_segmentedControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_segmentedControl2.default, {
                    value: '1',
                    options: [{ label: "Option A", value: '0' }, { label: "Option B", value: '1' }, { label: "Option C That has way too much text", value: '2' }, { label: "Option D", value: '3' }]
                }),
                _react2.default.createElement(_segmentedControl2.default, {
                    value: '1',
                    connected: true,
                    options: [{ label: "Option A", value: '0' }, { label: "Option B", value: '1' }, { label: "Option C That has way too much text", value: '2' }, { label: "Option D", value: '3' }]
                }),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null),
                _react2.default.createElement(_textField2.default, null),
                _react2.default.createElement(
                    'div',
                    { style: { display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' } },
                    _react2.default.createElement(
                        Col,
                        null,
                        _react2.default.createElement(_datePicker2.default, { block: true, label: "Date Picker", format: 'dddd, MMMM Do YYYY', placeholder: (0, _moment2.default)().format('dddd, MMMM Do YYYY'), prefix: _react2.default.createElement('i', { className: 'fa fa-calendar', 'aria-hidden': 'true' }) })
                    ),
                    _react2.default.createElement(
                        Col,
                        null,
                        _react2.default.createElement(_segmentedControl2.default, {
                            label: "Choose a Time",
                            block: true,
                            value: '1',
                            options: [{ label: "Option A", value: '0' }, { label: "Option B", value: '1' }, { label: "Option C That has way too much text", value: '2' }, { label: "Option D", value: '3' }]
                        })
                    ),
                    _react2.default.createElement(
                        Col,
                        null,
                        _react2.default.createElement(_segmentedControl2.default, {
                            label: "Choose a Time",
                            block: true,
                            value: '1',
                            vAlign: 'center',
                            hAlign: 'center',
                            options: [{ label: "Option A", value: '0' }, { label: "Option B", value: '1' }, { label: "Option C That has way too much text", value: '2' }, { label: "Option D", value: '3' }]
                        })
                    ),
                    _react2.default.createElement(
                        Col,
                        null,
                        _react2.default.createElement(_segmentedControl2.default, {
                            label: "Choose a Time",
                            block: true,
                            value: '1',
                            hAlign: 'left',
                            vAlign: 'top',
                            options: [{ label: "Option A", value: '0' }, { label: "Option B", value: '1' }, { label: "Option C That has way too much text", value: '2' }, { label: "Option D", value: '3' }]
                        })
                    ),
                    _react2.default.createElement(
                        Col,
                        null,
                        _react2.default.createElement(_segmentedControl2.default, {
                            label: "Choose a Time",
                            block: true,
                            value: '1',
                            hAlign: 'left',
                            vAlign: 'top',
                            options: [{ label: "Option A", value: '0' }, { label: "Option B", value: '1' }, { label: "Option C That has way too much text", value: '2' }, { label: "Option D", value: '3' }]
                        })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { style: { maxWidth: '200px' } },
                    _react2.default.createElement(_segmentedControl2.default, {
                        label: "Choose a Time",
                        block: true,
                        value: '1',
                        hAlign: 'left',
                        vAlign: 'top',
                        layout: 'column',
                        options: [{ label: "Option A", value: '0' }, { label: "Option B", value: '1' }, { label: "Option C That has way too much text", value: '2' }, { label: "Option D", value: '3', disabled: true }]
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { style: { width: '300px' } },
                    _react2.default.createElement(_calendar2.default, {
                        enabledDates: ["2017-03-08T19:14:27.618Z", "2017-03-12T19:00:00.000Z", "2017-03-13T19:00:00.000Z"]
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { style: { display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' } },
                    _react2.default.createElement(
                        Col,
                        null,
                        _react2.default.createElement(_datePicker2.default, {
                            block: true,
                            enabledDates: ["2017-03-08T19:14:27.618Z", "2017-03-12T19:00:00.000Z", "2017-03-13T19:00:00.000Z"],
                            label: "Date Picker",
                            placeholder: (0, _moment2.default)().format('MM/DD/YYYY'),
                            prefix: _react2.default.createElement('i', { className: 'fa fa-calendar', 'aria-hidden': 'true' }) })
                    ),
                    _react2.default.createElement(
                        Col,
                        null,
                        _react2.default.createElement(_datePicker2.default, { block: true, label: "Date Picker", format: 'dddd, MMMM Do YYYY', placeholder: (0, _moment2.default)().format('dddd, MMMM Do YYYY'), prefix: _react2.default.createElement('i', { className: 'fa fa-calendar', 'aria-hidden': 'true' }) })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { style: { display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' } },
                    _react2.default.createElement(
                        Col,
                        null,
                        _react2.default.createElement(_datePicker2.default, { block: true, label: "Date Picker", placeholder: (0, _moment2.default)().format('MM / DD / YYYY'), prefix: _react2.default.createElement('i', { className: 'fa fa-calendar', 'aria-hidden': 'true' }) })
                    ),
                    _react2.default.createElement(
                        Col,
                        null,
                        _react2.default.createElement(_datePicker2.default, { block: true, label: "Date Picker", placeholder: (0, _moment2.default)().format('MM/DD/YYYY'), prefix: _react2.default.createElement('i', { className: 'fa fa-calendar', 'aria-hidden': 'true' }) })
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