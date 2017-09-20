'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = VerticalGuides;

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Guide(props) {
    return _react2.default.createElement(
        'div',
        { style: { position: 'relative', paddingTop: '0.5em', paddingBottom: '0.5em' } },
        _react2.default.createElement(
            'div',
            { style: { display: 'inline-block' } },
            ' '
        ),
        _react2.default.createElement(
            'div',
            { style: { display: 'inline-block', verticalAlign: 'baseline' } },
            ' ',
            _react2.default.createElement('div', { style: { position: 'absolute', width: '100%', borderBottom: '1px solid red' } })
        )
    );
}

function VerticalGuides(props) {
    return _react2.default.createElement(
        'div',
        { style: { position: 'relative' } },
        _react2.default.createElement(
            'div',
            { style: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 9999 } },
            _underscore2.default.map(_underscore2.default.range(200), function (index) {
                return _react2.default.createElement(Guide, { key: index });
            })
        ),
        _react2.default.createElement(
            'div',
            { style: { position: 'relative' } },
            props.children
        )
    );
}