import _ from 'underscore';
import React from 'react';
import classNames from 'classnames';

import './styles.less'
/**
 * Creates a new Toggle component.
 * @class Toggle  
 * @extends Component
 * @param {object} props
 * @param {string} props.label The label
 * @param {string} props.placeholder The placholder
 */
class Toggle extends React.Component {
    
    static get defaultProps(){
        return {
            type:"switch",
            onValue:true,
            offValue:false,
            label:"&nbsp;"
        }
    };

    constructor(props){
        super(props);
    };

    handleChange(event){
        
/*        if(this.props.type != "radio"){

        }
        var checked = !this.props.checked;

        var checkedValue;
        if(checked == true){
            checkedValue = this.props.onValue;
        }else{
            checkedValue = this.props.offValue;
        }*/


/*        if(this.props.type != "radio" || (this.props.type == "radio" && checked == true)){
            this.setProp('checked', checkedValue);
            this.setState({checked:checked})
        }*/

        if(this.props.onChange){
            this.props.onChange({
                value:this.props.value,
                checked:event.target.checked,
                context:this
            });
        }

    };

    /**
     * render
     * @return {ReactElement} markup
     */
    render() {

        var type = "checkbox";
        if(this.props.type == "radio"){
            type = "radio";
        }

        // element
        var toggle = <input 
            name={this.props.name}
            value={this.props.value}
            type={type}
            placeholder={this.props.placeholder} 
            checked={this.props.checked} 
            onChange={this.handleChange.bind(this)}/>;


        var label = <label>
                {toggle}
                <span dangerouslySetInnerHTML={{__html: this.props.label || ' '}} />
                {(this.props.type == "checkbox")?<span className="ui-toggle-icon"></span>:null}
            </label>;

        var iconLeft = null;
        if(this.props.iconLeft){
            iconLeft = <Icon className="ui-icon left" name={this.props.iconLeft}/>
        }

        var iconRight = null;
        if(this.props.iconRight){
            iconRight = <Icon className="ui-icon right" name={this.props.iconRight}/>
        }

        return (<div id={this.id} className={classNames('ui3 toggle ui-toggle-style-'+this.props.type, this.props.className)}>
            {iconLeft}
            {iconRight}
            
            {label}
         </div>);
    };
}

export default Toggle;
