import _ from 'underscore'
import React from 'react'
import classes from 'classnames'
import moment from 'moment'

import Label from '../label'
import ErrorMessage from '../error-message'

import TextField from '../text-field'
import Calendar from '../calendar'
import '../styles.less'
import './styles.less'

/**
 * Creates a new DatePicker.
 * @class DatePicker  
 * @extends Component
 * @param {object} props
 * @param {string} props.label The label
 * @param {string} props.placeholder The placholder
 */
export default class DatePicker extends React.Component {

    static defaultProps = {
        label: false,
        placeholder: '',
        onChange: null,
        format: 'MM/DD/YYYY',
        mode: 'date',
        enabledDates: null,
    }

    constructor(props){
        super(props)
        this.state = {
            value: props.value, 
            focused: false,
            showPopup: false,
            popupStyle: this.getPopupStyle(false),
            dirty: (_.isUndefined(this.props.dirty))?false:this.props.dirty
        }
        this.handleBlur = this.handleBlur.bind(this)
        this.handleFocus = this.handleFocus.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleDocumentFocusIn = this.handleDocumentFocusIn.bind(this)
        this.handleDocumentFocusOut = this.handleDocumentFocusOut.bind(this)
        this.handleScroll = this.handleScroll.bind(this)
    }

    handleChange(value){
        if(this.props.mode == 'date'){
            this.setState({
                dirty:true, 
                value:value,
                showPopup: false,
            })
        }else{
            this.setState({
                dirty:true, 
                value:value,
            })
        }
        if(this.props.onChange){
            this.props.onChange(value, this)
        }
    }

    handleBlur(event){
        this.setState({dirty:true})
        if(this.props.onBlur){
            this.props.onBlur(event)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.value !== nextProps.value) {
            this.setState({value: nextProps.value})
        }
    }


    componentDidMount(){
        window.document.addEventListener('scroll', this.handleScroll)
        window.document.addEventListener('focusin', this.handleDocumentFocusIn)
        //window.document.addEventListener('focusout', this.handleDocumentFocusOut)
    }

    componentWillUnmount(){
        window.document.removeEventListener('scroll', this.handleScroll)
        window.document.removeEventListener('focusin', this.handleDocumentFocusIn)
        //window.document.removeEventListener('focusout', this.handleDocumentFocusOut)

    }

    /**
     * render
     * @return {ReactElement} markup
     */
    render() {
        var error = false
        var errorMessage = null
        if(this.props.error && (this.props.dirty || this.state.dirty)){
            error = true
            if(this.props.error){
                errorMessage = <ErrorMessage>{this.props.error}</ErrorMessage>
            }
        }

        var inlineStyle = {...this.props.style}
        if(this.props.visible == false){
            inlineStyle.display = 'none'
        }

        return <div 
            ref={node=>this.node = node}
            id={this.props.id} 
            style={this.props.style}
            className={classes(
                'ui-date-picker', 
                (this.props.disabled)?'disabled':false, 
                (error)?'error':false, 
                (this.props.prefix)?'hasPrefix':false,
                (this.props.block)?'block':false,
                (this.props.required == true)?'required':false, 
                this.props.className)}>
            <TextField 
                {..._.pick(this.props, 'label', 'placeholder', 'prefix')} 
                block 
                value={this.state.value?moment(this.state.value).format(this.props.format):''} 
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                readOnly="true"
                ignoreInput
            />
            {this.state.showPopup?<div style={{ zIndex:99998, position:'fixed', top:'0', left:'0', width:'100%', height:'100%', backgroundColor:'rgba(0,0,0,0)'}} onClick={this.handleDocumentFocusOut}></div>:null}
            <div ref={node=>this.popupNode = node} className={classes('ui-date-picker__popup', this.state.showPopup?'ui-date-picker__popup__visible':'')} style={this.state.popupStyle}>
                <div ref={node=>this.popupNodeInside = node} className={classes('ui-date-picker__popup-inside')} >
                    <Calendar 
                        enabledDates={this.props.enabledDates}
                        date={this.state.value}
                        onDaySelect={this.handleChange}
                    />
                </div>
            </div>
         </div>
    }

    handleDocumentFocusIn(event){
        if(!this.node.contains(event.target) && event.target !== this.node){
            this.setState(state=>({
                focused: false,
                showPopup: false,
            }))
        }
    }

    handleDocumentFocusOut(event){
        if(!this.node || (!this.node.contains(event.relatedTarget) && event.relatedTarget !== this.node)){
            this.setState(state=>({
                focused: false,
                showPopup: false,
            }))
        }
    }

    handleScroll(event){
        if(this.state.showPopup){
            this.setState(state=>({
                popupStyle: this.getPopupStyle(state.showPopup)
            }))
        }
    }

    handleFocus(event){
        this.setState({
            focused:true,
            showPopup:true,
            popupStyle: this.getPopupStyle(true)
        })
    }

    handleBlur(event){
        // this.setState(state=>({
        //     focused: state.calendarFocused?true:false
        // }))
    }

    getPopupStyle(visible){
        let style = {}
        if(!this.popupNode || !this.node) { return style }

        const inputBounds = this.node.getBoundingClientRect()
        const popupBounds = this.popupNodeInside.getBoundingClientRect()
        style.width = popupBounds.width+'px'

        if(visible){
            if(inputBounds.top+inputBounds.height+popupBounds.height <= window.innerHeight){
                if(inputBounds.top+inputBounds.height < 0){
                    style.top = '0px'
                }else{
                    style.top = (inputBounds.top+inputBounds.height)+'px'
                }
                style.bottom = 'auto'
            }else if( inputBounds.top - popupBounds.height >= 0){
                style.top = 'auto'
                if((window.innerHeight - inputBounds.top)+popupBounds.height > window.innerHeight){
                    style.bottom = '0px'
                }else{
                    style.bottom = (window.innerHeight - inputBounds.top)  +'px'
                }
            }else{
                style.top = '0px'
                style.bottom = 'auto'
            }


            if(inputBounds.left + popupBounds.width < window.innerWidth){
                style.left = inputBounds.left+'px'
                style.right = 'auto'
            }else{
                style.left = 'auto'
                style.right = '0'
            }

            // if(window.innerWidth < 500){
            //     style = {top:'0px', left:'0px', right:'0px', width:'100%'}
            // }
            //style.width = inputBounds.width+'px'
            //console.log(style.top)
            return style
        }

        return {...this.state.popupStyle}
    }
}