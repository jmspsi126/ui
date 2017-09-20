import _ from 'underscore';
import React from 'react';
import classes from 'classnames';

import './styles.less';

/**
 * Creates a new Label.
 */
export default class Label extends React.Component{
    
    static defaultProps = {
        text: false,
        errorMessage: false,
        required: false,
        block: false,
    }

    constructor(props){
        super(props)
    }

    render(){

        return <label 
                className={classes('ui-label', 
                (this.props.block)?'ui-label__block':false, 
                this.props.className)} 
                {..._.omit(this.props, ..._.keys(this.constructor.defaultProps))}
            >
            {this.props.text
                ?<div className={classes('ui-label__text', this.props.textClassName)}>
                    {this.props.text}&nbsp;{this.props.required?<span className={'ui-label__required'}></span>:null}
                    {this.props.errorMessage?this.props.errorMessage:null}
                </div>
                :null
            }
            {this.props.children}
        </label>
    }
}
