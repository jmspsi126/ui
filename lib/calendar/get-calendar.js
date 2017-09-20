'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = get_calendar;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('moment-range');

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calendar,
    endDay,
    firstDay,
    firstWeekDay,
    headerRow,
    i,
    j,
    lastWeekDay,
    len,
    len1,
    month,
    monthRange,
    row,
    startDate,
    week,
    weekRange,
    weeks,
    year,
    indexOf = [].indexOf || function (item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (i in this && this[i] === item) return i;
  }return -1;
};
function get_calendar(year, month) {
  startDate = (0, _moment2.default)([year, month]);
  firstDay = (0, _moment2.default)(startDate).startOf('month');
  endDay = (0, _moment2.default)(startDate).endOf('month');
  monthRange = _moment2.default.range(firstDay, endDay);
  weeks = [];
  monthRange.by('days', function (moment) {
    var ref;
    if (ref = moment.week(), indexOf.call(weeks, ref) < 0) {
      return weeks.push(moment.week());
    }
  });
  calendar = [];
  for (i = 0, len = weeks.length; i < len; i++) {
    week = weeks[i];
    if (i > 0 && week < weeks[i - 1]) {
      // We have switched to the next year
      firstWeekDay = (0, _moment2.default)([year, month]).add(1, "year").week(week).day(0);
      lastWeekDay = (0, _moment2.default)([year, month]).add(1, "year").week(week).day(6);
    } else {
      firstWeekDay = (0, _moment2.default)([year, month]).week(week).day(0);
      lastWeekDay = (0, _moment2.default)([year, month]).week(week).day(6);
    }
    weekRange = _moment2.default.range(firstWeekDay, lastWeekDay);
    calendar.push(weekRange);
  }

  if (calendar.length < 6) {
    _underscore2.default.each(_underscore2.default.range(6 - calendar.length), function () {
      calendar.push([]);
    });
  }

  return calendar;
}