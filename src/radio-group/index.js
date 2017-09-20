import _ from 'underscore';
import React from 'react';
import classes from 'classnames';

import Label from '../label';
import '../styles.less';
import './radio-group.less';

var styles = {}
var commonStyles = {}

/**
 * Creates a new RadioGroup.
 * @class RadioGroup  
 * @extends Component
 * @param {object} props
 * @param {string} props.label The label
 * @param {string} props.placeholder The placholder
 */
export default class RadioGroup extends React.Component {

    static styles = styles;

    static defaultProps = {
        options:[],
        label: null,
        disabled: false,
        value:'',
    }

    constructor(props){
        super(props);
        this.state = {
            focused:false,
            dirty: (_.isUndefined(this.props.dirty))?false:this.props.dirty
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
        console.log(event.currentTarget.value);
        this.setState({dirty:true});
        
    };

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
                errorMessage = <div className={'ui__errorMessage'}>{this.props.error}</div>
            }
        }

        var isDisabled = this.props.disabled;

        var label = null;
        if(typeof this.props.label != 'undefined'){
            label = <div className={'label'}>{this.props.label}</div>
        }

        var inlineStyle = {};
        if(this.props.visible == false){
            inlineStyle.display = 'none';
        }

        var currentOption = _.findWhere(this.props.options, {value:this.props.value});

        return (<div 
            id={this.props.id} 
            style={inlineStyle}
            className={classes(
                'ui-radio-group', 
                (isDisabled)?'disabled':false, 
                (error)?'error':false, 
                (this.props.block)?'block':false,
                (this.props.required == true)?'required':false, 
                (this.state.focused == true)?'focused':false, 
                this.props.className)}>

            <fieldset className={'fieldset'}> 
                <legend className={'legend'}>
                    <Label text={this.props.label}/>
                    {errorMessage}
                </legend> 
                <ul className={'group'}> 
                    {_.map(this.props.options, (optionObj)=>{
                        return <li key={optionObj.value}><label>
                            <input 
                                disabled={this.props.disabled}
                                className={'radio'}
                                checked={this.props.value.toString() === optionObj.value.toString()} 
                                value={optionObj.value} 
                                type={"radio"}
                                onChange={this.handleChange.bind(this)}
                                onFocus={this.handleFocus.bind(this)}
                                onBlur={this.handleBlur.bind(this)}
                                />
                            <span className={classes('labelText')}>{optionObj.label}</span>
                            <span className={'indicatorContainer'}>
                                <span className={classes('indicator', (this.props.value.toString() === optionObj.value.toString())?'active':false)}/>
                            </span>
                        </label></li>
                    })}
                </ul> 
            </fieldset> 


         </div>);
    };
}