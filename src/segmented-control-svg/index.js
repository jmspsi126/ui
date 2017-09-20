import _ from 'underscore';
import React from 'react';
import ReactDOM from 'react-dom';
import classes from 'classnames';

import Label from '../label';
import commonStyles from '../styles.less';
import styles from './segmented-control.less';

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
            dirty: (_.isUndefined(this.props.dirty))?false:this.props.dirty,
            itemWidth:100,
            itemHeight:100,
        }


    };

    componentDidMount(){
        this.boundHandleResize = _.bind(this.handleResize, this);
        window.addEventListener('resize', this.boundHandleResize );
        this.handleResize();
    };

    componentWillUnmount(){
        window.removeEventListener('resize', this.boundHandleResize );
    };

    handleResize(){
        var node = ReactDOM.findDOMNode(this);
        var rect = node.querySelector('li').getBoundingClientRect();
        this.setState({
            itemWidth:rect.width,
            itemHeight:rect.height,
        })
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
        console.log('blur')
        this.setState({dirty:true, focused:false});
        if(this.props.onBlur){
            this.props.onBlur(event);
        }
    };

    handleFocus(event){
        console.log('focus')
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

    /**
     * render
     * @return {ReactElement} markup
     */
    render() {
        
        var props = _.omit(this.props, 'className', 'style', 'required', 'password', 'label');
        props.ref = (node)=>{this.field = node;}
        props.className = classes(styles.field, this.props.selectClassName);
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
                errorMessage = <div className={commonStyles.errorMessage}>{this.props.error}</div>
            }
        }

        var isDisabled = this.props.disabled;

        var inlineStyle = {};
        if(this.props.visible == false){
            inlineStyle.display = 'none';
        }

        var currentOption = _.findWhere(this.props.options, {value:this.props.value});

        return <div 
           
            id={this.props.id} 
            style={inlineStyle}
            onMouseDown={()=>{
                console.log('mouse down')
                this.handleFocus();
            }}
            className={classes(
                styles.root, 
                (isDisabled)?styles.disabled:false, 
                (error)?styles.error:false, 
                (this.props.block)?styles.block:false,
                (this.props.required == true)?styles.required:false, 
                (this.state.focused == true)?styles.focused:false, 
                this.props.className)}>

            <ul className={styles.group}>
                {_.map(this.props.options, (optionObj, optionIndex)=>{
                    return <li key={optionObj.value} className={classes(styles.item, (this.props.value.toString() === optionObj.value.toString())?styles.active:false)}><label>
                        <input 
                            className={styles.radio}
                            checked={this.props.value.toString() === optionObj.value.toString()} 
                            value={optionObj.value} 
                            type={"radio"}
                            onChange={this.handleChange.bind(this)}
                            onBlur={this.handleBlur.bind(this)}
                            onFocus={this.handleFocus.bind(this)}
                            onMouseDown={this.handleFocus.bind(this)}

                            />
                        <span className={classes(styles.labelText)}>{optionObj.label}</span>


                        <svg viewBox={`0 0 ${this.state.itemWidth} ${this.state.itemHeight}`} 
                            preserveAspectRatio="none" style={{position:'absolute', left:0, top:0, width:'100%', height:'100%'}} dangerouslySetInnerHTML={{__html:(this.props.value.toString() === optionObj.value.toString())?`
                            <defs>
                                <mask id="mask_${optionObj.value}_${Math.round(this.state.itemWidth)}_${Math.round(this.state.itemHeight)}_${this.props.value.toString()}_${optionIndex}" x="0" y="0" width="${this.state.itemWidth}" height="${this.state.itemHeight}" >
                                    <rect x="0" y="0" width="${this.state.itemWidth}" height="${this.state.itemHeight}" fill="#fff" />
                                    <text class="${styles.svgText}" text-anchor="middle" x="${this.state.itemWidth/2}" y="${this.state.itemHeight/2}" dy="1" width="${this.state.itemWidth}" height="${this.state.itemHeight}" alignment-baseline="central" font-size="1em">${optionObj.label}</text>    
                                </mask>
                            </defs>
                            <rect x="0" y="0" width="${this.state.itemWidth}" height="${this.state.itemHeight}" class="${styles.svgBG}" mask="url(#mask_${optionObj.value}_${Math.round(this.state.itemWidth)}_${Math.round(this.state.itemHeight)}_${this.props.value.toString()}_${optionIndex})" fill="currentColor"/>    
                        `:`
                            <text class="${styles.svgText}" fill="currentColor" text-anchor="middle" x="${this.state.itemWidth/2}" y="${this.state.itemHeight/2}" dy="1" width="${this.state.itemWidth}" height="${this.state.itemHeight}" alignment-baseline="central" font-size="1em">${optionObj.label}</text>    
                        `
                        }}/>
                        
                    </label></li>
                })}
            </ul>


         </div>
    };
}