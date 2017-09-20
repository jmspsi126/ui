'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('underscore');
var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');
var classNames = require('classnames');
var binding = require('./binding');
var utils = require('react-backbone-binding/utils');
var color = require('color');
var lunr = require('lunr');

var Component = require('./component');
var Icon = require('./icon');
var Tag = require('./tag');

/**
 * Creates a new Tags component.
 * @class Tags  
 * @extends Component
 * @param {object} props
 * @param {string} props.label The label
 * @param {string} props.placeholder The placholder
 */

var Tags = function (_Component) {
    _inherits(Tags, _Component);

    _createClass(Tags, null, [{
        key: 'stringToTag',
        value: function stringToTag(string) {
            return { label: string, value: string };
        }
    }, {
        key: 'isTag',
        value: function isTag(tag) {
            return typeof tag.label !== 'undefined' && typeof tag.value !== 'undefined';
        }
    }, {
        key: 'defaultProps',
        get: function get() {
            return {
                allowSpaces: false,
                list: [],
                tags: [],
                restrictToList: false,
                stopWordFilter: true
            };
        }
    }]);

    function Tags(props) {
        _classCallCheck(this, Tags);

        var _this = _possibleConstructorReturn(this, (Tags.__proto__ || Object.getPrototypeOf(Tags)).call(this, props));

        _this.backspaceRemoveTag = false;
        _this.node = null;
        _this.listElement = null;
        _this.listItem = null;
        _this.listItemTag = null;
        _this.state = {
            tags: [],
            listIndex: 0,
            lastListInteration: 'key',
            focused: false,
            matchedList: null,
            showList: false,
            dirty: _.isUndefined(_this.props.dirty) ? false : _this.props.dirty
        };
        _this.initIndex(utils.resolveProps(_this.props));
        return _this;
    }

    _createClass(Tags, [{
        key: 'initIndex',
        value: function initIndex(props) {
            if (typeof props.list != 'undefined' && props.list.length) {

                this.index = lunr(function () {
                    if (props.stopWordFilter == false || props.restrictToList == true && _.isFunction(props.stopWordFilter) == false) {
                        this.pipeline.remove(_.findWhere(this.pipeline._stack, { label: "stopWordFilter" }));
                    } else if (_.isFunction(props.stopWordFilter)) {
                        this.pipeline.add(props.stopWordFilter);
                    }
                    this.field('label');
                });

                _.each(props.list, function (listTag) {

                    if (Tags.isTag(listTag) == false) {
                        listTag = Tags.stringToTag(listTag);
                    }

                    this.index.add({
                        id: listTag.value,
                        label: listTag.label
                    });
                }, this);
            } else {
                this.index = null;
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            newProps = utils.resolveProps(newProps);
            this.initIndex(newProps);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.boundUpdateListPosition = _.bind(this.updateListPosition, this);
            window.addEventListener('scroll', this.boundUpdateListPosition);
            window.addEventListener('resize', this.boundUpdateListPosition);
        }
    }, {
        key: 'updateListPosition',
        value: function updateListPosition() {

            if (typeof this.node === 'undefined' || this.node === null) {
                return false;
            }

            var posRect = this.node.getBoundingClientRect();
            var listRect = this.listElement.getBoundingClientRect();

            //show on bottom
            if (listRect.height + posRect.top + posRect.height < window.outerHeight) {
                this.listElement.style.top = posRect.top + posRect.height + 'px';
                this.listElement.style.width = posRect.width + 'px';

                //show on top
            } else {
                    // this.listElement.style.top = (posRect.top - listRect.height)+'px';
                }

            this.listElement.style.width = posRect.width + 'px';
        }
    }, {
        key: 'updateListScroll',
        value: function updateListScroll() {
            if (this.listItem != null) {
                var scrollTop = this.listElement.scrollTop;
                if (this.listItem.offsetTop < scrollTop) {
                    this.listElement.scrollTop = this.listItem.offsetTop;
                } else if (this.listItem.offsetTop + this.listItem.offsetHeight > scrollTop + this.listElement.offsetHeight) {
                    this.listElement.scrollTop = this.listItem.offsetTop + this.listItem.offsetHeight - this.listElement.offsetHeight;
                }
            }
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(event) {
            this.listItem = null;
            this.listItemTag = null;
            this.setState({
                focused: true,
                listIndex: 0,
                lastListInteration: 'key',
                matchedList: null,
                showList: true
            });
            if (this.index) {
                this.searchIndex();
            }
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(event) {
            this.handleTagAdd(event.target.value.trim());
            this.setState({
                dirty: true,
                focused: false,
                matchedList: null,
                listIndex: 0,
                lastListInteration: 'key'
            });
        }
    }, {
        key: 'handleKeyUp',
        value: function handleKeyUp(event) {

            var keyCode = event.nativeEvent.which || event.nativeEvent.keyCode;
            if (keyCode == 32 && this.props.allowSpaces == false) {
                // space, add tag
                event.stopPropagation();
                event.preventDefault();
                this.input.value = "";
            }

            if (event.target.value == "") {
                this.backspaceRemoveTag = true;
            } else {
                this.backspaceRemoveTag = false;
            }

            if (this.state.dirty == false) {
                this.setState({ dirty: true });
            }

            if (this.index) {
                this.searchIndex();
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {

            var keyCode = event.nativeEvent.which || event.nativeEvent.keyCode;

            this.setState({
                showList: !(keyCode == 27)
            });

            if (keyCode == 13) {
                // enter
                if (this.state.lastListInteration == 'key' && this.listItemTag != null) {
                    this.handleTagAdd(this.listItemTag);
                } else {
                    this.handleTagAdd(event.target.value.trim());
                }
            } else if (keyCode == 32 && this.props.allowSpaces == false) {
                // space

                console.log('space');
                if (this.state.lastListInteration == 'key' && this.listItemTag != null) {
                    this.handleTagAdd(this.listItemTag);
                } else {
                    event.preventDefault();
                    this.handleTagAdd(event.target.value.trim());
                }
            } else if (keyCode == 8 && event.target.value == "" && this.backspaceRemoveTag == true) {
                // backspace, remove last tag

                var newTags = _.uniq(this.getTags());
                newTags.pop();
                this.backspaceRemoveTag = false;
                //this.setState({tags:newTags});
                var tags = this.getTags();
                this.handleTagRemove(tags[tags.length - 1]);
                this.setProp("tags", newTags);

                // down
            } else if (keyCode === 40 && typeof this.getProp('list') != 'undefined' && this.getProp('list') != null && this.getList().length) {

                var list = this.getList();
                if (this.state.listIndex == null) {
                    this.state.listIndex = -1;
                }
                var nextIndex = this.state.listIndex + 1;
                if (nextIndex >= list.length) {
                    nextIndex = list.length - 1;
                }
                this.setState({
                    listIndex: nextIndex,
                    lastListInteration: 'key'
                });
                event.preventDefault();

                // up
            } else if (keyCode === 38 && this.state.listIndex != null && typeof this.getProp('list') != 'undefined' && this.getProp('list') != null && this.getList().length) {

                var nextIndex = this.state.listIndex - 1;
                if (nextIndex < 0) {
                    nextIndex = 0;
                }

                this.setState({
                    listIndex: nextIndex,
                    lastListInteration: 'key'
                });
                event.preventDefault();
            } else {
                this.setState({
                    listIndex: 0,
                    lastListInteration: 'key'
                });
            }

            if (this.state.dirty == false) {
                this.setState({ dirty: true });
            }

            if (this.index) {
                this.searchIndex();
            }
        }
    }, {
        key: 'searchIndex',
        value: function searchIndex() {

            var tags = this.getTags();
            var matchedList = [];
            _.each(this.index.search(this.input.value), function (item) {
                if (typeof item !== 'undefined' && typeof _.findWhere(tags, { value: item.ref }) == 'undefined') {
                    matchedList.push(item);
                }
            }, this);
            //if(matchedList.length == 0 || this.input.value == ""){
            if (this.input.value == "") {
                matchedList = null;
            }

            this.setState({ matchedList: matchedList });

            if (matchedList != null && matchedList.length && this.state.listIndex == null) {
                this.setState({
                    listIndex: 0,
                    lastListInteration: 'key'
                });
            } else if (matchedList != null && matchedList.length == 0) {
                this.listItemTag = null;
                this.setState({
                    listIndex: null,
                    lastListInteration: 'key'
                });
            } else if (matchedList == null) {
                this.setState({
                    lastListInteration: 'key'
                });
            }
        }
    }, {
        key: 'handleTagAdd',
        value: function handleTagAdd(tag) {

            if (Tags.isTag(tag) == false) {
                tag = Tags.stringToTag(tag);
            }
            if (tag.value.trim() == "") {
                return false;
            }

            if (this.props.restrictToList == true) {
                if (typeof _.findWhere(this.props.list, tag) === 'undefined') {
                    return false;
                }
                if (this.state.matchedList !== null && this.state.matchedList.length == 0) {
                    return false;
                }
            }

            var currentTagMatches = _.filter(this.getTags(), function (v) {
                if (v.value.toString().toLowerCase() === tag.value.toLowerCase().trim()) {
                    return v;
                }
            });

            if (currentTagMatches.length) {
                return false;
            }

            this.input.value = "";

            var newTags = _.uniq(this.getTags().concat(tag));
            this.setState({
                listIndex: 0,
                lastListInteration: 'key',
                showList: true
            });
            this.listItemTag = null;
            if (this.props.handleAdd) {
                this.props.handleAdd(tag);
            }
            this.setProp("tags", newTags);
        }
    }, {
        key: 'handleTagRemove',
        value: function handleTagRemove(tag) {
            this.setState({
                listIndex: 0,
                lastListInteration: 'key',
                showList: true
            });
            if (this.props.handleRemove) {
                this.props.handleRemove(tag);
            }
            this.setProp("tags", _.without(this.getTags(), tag));
        }
    }, {
        key: 'handleInputClick',
        value: function handleInputClick() {
            this.setState({
                showList: true
            });
        }
    }, {
        key: 'render',


        /**
         * render
         * @return {ReactElement} markup
         */
        value: function render() {
            var _this2 = this;

            var input = React.createElement('input', _defineProperty({
                ref: function ref(el) {
                    _this2.input = el;
                },
                placeholder: this.props.placeholder,
                onKeyUp: this.handleKeyUp.bind(this),
                onClick: this.handleInputClick.bind(this),
                onKeyDown: this.handleKeyDown.bind(this),
                onBlur: this.handleBlur.bind(this),
                onFocus: this.handleFocus.bind(this)
            }, 'onBlur', this.handleBlur.bind(this)));

            var iconLeft = null;
            if (this.props.iconLeft) {
                iconLeft = React.createElement(Icon, { className: 'ui-icon left', name: this.props.iconLeft });
            }

            var iconRight = null;
            if (this.props.iconRight) {
                iconRight = React.createElement(Icon, { className: 'ui-icon right', name: this.props.iconRight });
            }

            var error = false;
            var errorMessage = null;
            if (this.getProp('error') && this.state.dirty) {
                error = true;
                if (this.getProp('error')) {
                    errorMessage = React.createElement(
                        'div',
                        { className: 'ui3-error-message' },
                        this.getProp('error')
                    );
                }
            }

            var label = null;
            if (typeof this.props.label != 'undefined') {
                label = React.createElement(
                    'div',
                    { className: 'label' },
                    this.props.label
                );
            }

            var tags = [];
            _.each(this.getTags(), function (tag, index) {
                var _this3 = this;

                tags.push(React.createElement(Tag, { key: index, label: tag.label, onRemove: function onRemove() {
                        _this3.handleTagRemove(tag);
                    } }));
            }, this);

            var list = [];
            var listItems = this.getList();

            _.each(listItems, function (listTag, index) {
                var _this4 = this;

                if (Tags.isTag(listTag) == false) {
                    listTag = Tags.stringToTag(listTag);
                }

                if (listTag.selectable == false) {
                    list.push(React.createElement('li', { className: classNames('unselectable'), key: listTag.value, onMouseDown: _.bind(function (event) {}, this), dangerouslySetInnerHTML: { __html: listTag.label } }));
                } else {
                    list.push(React.createElement('li', { className: classNames({ 'active': this.state.listIndex === index }), key: listTag.value, onMouseOver: function onMouseOver(event) {
                            _this4.listItem = null;
                            _this4.listItemTag = null;
                            _this4.setState({
                                listIndex: index,
                                lastListInteration: 'mouse'
                            });
                        }, onMouseDown: function onMouseDown(event) {
                            event.stopPropagation();
                            event.preventDefault();
                            _this4.handleTagAdd(listTag);
                        }, ref: function ref(el) {
                            if (_this4.state.listIndex === index) {
                                _this4.listItem = el;
                                _this4.listItemTag = listTag;
                            }
                        }, dangerouslySetInnerHTML: { __html: listTag.label } }));
                }
            }, this);

            var showList = this.state.showList && this.state.focused && (this.props.restrictToList || listItems.length);
            if (listItems.length == 0) {
                showList = false;
            }
            var listContainer = React.createElement(
                'ul',
                { className: 'ui3-tags-list', style: { display: showList ? 'block' : 'none' }, ref: _.bind(function (el) {
                        this.listElement = el;
                    }, this) },
                list
            );

            return React.createElement(
                'div',
                { id: this.props.id, className: classNames('ui3 tags', { 'ui3-error': error }, { 'ui3-focus': this.state.focused }, this.props.className) },
                React.createElement(
                    'label',
                    { className: 'ui3-inside' },
                    label,
                    React.createElement(
                        'div',
                        { className: 'ui3-tags-inside', ref: function ref(el) {
                                _this2.node = el;
                            } },
                        tags,
                        input
                    ),
                    listContainer
                ),
                errorMessage
            );
        }
    }, {
        key: 'getList',
        value: function getList() {
            var list = [];
            var tags = this.getTags();
            var inputValue = '';
            if (this.input) {
                inputValue = this.input.value;
            } else {
                return [];
            }

            if (this.state.matchedList != null) {
                _.each(this.state.matchedList, function (result) {
                    var tag = _.findWhere(this.props.list, { value: result.ref });
                    if (typeof tag !== 'undefined' && typeof _.findWhere(tags, tag) === 'undefined') {
                        list.push(tag);
                    }
                }, this);

                var currentTagMatches = _.filter(tags, function (v) {
                    if (v.value.toString().toLowerCase() === inputValue.toLowerCase().trim()) {
                        return v;
                    }
                });
                if (this.state.matchedList.length == 0 && _typeof(currentTagMatches.length) >= 1) {
                    list.push({ label: 'No matches for <strong><em>' + inputValue + '</em></strong>', value: null, selectable: false });
                }
            } else {
                list = [];
                _.each(this.getProp("list"), function (tag) {
                    if (typeof _.findWhere(tags, tag) === 'undefined') {
                        list.push(tag);
                    }
                }, this);
            }
            return list;
        }
    }, {
        key: 'getTags',
        value: function getTags() {
            return _.map(this.getProp('tags'), function (tag) {
                if (Tags.isTag(tag) == true) {
                    return tag;
                } else {
                    return Tags.stringToTag(tag);
                }
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.updateListPosition();
            if (this.state.lastListInteration == 'key') {
                this.updateListScroll();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _get(Tags.prototype.__proto__ || Object.getPrototypeOf(Tags.prototype), 'componentWillUnmount', this).call(this);
            window.removeEventListener('scroll', this.boundUpdateListPosition);
            window.removeEventListener('resize', this.boundUpdateListPosition);
        }
    }]);

    return Tags;
}(Component);

module.exports = Tags;