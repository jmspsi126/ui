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

/**
 * Creates a new Toggle component.
 * @class Toggle  
 * @extends Component
 * @param {object} props
 * @param {string} props.label The label
 * @param {string} props.placeholder The placholder
 */
var Toggle = function (_React$Component) {
    _inherits(Toggle, _React$Component);

    _createClass(Toggle, null, [{
        key: 'defaultProps',
        get: function get() {
            return {
                type: "switch",
                onValue: true,
                offValue: false,
                label: "&nbsp;"
            };
        }
    }]);

    function Toggle(props) {
        _classCallCheck(this, Toggle);

        return _possibleConstructorReturn(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).call(this, props));
    }

    _createClass(Toggle, [{
        key: 'handleChange',
        value: function handleChange(event) {

            /*        if(this.props.type != "radio"){
            
                    }
                    var checked = !this.props.checked;
            
                    var checkedValue;
                    if(checked == true){
                        checkedValue = this.props.onValue;
                    }else{
                        checkedValue = this.props.offValue;
                    }*/

            /*        if(this.props.type != "radio" || (this.props.type == "radio" && checked == true)){
                        this.setProp('checked', checkedValue);
                        this.setState({checked:checked})
                    }*/

            if (this.props.onChange) {
                this.props.onChange({
                    value: this.props.value,
                    checked: event.target.checked,
                    context: this
                });
            }
        }
    }, {
        key: 'render',


        /**
         * render
         * @return {ReactElement} markup
         */
        value: function render() {

            var type = "checkbox";
            if (this.props.type == "radio") {
                type = "radio";
            }

            // element
            var toggle = _react2.default.createElement('input', {
                name: this.props.name,
                value: this.props.value,
                type: type,
                placeholder: this.props.placeholder,
                checked: this.props.checked,
                onChange: this.handleChange.bind(this) });

            var label = _react2.default.createElement(
                'label',
                null,
                toggle,
                _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: this.props.label || ' ' } }),
                this.props.type == "checkbox" ? _react2.default.createElement('span', { className: 'ui-toggle-icon' }) : null
            );

            var iconLeft = null;
            if (this.props.iconLeft) {
                iconLeft = _react2.default.createElement(Icon, { className: 'ui-icon left', name: this.props.iconLeft });
            }

            var iconRight = null;
            if (this.props.iconRight) {
                iconRight = _react2.default.createElement(Icon, { className: 'ui-icon right', name: this.props.iconRight });
            }

            return _react2.default.createElement(
                'div',
                { id: this.id, className: (0, _classnames2.default)('ui3 toggle ui-toggle-style-' + this.props.type, this.props.className) },
                iconLeft,
                iconRight,
                label
            );
        }
    }]);

    return Toggle;
}(_react2.default.Component);

exports.default = Toggle;