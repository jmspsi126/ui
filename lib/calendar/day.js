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

require('./styles.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Day = function (_React$Component) {
    _inherits(Day, _React$Component);

    _createClass(Day, null, [{
        key: 'defaultProps',
        get: function get() {
            return {
                empty: false,
                text: '',
                label: '',
                date: null,
                onClick: null,
                disabled: false
            };
        }
    }]);

    function Day(props) {
        _classCallCheck(this, Day);

        var _this = _possibleConstructorReturn(this, (Day.__proto__ || Object.getPrototypeOf(Day)).call(this, props));

        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    _createClass(Day, [{
        key: 'handleClick',
        value: function handleClick(event) {
            if (this.props.onClick) {
                this.props.onClick(this.props.date);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var Tag = 'div';
            if (this.props.selectable) {
                Tag = 'button';
            }
            return _react2.default.createElement(
                Tag,
                {
                    role: this.props.selectable ? 'button' : undefined,
                    type: this.props.selectable ? 'button' : undefined,
                    'aria-label': this.props.label || this.props.text,
                    title: this.props.label || this.props.text,
                    onClick: this.props.selectable ? this.handleClick : undefined,
                    className: (0, _classnames2.default)('ui-calendar__day', this.props.selectable ? 'selectable' : false, this.props.today ? 'today' : false, this.props.selected ? 'selected' : false, this.props.highlighted ? 'highlighted' : false, this.props.empty ? 'empty' : false, this.props.disabled ? 'disabled' : false, this.props.isCurrentMonth ? 'current-month' : false)
                },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-calendar__day__number-container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'ui-calendar__day__number' },
                        this.props.text
                    )
                )
            );
        }
    }]);

    return Day;
}(_react2.default.Component);

exports.default = Day;