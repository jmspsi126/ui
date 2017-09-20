import _ from'underscore';
import React from'react';
 
/**
 * Base class for ui components.
 * @class
 * @params {object} props
 */
class Component extends React.Component {

    static get defaultProps(){
        return {

        }
    };

    constructor(props){
        super(props);
        this.id = props.id || _.uniqueId();
        this.state = {};
    };

    bindingUpdate(model,options){
        if(model && options == "force-validate"){
            this.setState({dirty:true});
        }else{
            super.bindingUpdate(model,options);
        }
    };

    componentWillMount(){
        super.componentWillMount();
    };


	get classes(){
		return this.props.baseClass+' '+this.props.className;
	};
    
}

module.exports = Component;
