import _ from 'underscore';
import React from 'react';
import classes from 'classnames';

import Label from '../label';
import '../styles.less';
import './segmented-control.less';

/**
 * Creates a new SegmentedControl.
 * @class SegmentedControl  
 * @extends Component
 * @param {object} props
 * @param {string} props.label The label
 * @param {string} props.placeholder The placholder
 */
export default class SegmentedControl extends React.Component {

    static get contextTypes(){ return{
        onChange: React.PropTypes.func,
    }};

    static defaultProps = {
        options: [],
        label: false,
        value: '',
        disabled:false,
        vAlign: 'center',
        hAlign: 'center',
        layout: 'row',
    }

    constructor(props){
        super(props);
        this.state = {
            focused:false,
            dirty: (_.isUndefined(this.props.dirty))?false:this.props.dirty,
        }


    };

    handleChange(event){
        this.setState({dirty:true});
        if(this.props.onChange){
            this.props.onChange(event.target.value, this);
        }
        if(this.context.onChange){
            this.context.onChange(event.target.value, this);
        }
    };

    handleBlur(event){
        this.setState({dirty:true, focused:false});
        if(this.props.onBlur){
            this.props.onBlur(event);
        }
    };

    handleFocus(event){
        this.setState({focused:true});
        if(this.props.onFocus){
            this.props.onFocus(event);
        }
    };

    /**
     * [handleKeyPress description]
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    handleKeyPress(event){
        this.setState({dirty:true});
        if(this.props.onAction && event.key === 'Enter'){
            this.props.onAction(event.target.value, event, this);
        }
        if(this.props.onKeyPress){
            return this.props.onKeyPress(event.target.value, event, this);
        }
        if(this.context.onChange){
            return this.context.onChange(event.target.value, event, this);
        }
    };

    get value(){
        return this.field.value;
    };

    handleRadioChange(event){
        this.setState({dirty:true});
    };

    // componentWillReceiveProps(nextProps){
    //     console.log(nextProps)
    // }

    /**
     * render
     * @return {ReactElement} markup
     */
    render() {
        
        var props = _.omit(this.props, 'className', 'style', 'required', 'password', 'label');
        props.ref = (node)=>{this.field = node;}
        props.className = classes('field', this.props.selectClassName);
        props.placeholder = this.props.placeholder
        props.type = this.props.type
        props.value = this.props.value || '';
        props.defaultValue = this.props.defaultValue;
        props.onChange = this.handleChange.bind(this);
        props.onBlur = this.handleBlur.bind(this);
        props.onFocus = this.handleFocus.bind(this);

        var select = <select {...props}>
            
        </select>;

        var error = false;
        var errorMessage = null;
        if(this.props.error && (this.props.dirty || this.state.dirty)){
            error = true;
            if(this.props.error){
                errorMessage = <div className={'ui__error-message'}>{this.props.error}</div>
            }
        }

        var isDisabled = this.props.disabled;

        var inlineStyle = {};
        if(this.props.visible == false){
            inlineStyle.display = 'none';
        }

        var currentOption = _.findWhere(this.props.options, {value:this.props.value});

        return <div 
            style={inlineStyle}
            className={classes(
                'ui__segmented-control', 
                {
                    'ui__segmented-control--layout-row': (this.props.layout == 'row'),
                    'ui__segmented-control--layout-column': (this.props.layout == 'column'),
                },
                (isDisabled)?'disabled':false, 
                (error)?'error':false, 
                (this.props.block)?'block':false,
                (this.props.required == true)?'required':false, 
                (this.state.focused == true)?'focused':false, 
                this.props.className)}>
            <Label block text={this.props.label}/>
            <ul className={'ui__segmented-control__group'}>
                {_.map(this.props.options, (optionObj, optionIndex)=>{
                    return <li 
                        key={optionObj.value} 
                        onMouseDown={(event)=>{
                            event.preventDefault();
                            this.setState({focused:true});
                            this.handleFocus();
                        }}
                        className={classes('ui__segmented-control__item', {
                            'ui__segmented-control__item--disabled': (typeof optionObj.disabled && optionObj.disabled == true)?true:false,
                            'ui__segmented-control__item--valign-top': (this.props.vAlign == 'top'),
                            'ui__segmented-control__item--valign-center': (this.props.vAlign == 'center'),
                            'ui__segmented-control__item--valign-bottom': (this.props.vAlign == 'bottom'),
                            'ui__segmented-control__item--halign-left': (this.props.hAlign == 'left'),
                            'ui__segmented-control__item--halign-center': (this.props.hAlign == 'center'),
                            'ui__segmented-control__item--halign-right': (this.props.hAlign == 'right'),
                        },(this.props.value.toString() === optionObj.value.toString())?'active':false)}><label>
                        <input 
                            className={'radio'}
                            checked={(this.props.value && optionObj.value && this.props.value.toString() === optionObj.value.toString())?true:false} 
                            value={optionObj.value} 
                            type={"radio"}
                            onChange={this.handleChange.bind(this)}
                            onBlur={this.handleBlur.bind(this)}
                            onFocus={this.handleFocus.bind(this)}
                            disabled={(typeof optionObj.disabled && optionObj.disabled == true)?true:false}
                            />
                        <span className={classes('dummyLabel')}>{optionObj.label}</span>
                        <span className={classes('labelText')}>{optionObj.label}</span>
                    </label></li>
                })}
            </ul>


         </div>
    };
}