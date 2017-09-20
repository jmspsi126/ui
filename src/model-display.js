var _ = require('underscore');
var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');

class ModelDisplay extends React.Component{

    constructor(){
        super();
    };

    componentDidMount(){
        if ( this.props.model ) {
            this.props.model.on( 'change', function() {
                this.forceUpdate();
            }, this );
        }

        if ( this.props.collection ) {
            this.props.collection.on( 'add remove reset sort', function() {
                this.forceUpdate();
            }, this );
        }
    };

    render(){
        var json = null;
        if(this.props.model){
            json = <pre>{JSON.stringify(this.props.model.toJSON(), null, 4)}</pre>;
        }

        var errors = null;
        if(this.props.model){
            errors = <div><h3>Errors</h3><pre>{JSON.stringify(this.props.model.errors, null, 4)}</pre></div>;
        }

        return (<div>
            {json}
            {errors}
        </div>)
    };

}
module.exports = ModelDisplay;