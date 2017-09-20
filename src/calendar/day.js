import _ from 'underscore' 
import React from 'react'
import classNames from 'classnames'

import './styles.less'

export default class Day extends React.Component{
    
    static get defaultProps(){return {
        empty: false,
        text: '',
        label: '',
        date: null,
        onClick: null,
        disabled: false,
    }}

    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event){
        if(this.props.onClick){
            this.props.onClick(this.props.date)
        }
    }

    render(){
        let Tag = 'div'
        if(this.props.selectable){
            Tag = 'button'
        }
        return <Tag 
            role={this.props.selectable?'button':undefined}
            type={this.props.selectable?'button':undefined}
            aria-label={this.props.label || this.props.text}
            title={this.props.label || this.props.text}
            onClick={this.props.selectable?this.handleClick:undefined}
            className={classNames('ui-calendar__day', 
                (this.props.selectable)?'selectable':false, 
                (this.props.today)?'today':false, 
                (this.props.selected)?'selected':false, 
                (this.props.highlighted)?'highlighted':false, 
                (this.props.empty)?'empty':false, 
                (this.props.disabled)?'disabled':false, 
                (this.props.isCurrentMonth)?'current-month':false )}
            >
            <div className={'ui-calendar__day__number-container'}>
                <div className={'ui-calendar__day__number'}>{this.props.text}</div>
            </div>
        </Tag>
    }
}
