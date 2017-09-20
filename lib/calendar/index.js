'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _week = require('./week');

var _week2 = _interopRequireDefault(_week);

var _day = require('./day');

var _day2 = _interopRequireDefault(_day);

var _getCalendar = require('./get-calendar');

var _getCalendar2 = _interopRequireDefault(_getCalendar);

require('./styles.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import ChevronLeftIcon from 'uml-icons/chevron-left'
// import ChevronRightIcon from 'uml-icons/chevron-right'
//import Icon from 'src/utils/icon'
//


var ChevronLeftIcon = null;
var ChevronRightIcon = null;

var Icon = function Icon(props) {
    return null;
};

function sameMonth(a, b, other) {
    if (a.month() !== b.month()) {
        return other;
    }
    return a.date();
}

function weeks(m) {
    var lastOfMonth = m.clone().endOf('month'),
        lastOfMonthDate = lastOfMonth.date(),
        firstOfMonth = m.clone().startOf('month'),
        currentWeek = firstOfMonth.clone().day(0),
        output = [],
        startOfWeek,
        endOfWeek;

    while (currentWeek < lastOfMonth) {
        startOfWeek = sameMonth(currentWeek.clone().day(0), firstOfMonth, 1);
        endOfWeek = sameMonth(currentWeek.clone().day(6), firstOfMonth, lastOfMonthDate);

        output.push(startOfWeek + '-' + endOfWeek);
        currentWeek.add('d', 7);
    }

    return output;
}

var Calendar = function (_React$Component) {
    _inherits(Calendar, _React$Component);

    function Calendar(props) {
        _classCallCheck(this, Calendar);

        var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

        _this.state = {
            date: (0, _moment2.default)(_this.props.date),
            month: (0, _moment2.default)().month(),
            year: (0, _moment2.default)().year(),
            calendar: (0, _getCalendar2.default)((0, _moment2.default)().year(), (0, _moment2.default)().month())
        };
        _this.handlePreviousMonth = _this.handlePreviousMonth.bind(_this);
        _this.handleNextMonth = _this.handleNextMonth.bind(_this);
        _this.handleDayClick = _this.handleDayClick.bind(_this);
        return _this;
    }

    _createClass(Calendar, [{
        key: 'getHeader',
        value: function getHeader(props) {
            var previousButtonProps = { onClick: this.handlePreviousMonth };
            var nextButtonProps = { onClick: this.handleNextMonth };
            return _react2.default.createElement(
                'div',
                { className: 'ui-calendar__header' },
                this.props.previousButton ? this.props.previousButton(previousButtonProps) : this.getPreviousButton(previousButtonProps),
                _react2.default.createElement(
                    'div',
                    { className: 'ui-calendar__title' },
                    props.label
                ),
                this.props.nextButton ? this.props.nextButton(nextButtonProps) : this.getNextButton(nextButtonProps)
            );
        }
    }, {
        key: 'getPreviousButton',
        value: function getPreviousButton(props) {
            return _react2.default.createElement(
                'button',
                _extends({ type: 'button', 'aria-label': 'Previous Month', title: 'Previous Month', role: 'button', className: (0, _classnames2.default)('ui-calendar__previous-button', props.className) }, props),
                _react2.default.createElement(
                    'span',
                    { className: 'ui-calendar__previous-button-inside' },
                    _react2.default.createElement('span', { className: 'ui-calendar__default-previous-icon' })
                )
            );
        }
    }, {
        key: 'getNextButton',
        value: function getNextButton(props) {
            return _react2.default.createElement(
                'button',
                _extends({ type: 'button', 'aria-label': 'Next Month', title: 'Next Month', role: 'button', className: (0, _classnames2.default)('ui-calendar__next-button', props.className) }, props),
                _react2.default.createElement(
                    'span',
                    { className: 'ui-calendar__next-button-inside' },
                    _react2.default.createElement('span', { className: 'ui-calendar__default-next-icon' })
                )
            );
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var date = (0, _moment2.default)(nextProps.date || this.props.date);
            this.setState({
                date: date,
                month: date.month(),
                year: date.year(),
                calendar: (0, _getCalendar2.default)(date.year(), date.month())
            });
        }
    }, {
        key: 'handleNextMonth',
        value: function handleNextMonth(e) {
            e.preventDefault();
            if (this.state.month == 11) {
                var month = 0;
                var year = this.state.year + 1;
            } else {
                var month = this.state.month + 1;
                var year = this.state.year;
            }
            this.setState({
                month: month,
                year: year,
                calendar: (0, _getCalendar2.default)(year, month)
            });
        }
    }, {
        key: 'handlePreviousMonth',
        value: function handlePreviousMonth(e) {
            e.preventDefault();
            if (this.state.month == 0) {
                var month = 11;
                var year = this.state.year - 1;
            } else {
                var month = this.state.month - 1;
                var year = this.state.year;
            }
            this.setState({
                month: month,
                year: year,
                calendar: (0, _getCalendar2.default)(year, month)
            });
        }
    }, {
        key: 'handleDayClick',
        value: function handleDayClick(day) {
            if (this.props.onDaySelect) {
                this.props.onDaySelect(day);
            }
        }
    }, {
        key: 'handleWeekClick',
        value: function handleWeekClick(week) {
            if (this.props.onWeekSelect) {
                this.props.onWeekSelect(week);
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            var should = false;
            if (!(0, _deepEqual2.default)(this.state, nextState)) {
                should = true;
            }
            if ((0, _moment2.default)(this.props.date).format('MM-DD-YYYY') !== (0, _moment2.default)(nextProps.date).format('MM-DD-YYYY')) {
                should = true;
            }
            if (this.props.timeframe !== nextProps.timeframe) {
                should = true;
            }
            if (this.props.highlightedDays !== nextProps.highlightedDays) {
                should = true;
            }
            if (!(0, _deepEqual2.default)(this.props.enabledDates, nextProps.enabledDates)) {
                should = true;
            }
            return should;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var weekCount = 0;
            var weeks = _underscore2.default.map(this.state.calendar, function (week, wi) {

                if (_underscore2.default.isArray(week)) {
                    return _react2.default.createElement(
                        _week2.default,
                        { selectable: false, key: 'empty-' + wi },
                        _react2.default.createElement(_day2.default, { empty: true, selectable: false, text: '' }),
                        _react2.default.createElement(_day2.default, { empty: true, selectable: false, text: '' }),
                        _react2.default.createElement(_day2.default, { empty: true, selectable: false, text: '' }),
                        _react2.default.createElement(_day2.default, { empty: true, selectable: false, text: '' }),
                        _react2.default.createElement(_day2.default, { empty: true, selectable: false, text: '' }),
                        _react2.default.createElement(_day2.default, { empty: true, selectable: false, text: '' }),
                        _react2.default.createElement(_day2.default, { empty: true, selectable: false, text: '' })
                    );
                }

                weekCount++;
                var dayList = [];
                week.by('days', function (day) {
                    dayList.push(day);
                });
                var days = _underscore2.default.map(dayList, function (day, dayIndex) {
                    var isDisabled = false;
                    if (_this2.props.enabledDates) {
                        isDisabled = true;
                        _underscore2.default.each(_this2.props.enabledDates, function (enabledDate) {
                            if (day.format('MM-DD-YYYY') == (0, _moment2.default)(enabledDate).format('MM-DD-YYYY')) {
                                isDisabled = false;
                            }
                        });
                    }
                    var isCurrentMonth = day.month() == _this2.state.month;
                    var isToday = day.format('MM-DD-YYYY') == (0, _moment2.default)().format('MM-DD-YYYY');
                    var isSelected = day.format('MM-DD-YYYY') == _this2.state.date.format('MM-DD-YYYY');
                    var dayClasses = "ui-calendar__day";
                    if (!isCurrentMonth) {
                        dayClasses += "ui-calendar__day--muted";
                    }
                    if (isSelected) {
                        dayClasses += "ui-calendar__day--selected";
                    }
                    if (isToday) {
                        dayClasses += "today";
                    }

                    return _react2.default.createElement(_day2.default, {
                        disabled: isDisabled,
                        date: day,
                        highlighted: typeof _this2.props.highlightedDays[day.format('MM-DD-YYYY')] !== 'undefined',
                        isCurrentMonth: isCurrentMonth,
                        selectable: isDisabled ? false : true,
                        today: isToday,
                        selected: isSelected && _this2.props.timeframe == "day",
                        text: day.format('D'),
                        label: day.format('dddd, MMMM Do YYYY'),
                        key: dayIndex,
                        onClick: _this2.props.timeframe == "day" ? _this2.handleDayClick : undefined
                    });
                });

                var weekSelected = _this2.props.timeframe == "week" && _this2.state.date.clone().startOf('week').format('MM-DD-YYYY') == (0, _moment2.default)(week.start).startOf('week').format('MM-DD-YYYY');

                return _react2.default.createElement(
                    _week2.default,
                    { selected: weekSelected, selectable: _this2.props.timeframe == "week", key: (0, _moment2.default)(week).format('MM-DD-YYYY') + ' ' + wi,
                        onClick: _this2.props.timeframe == "week" ? _this2.handleWeekClick.bind(_this2, (0, _moment2.default)(week.start).startOf('week')) : undefined
                    },
                    days
                );
            });

            var headerProps = { label: (0, _moment2.default)().month(this.state.month).year(this.state.year).format('MMMM YYYY') };

            return _react2.default.createElement(
                'div',
                _extends({ className: 'ui-calendar' }, _underscore2.default.omit(this.props, _underscore2.default.keys(this.constructor.defaultProps))),
                this.props.header ? this.props.header(headerProps) : this.getHeader(headerProps),
                _react2.default.createElement(
                    _week2.default,
                    { weekHeader: true, selectable: false },
                    _react2.default.createElement(_day2.default, { selectable: false, label: 'Sunday', text: 'Su' }),
                    _react2.default.createElement(_day2.default, { selectable: false, label: 'Monday', text: 'Mo' }),
                    _react2.default.createElement(_day2.default, { selectable: false, label: 'Tuesday', text: 'Tu' }),
                    _react2.default.createElement(_day2.default, { selectable: false, label: 'Wednesday', text: 'We' }),
                    _react2.default.createElement(_day2.default, { selectable: false, label: 'Thursday', text: 'Th' }),
                    _react2.default.createElement(_day2.default, { selectable: false, label: 'Friday', text: 'Fr' }),
                    _react2.default.createElement(_day2.default, { selectable: false, label: 'Saturday', text: 'Sa' })
                ),
                weeks
            );
        }
    }]);

    return Calendar;
}(_react2.default.Component);

Calendar.defaultProps = {
    date: (0, _moment2.default)(),
    highlightedDays: {},
    timeframe: 'day',
    onDaySelect: null,
    header: null,
    previousButton: null,
    nextButton: null,
    enabledDates: null
};
exports.default = Calendar;