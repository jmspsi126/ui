import _ from 'underscore' 
import React from 'react'
import classNames from 'classnames'
import moment from 'moment'
import equal from 'deep-equal'
// import ChevronLeftIcon from 'uml-icons/chevron-left'
// import ChevronRightIcon from 'uml-icons/chevron-right'
//import Icon from 'src/utils/icon'
//
import Week from './week'
import Day from './day'
import getCalendar from './get-calendar'
import './styles.less'

const ChevronLeftIcon = null
const ChevronRightIcon = null


const Icon = (props)=>{
    return null
}

function sameMonth (a, b, other) {
    if (a.month() !== b.month()) {
        return other;
    }
    return a.date();
}

function weeks (m) {
    var lastOfMonth     = m.clone().endOf('month'),
        lastOfMonthDate = lastOfMonth.date(),
        firstOfMonth    = m.clone().startOf('month'),
        currentWeek     = firstOfMonth.clone().day(0),
        output          = [],
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

export default class Calendar extends React.Component{
    
    static defaultProps = {
        date: moment(),
        highlightedDays: {},
        timeframe: 'day',
        onDaySelect: null,
        header: null,
        previousButton: null,
        nextButton: null,
        enabledDates: null,
    }
    
    constructor(props){
        super(props)
        this.state = {
            date: moment(this.props.date),
            month: moment().month(),
            year: moment().year(),
            calendar: getCalendar(moment().year(), moment().month())
        }
        this.handlePreviousMonth = this.handlePreviousMonth.bind(this)
        this.handleNextMonth = this.handleNextMonth.bind(this)
        this.handleDayClick = this.handleDayClick.bind(this)
    }

    getHeader(props){
        const previousButtonProps = {onClick:this.handlePreviousMonth}
        const nextButtonProps = {onClick:this.handleNextMonth}
        return <div className={'ui-calendar__header'}>
            {this.props.previousButton?this.props.previousButton(previousButtonProps):this.getPreviousButton(previousButtonProps)}
            <div className={'ui-calendar__title'}>{props.label}</div>
            {this.props.nextButton?this.props.nextButton(nextButtonProps):this.getNextButton(nextButtonProps)}
        </div>
    }

    getPreviousButton(props){
        return <button type="button" aria-label="Previous Month" title="Previous Month" role="button" className={classNames('ui-calendar__previous-button', props.className)} {...props}>
            <span className={'ui-calendar__previous-button-inside'}><span className={'ui-calendar__default-previous-icon'}/></span>
        </button>
    }

    getNextButton(props){
        return <button type="button" aria-label="Next Month" title="Next Month" role="button" className={classNames('ui-calendar__next-button', props.className)} {...props}>
            <span className={'ui-calendar__next-button-inside'}><span className={'ui-calendar__default-next-icon'}/></span>
        </button>
    }

    componentWillReceiveProps(nextProps){
        var date = moment(nextProps.date || this.props.date)
        this.setState({
            date: date,
            month: date.month(),
            year: date.year(),
            calendar: getCalendar(date.year(), date.month())
        })
    }

    handleNextMonth(e){
        e.preventDefault();
        if (this.state.month == 11){
            var month = 0;
            var year = this.state.year + 1;
        }
        else{
            var month = this.state.month + 1;
            var year = this.state.year;
        }
        this.setState({
            month: month,
            year: year,
            calendar: getCalendar(year, month)
        })
    } 

    handlePreviousMonth(e){
        e.preventDefault();
        if (this.state.month == 0){
            var month = 11;
            var year = this.state.year - 1;
        }
        else {
            var month = this.state.month - 1;
            var year = this.state.year;
        }
        this.setState({
            month: month,
            year: year,
            calendar: getCalendar(year, month)
        })
    }

    handleDayClick(day){
        if(this.props.onDaySelect){
            this.props.onDaySelect(day)
        }
    }

    handleWeekClick(week){
        if(this.props.onWeekSelect){
            this.props.onWeekSelect(week)
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        var should = false
        if(!equal(this.state, nextState)){
            should = true
        }
        if(moment(this.props.date).format('MM-DD-YYYY') !== moment(nextProps.date).format('MM-DD-YYYY')){
            should = true
        }
        if(this.props.timeframe !== nextProps.timeframe){
            should = true
        }
        if(this.props.highlightedDays !== nextProps.highlightedDays){
            should = true
        }
        if(!equal(this.props.enabledDates, nextProps.enabledDates)){
            should = true
        }
        return should
    }

    render(){

        var weekCount = 0;
        var weeks = _.map(this.state.calendar, (week, wi)=>{

            if(_.isArray(week)){
                return <Week selectable={false} key={'empty-'+wi}>
                    <Day empty selectable={false} text={''}/>
                    <Day empty selectable={false} text={''}/>
                    <Day empty selectable={false} text={''}/>
                    <Day empty selectable={false} text={''}/>
                    <Day empty selectable={false} text={''}/>
                    <Day empty selectable={false} text={''}/>
                    <Day empty selectable={false} text={''}/>
                </Week>
            }

            weekCount++;
            var dayList = []
            week.by('days', (day)=>{ dayList.push(day)})
            var days = _.map(dayList, (day, dayIndex)=>{
                var isDisabled = false
                if(this.props.enabledDates){
                    isDisabled = true
                    _.each(this.props.enabledDates, enabledDate=>{
                        if(day.format('MM-DD-YYYY') == moment(enabledDate).format('MM-DD-YYYY')){
                            isDisabled = false
                        }
                    })
                }
                var isCurrentMonth = day.month() == this.state.month
                var isToday = day.format('MM-DD-YYYY') == moment().format('MM-DD-YYYY')
                var isSelected = day.format('MM-DD-YYYY') == this.state.date.format('MM-DD-YYYY')
                var dayClasses = "ui-calendar__day";
                if (!isCurrentMonth){
                    dayClasses += "ui-calendar__day--muted";
                }
                if (isSelected){
                    dayClasses += "ui-calendar__day--selected";
                }
                if (isToday){
                    dayClasses += "today";
                }

                return <Day 
                        disabled={isDisabled}
                        date={day}
                        highlighted={(typeof this.props.highlightedDays[day.format('MM-DD-YYYY')] !== 'undefined')} 
                        isCurrentMonth={isCurrentMonth} 
                        selectable={isDisabled?false:true} 
                        today={isToday} 
                        selected={isSelected && (this.props.timeframe == "day")} 
                        text={day.format('D')} 
                        label={day.format('dddd, MMMM Do YYYY')} 
                        key={dayIndex} 
                        onClick={(this.props.timeframe == "day")?this.handleDayClick:undefined}
                    />

            })

            var weekSelected = (this.props.timeframe == "week" && this.state.date.clone().startOf('week').format('MM-DD-YYYY') == moment(week.start).startOf('week').format('MM-DD-YYYY'))

            return <Week selected={weekSelected} selectable={(this.props.timeframe == "week")} key={moment(week).format('MM-DD-YYYY')+' '+wi}
                onClick={(this.props.timeframe=="week")?this.handleWeekClick.bind(this, moment(week.start).startOf('week')):undefined}
                >
                {days}
            </Week>
        })

        const headerProps = {label:moment().month(this.state.month).year(this.state.year).format('MMMM YYYY')}

        return <div className={'ui-calendar'} {..._.omit(this.props, _.keys(this.constructor.defaultProps))}>
            {this.props.header?this.props.header(headerProps):this.getHeader(headerProps)}
            <Week weekHeader selectable={false}>
                <Day selectable={false} label={'Sunday'} text={'Su'}/>
                <Day selectable={false} label={'Monday'} text={'Mo'}/>
                <Day selectable={false} label={'Tuesday'} text={'Tu'}/>
                <Day selectable={false} label={'Wednesday'} text={'We'}/>
                <Day selectable={false} label={'Thursday'} text={'Th'}/>
                <Day selectable={false} label={'Friday'} text={'Fr'}/>
                <Day selectable={false} label={'Saturday'} text={'Sa'}/>
            </Week>
            {weeks}
        </div>
    }
}
