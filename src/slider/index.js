import _ from 'underscore'
import React from 'react'
import classes from 'classnames'
import MaskedField from 'react-maskedinput'
import Label from '../label'
import ErrorMessage from '../error-message'
import '../styles.less'
import './styles.less'

/**
 * Creates a new Slider.
 * @class Slider  
 * @extends Component
 * @param {object} props
 * @param {string} props.label The label
 * @param {string} props.placeholder The placholder
 */
export default class Slider extends React.Component {

    static defaultProps = {
        type: 'text',
        label: null,
        value: '',
        onChange: null,
        onFocus: null,
        onBlur: null,
        onKeyPress: null,
        error: false,
        placeholder: '',
        dirty: false,
        block: false,
        mask: null,
        multiline: false,
    }

    constructor(props){
        super(props)
        this.state = {
            value: props.value, 
            focus: false,
            dirty: (_.isUndefined(this.props.dirty))?false:this.props.dirty
        }
    }

    componentDidMount(){
    /*    var initialValue = this.props.value
        setTimeout(()=>{
            if(initialValue.toString() !== this.field.value){
                console.log(this.field.value)
            }
        },100)*/
    }

    handleChange(event){
        this.setState({dirty:true, value:event.target.value})
        if(this.props.onChange){
            this.props.onChange(event.target.value, this)
        }
        if(this.context.onChange){
            this.context.onChange(event.target.value, this)
        }
    }

    handleBlur(event){
        this.setState({dirty:true, focus:false,})
        if(this.props.onBlur){
            this.props.onBlur(event)
        }
    }

    handleFocus(event){
        this.setState({focus:true})
        if(this.props.onFocus){
            this.props.onFocus(event)
        }
    }

    /**
     * [handleKeyPress description]
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    handleKeyPress(event){
        this.setState({dirty:true})
        if(this.props.onAction && event.key === 'Enter'){
            this.props.onAction(event.target.value, event, this)
        }
        if(this.props.onKeyPress){
            return this.props.onKeyPress(event.target.value, event, this)
        }
        // if(this.context.onChange){
        //     return this.context.onChange(event.target.value, event, this)
        // }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.value !== nextProps.value) {
            this.setState ({value: nextProps.value})
        }
    }

    get value(){
        return this.field.value
    }

    /**
     * render
     * @return {ReactElement} markup
     */
    render() {

        var props = _.omit(this.props, ..._.keys(this.constructor.defaultProps))
        props.ref = (node)=>{this.field = node}
        props.className = classes('ui-text-field__field', this.props.inputClassName)
        props.value = this.state.value || ''
        props.defaultValue = this.props.defaultValue
        props.onFocus = this.handleFocus.bind(this)
        props.onBlur = this.handleBlur.bind(this)
        props.onChange = this.handleChange.bind(this)

        var input = <input  
            type={'range'}
            step={'1'}
            min={0}
            max={5}
            {...props}
        />

        var error = false
        var errorMessage = null
        if(this.props.error && (this.props.dirty || this.state.dirty)){
            error = true
            if(this.props.error){
                errorMessage = <ErrorMessage>{this.props.error}</ErrorMessage>
            }
        }

        var isDisabled = this.props.disabled

        var inlineStyle = {...this.props.style}
        if(this.props.visible == false){
            inlineStyle.display = 'none'
        }

        return (<div 
            id={this.props.id} 
            style={inlineStyle}
            className={classes(
                'ui-text-field', 
                (isDisabled)?'disabled':false, 
                (error)?'error':false, 
                (this.props.prefix)?'hasPrefix':false,
                (this.props.block)?'block':false,
                (this.props.required == true)?'required':false, 
                this.props.className)}>
            
            <Label block text={this.props.label} errorMessage={errorMessage} required={this.props.required}> 
                <div className={'ui-text-field__fieldContainer'}>
                    {(this.props.prefix)?<span className={'ui-text-field__prefix'}>{this.props.prefix}</span>:null}
                    {input} 
                    <div className={'ui-text-field__fieldFrame'}/></div>
            </Label>
         </div>)
    }
}