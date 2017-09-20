import moment from 'moment'
import 'moment-range'
import _ from 'underscore'

var calendar, endDay, firstDay, firstWeekDay, headerRow, i, j, lastWeekDay, len, len1, month, monthRange, row, startDate, week, weekRange, weeks, year,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
export default function get_calendar(year, month){
    startDate = moment([year, month]);
    firstDay = moment(startDate).startOf('month');
    endDay = moment(startDate).endOf('month');
    monthRange = moment.range(firstDay, endDay);
    weeks = [];
    monthRange.by('days', function(moment) {
      var ref;
      if (ref = moment.week(), indexOf.call(weeks, ref) < 0) {
        return weeks.push(moment.week());
      }
    });
    calendar = [];
    for (i = 0, len = weeks.length; i < len; i++) {
      week = weeks[i];
      if (i > 0 && week < weeks[i-1]){
        // We have switched to the next year
        firstWeekDay = moment([year, month]).add(1, "year").week(week).day(0);
        lastWeekDay = moment([year, month]).add(1, "year").week(week).day(6);
      }
      else{
        firstWeekDay = moment([year, month]).week(week).day(0);
        lastWeekDay = moment([year, month]).week(week).day(6);
      }
      weekRange = moment.range(firstWeekDay, lastWeekDay);
      calendar.push(weekRange);
    }

    if(calendar.length < 6){
        _.each(_.range(6 - calendar.length), ()=>{
            calendar.push([])
        })
    }
    
    return calendar;
}