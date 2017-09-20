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

var Week = function (_React$Component) {
    _inherits(Week, _React$Component);

    _createClass(Week, null, [{
        key: 'defaultProps',
        get: function get() {
            return {
                selectable: true
            };
        }
    }]);

    function Week(props) {
        _classCallCheck(this, Week);

        return _possibleConstructorReturn(this, (Week.__proto__ || Object.getPrototypeOf(Week)).call(this, props));
    }

    _createClass(Week, [{
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
                    onClick: this.props.onClick,
                    className: (0, _classnames2.default)('ui-calendar__week', this.props.selectable ? 'selectable' : false, this.props.selected ? 'selected' : false, this.props.weekHeader ? 'ui-calendar__week-header' : false)
                },
                this.props.children
            );
        }
    }]);

    return Week;
}(_react2.default.Component);

exports.default = Week;