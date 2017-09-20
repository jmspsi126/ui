import _ from 'underscore';
import React from 'react';
import classes from 'classnames';

import Label from '../label';
import commonStyles from '../styles.less';
import ErrorMessage from '../error-message'
import './select-field.less';
import '../text-field/text-field.less';

/**
 * Creates a new Select.
 * @class Select  
 * @extends Component
 * @param {object} props
 * @param {string} props.label The label
 * @param {string} props.placeholder The placholder
 */
class Select extends React.Component {

    static get contextTypes(){ return{
        onChange: React.PropTypes.func,
    }};

    static get defaultProps(){
        return {
            options:[],
            label:undefined,
            value:'',
        }
    };

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

    /**
     * render
     * @return {ReactElement} markup
     */
    render() {
        
        var props = _.pick(this.props, 'required', 'password', 'name', );
        props.ref = (node)=>{this.field = node;}
        props.className = classes('ui-select-field__field', this.props.selectClassName);
        props.placeholder = this.props.placeholder
        props.type = this.props.type
        props.value = this.props.value || '';
        props.defaultValue = this.props.defaultValue;
        props.onChange = this.handleChange.bind(this);
        props.onBlur = this.handleBlur.bind(this);
        props.onFocus = this.handleFocus.bind(this);

        var select = <select {...props}>
            {_.map(this.props.options, (optionObj)=>{
                return <option key={optionObj.value} value={optionObj.value}>{optionObj.label}</option>
            })}
        </select>;

        var error = false
        var errorMessage = null
        if(this.props.error && (this.props.dirty || this.state.dirty)){
            error = true
            if(this.props.error){
                errorMessage = <ErrorMessage>{this.props.error}</ErrorMessage>
            }
        }

        var isDisabled = this.props.disabled;

        var inlineStyle = {...this.props.style};
        if(this.props.visible == false){
            inlineStyle.display = 'none';
        }

        var currentOption = _.findWhere(this.props.options, {value:this.props.value});

        return (<div 
            id={this.props.id} 
            style={inlineStyle}
            className={classes(
                'ui-select-field', 
                (isDisabled)?'disabled':false, 
                (error)?'error':false, 
                (this.props.block)?'block':false,
                (this.props.required == true)?'required':false, 
                (this.state.focused == true)?'focused':false, 
                this.props.className)}>

            <Label block text={this.props.label} errorMessage={errorMessage} required={this.props.required}> 
                <div className={'ui-select-field__fieldContainer'}>
                    {select}
                    <input tabIndex={0} className={classes('ui-text-field__field', 'ui-select-field__dummyInput')} type="text" readOnly value={(typeof currentOption !== 'undefined')?currentOption.label:''}/>
                    <div className={'ui-select-field__dropDownIndicator'}/>
                    <div className={'ui-select-field__fieldFrame'}/>
                </div>
            </Label>

         </div>);
    };
}
export default Select;