'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ErrorMessage;

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./styles.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new Error Message.
 */
function ErrorMessage() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return _react2.default.createElement(
        'div',
        { className: 'ui__error-message' },
        _react2.default.createElement(
            'div',
            { className: 'ui__error-message__icon' },
            _react2.default.createElement(
                'span',
                null,
                '!'
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'ui__error-message__text' },
            props.children
        )
    );
}