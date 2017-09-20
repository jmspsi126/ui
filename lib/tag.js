'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('underscore');
var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');
var classNames = require('classnames');
var binding = require('./binding');
var color = require('color');

var Component = require('./component');
var Icon = require('./icon');

/**
 * Creates a new Tag component.
 * @class Tag  
 * @extends Component
 * @param {object} props
 * @param {string} props.label The label
 * @param {string} props.placeholder The placholder
 */

var Tag = function (_Component) {
    _inherits(Tag, _Component);

    _createClass(Tag, null, [{
        key: 'defaultProps',
        get: function get() {
            return {};
        }
    }]);

    function Tag(props) {
        _classCallCheck(this, Tag);

        return _possibleConstructorReturn(this, (Tag.__proto__ || Object.getPrototypeOf(Tag)).call(this, props));
    }

    _createClass(Tag, [{
        key: 'handleRemove',
        value: function handleRemove(event) {
            event.preventDefault();
            if (this.props.onRemove) {
                this.props.onRemove(this);
            }
        }
    }, {
        key: 'render',


        /**
         * render
         * @return {ReactElement} markup
         */
        value: function render() {
            return React.createElement(
                'div',
                { className: classNames('ui3-tag', this.props.className) },
                this.props.label,
                React.createElement('div', { className: 'ui3-tag-remove-icon', onClick: _.bind(this.handleRemove, this) })
            );
        }
    }]);

    return Tag;
}(Component);

module.exports = Tag;