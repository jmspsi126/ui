import _ from 'underscore';
import React from 'react';
import classNames from 'classnames';

import './button.less'; 

class Button extends React.Component {

    static get defaultProps(){return {
        type:"button",
        disabled:false,
        style:{},
        isLoading:false,
        className:""
    }};

    constructor(props){
        super(props);
        this.container = 'button';
    };

    render() {

        if(this.props.href){
            this.container = "a";
        }

        var isDisabled = this.props.disabled;

        var label = this.props.label;
        if(this.props.isLoading == true){
            isDisabled = true;
            label = <span style={{position:'relative'}}><span style={{visibility:'hidden'}}>{label}</span><div className="loading-icon"></div></span>;
        }

        var content = null;
        if(this.props.children){
            content = <span className={'label'}>{this.props.children}</span>;
        }else{
            content = <span className={'label'}>{label}</span>
        }

        var inlineStyle = {};
        if(this.props.visible == false){
            inlineStyle.display = 'none';
        }
        _.extend(inlineStyle, this.props.style);

        return (<this.container 
            {..._.pick(this.props, 'download', 'title', 'alt')}
            type={(this.props.href)?undefined:this.props.type}
            href={ (isDisabled)?undefined:this.props.href }
            onClick={ (isDisabled)?undefined:this.props.onClick }
            style={inlineStyle}
            className={classNames('ui__button', 
                (isDisabled)?'disabled':false,
                (this.props.collapseMargin)?'collapseMargin':false,
                (this.props.primary)?'primary':false,
                (this.props.block)?'block':false,
                (this.props.chromeless)?'chromeless':false,
                (this.props.outline)?'outline':false,
                this.props.className)
            }
            disabled={(isDisabled === true)?'disabled':false}
        >
            {content} 
        </this.container>);

    };
    
}

export default Button;
