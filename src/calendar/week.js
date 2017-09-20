import _ from 'underscore' 
import React from 'react'
import classNames from 'classnames'

import './styles.less'

export default class Week extends React.Component{
    
    static get defaultProps(){return {
        selectable: true,
    }}

    constructor(props){
        super(props)
    }

    render(){

        let Tag = 'div'
        if(this.props.selectable){
            Tag = 'button'
        }

        return <Tag 
            role={this.props.selectable?'button':undefined}
            type={this.props.selectable?'button':undefined}
            onClick={this.props.onClick}
            className={classNames('ui-calendar__week',  (this.props.selectable)?'selectable':false, (this.props.selected)?'selected':false, (this.props.weekHeader)?'ui-calendar__week-header':false)}
        >
            {this.props.children}
        </Tag>
    }
}
