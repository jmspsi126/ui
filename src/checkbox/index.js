import _ from 'underscore'
import React from 'react'
import classNames from 'classnames'

import './styles.less'

/**
 * Creates a new Checbox component.
 * @class Checbox  
 * @extends Component
 * @param {object} props
 * @param {string} props.label The label
 * @param {string} props.dirty Whether or not the component is has been interacted with
 */
export default class Checkbox extends React.Component {
    
    static defaultProps = {
        checked: false,
        block: false,
        dirty: false,
        error: false,
        label: "",
    }

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        if(this.props.onChange){
            this.props.onChange(event.target.checked, event)
        }
    }

    /**
     * render
     * @return {ReactElement} markup
     */
    render() {
        return <div className={classNames('ui-checkbox', this.props.block?'ui-checkbox-block':'', this.props.className)}>
            <label className="ui-checkbox__label-wrap">
                <input 
                    {..._.omit(this.props, 'children', 'dangerouslySetInnerHTML', ..._.keys(this.constructor.defaultProps))}
                    className="ui-checkbox__input"
                    type="checkbox"
                    checked={this.props.checked}
                    onChange={this.handleChange}
                /> 
                <div className="ui-checkbox__inside">
                    <div className="ui-checkbox__icon-container">
                        <div className="ui-checkbox__icon"><span></span></div>
                    </div>
                    <div className="ui-checkbox__label">
                        {this.props.label}
                        {this.props.children}
                    </div>
                </div>
            </label>
         </div>
    }
}