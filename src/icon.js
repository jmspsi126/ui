var _ = require('underscore');
var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');

class Icon extends React.Component {
    static defaultProps = {
        className : ""
    };

    static namespace = "fa-fw fa";
    static prefix = "fa-";
    static get(name){
        return this.namespace+' '+this.prefix+name;
    };

    render() {
        return (<i className={Icon.get(this.props.name)+' '+this.props.className}></i>);
    };
}

module.exports = Icon;
