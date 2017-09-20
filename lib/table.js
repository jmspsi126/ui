'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('underscore');
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactTransitionGroup = require('react/lib/ReactTransitionGroup');
var Backbone = require('backbone');
var Binding = require('./binding');
var TweenMax = require('gsap');
var classNames = require('classnames');

var Component = require('./component');
var Icon = require('./icon');

/**
 * Creates a Table component.
 * @class
 * @extends Component
 * @param {object} props
 * @param {Backbone.Model} props.collection A Backbone collection to bind to.
 * @param {ColumnHead[]} props.columns An array of ColumnHead objects describing what columns to display.
 * @param {SortMethod} props.sort The default sorting method.
 */

var Table = function (_Component) {
    _inherits(Table, _Component);

    _createClass(Table, null, [{
        key: 'defaultProps',
        get: function get() {
            return {
                baseClass: 'ui-table',
                rowKey: null,
                sort: {
                    order: 'asc'
                }
            };
        }
    }]);

    function Table(props) {
        _classCallCheck(this, Table);

        var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

        _this.state.sort = null;

        return _this;
    }

    _createClass(Table, [{
        key: 'sort',


        // componentWillReceiveProps(newProps){
        //     if(newProps.sort){
        //         this.state.sort = _.extend({
        //             order:'asc'
        //         },newProps.sort);
        //     }
        // };


        // componentDidMount() {
        //     this.boundUpdateListPosition = _.bind(this.updateListPosition,this);
        //     window.addEventListener('scroll', this.boundUpdateListPosition );
        //     window.addEventListener('resize', this.boundUpdateListPosition );
        // };

        value: function sort() {
            if (this.state.sort != null && this.props.sort !== false) {
                var sorted = _(this.getProp('rows')).sortBy(function (item) {
                    if (item instanceof Backbone.Model) {
                        item = item.toJSON();
                    }
                    return item[this.state.sort.attribute];
                }, this);

                if (this.state.sort.order == "dec") {
                    return sorted.reverse();
                } else {
                    return sorted;
                }
            } else {
                return this.getProp('rows');
            }
        }
    }, {
        key: 'handleColumnClick',


        /**
         * handle clicks on column heads
         * @param {SytheticEvent} e
         */
        value: function handleColumnClick(attribute) {

            return function (event) {

                if (this.props.sort === false) {
                    return false;
                }
                var newSort = {
                    attribute: attribute
                };

                if (this.state.sort && this.state.sort.attribute === newSort.attribute) {
                    if (this.state.sort.order == 'asc') {
                        newSort.order = "dec";
                    } else {
                        newSort.order = "asc";
                    }
                } else {
                    newSort.order = "asc";
                }

                this.setState({
                    sort: newSort
                });
            };
        }
    }, {
        key: 'render',


        /**
         * render
         * @return {ReactElement} markup
         */
        value: function render() {

            var columns = null;
            if (this.props.columns) {
                var columnCells = _.map(this.props.columns, function (col) {
                    var classes = "";
                    var icon = "fa fa-chevron-up";
                    if (this.state.sort && this.state.sort.attribute == col.attribute) {
                        classes += " sort";
                        if (this.state.sort.order == 'dec') {
                            icon = "fa fa-chevron-down";
                        }
                    }
                    return React.createElement(
                        'th',
                        { className: classes, key: col.name, 'data-attr': col.attribute, onClick: _.bind(this.handleColumnClick(col.attribute), this) },
                        this.props.sort ? React.createElement(
                            'div',
                            { className: 'sort-icon' },
                            React.createElement(Icon, { name: icon })
                        ) : null,
                        col.name
                    );
                }, this);
                columns = React.createElement(
                    'thead',
                    { key: 'thead' },
                    React.createElement(
                        'tr',
                        null,
                        columnCells
                    )
                );
            }

            var rows = null;
            rows = _.map(this.sort(), function (item, index) {
                var key = null;
                if (item instanceof Backbone.Model) {
                    key = item.cid;
                    item = item.toJSON();
                } else if (item.key || item.id || item.Id) {
                    key = item.key || item.id || item.Id;
                } else {
                    key = index;
                }
                var cells = [];
                _.each(this.props.columns, function (col, index) {
                    cells.push(React.createElement(
                        'td',
                        { key: index, 'data-label': col.name },
                        React.createElement(
                            'div',
                            { className: 'td-wrapper', style: { overflow: "hidden" } },
                            React.createElement(
                                'div',
                                null,
                                item[col.attribute]
                            )
                        )
                    ));
                }, this);
                return React.createElement(
                    TR,
                    { key: key },
                    cells
                );
            }, this);

            return React.createElement(
                'table',
                { className: classNames("ui3-table", this.props.className) },
                columns,
                React.createElement(
                    ReactTransitionGroup,
                    { component: 'tbody' },
                    rows
                )
            );
        }
    }]);

    return Table;
}(Component);

var TR = function (_React$Component) {
    _inherits(TR, _React$Component);

    function TR() {
        _classCallCheck(this, TR);

        return _possibleConstructorReturn(this, (TR.__proto__ || Object.getPrototypeOf(TR)).apply(this, arguments));
    }

    _createClass(TR, [{
        key: 'componentWillEnter',
        value: function componentWillEnter(done) {
            var node = ReactDOM.findDOMNode(this);
            var nodes = $(node).find('.td-wrapper');
            TweenMax.allFrom(nodes, .5, { height: 0, ease: "Expo.easeOut" }, 0, function () {
                $(node).find('.td-wrapper').css('height', 'auto');
                done();
            });
        }
    }, {
        key: 'componentWillLeave',
        value: function componentWillLeave(done) {
            var node = ReactDOM.findDOMNode(this);
            var nodes = $(node).find('.td-wrapper');
            TweenMax.allTo(nodes, .25, { height: 0 }, 0, function () {
                done();
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'tr',
                null,
                this.props.children
            );
        }
    }]);

    return TR;
}(React.Component);

module.exports = Table;