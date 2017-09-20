var _ = require('underscore');
var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');
var classNames = require('classnames');
var binding = require('./binding');
var color = require('color');

var Component = require('./component');
var Icon = require('./icon');

/**
 * Creates a new Tag component.
 * @class Tag  
 * @extends Component
 * @param {object} props
 * @param {string} props.label The label
 * @param {string} props.placeholder The placholder
 */

class Tag extends Component {

    static get defaultProps(){
        return {

        }
    };

    constructor(props){
        super(props);

    };

    handleRemove(event){
        event.preventDefault();
        if(this.props.onRemove){
            this.props.onRemove(this);
        }

    };

    /**
     * render
     * @return {ReactElement} markup
     */
    render() {
        return (<div className={classNames('ui3-tag', this.props.className)}>
            {this.props.label}
            <div className="ui3-tag-remove-icon"  onClick={_.bind(this.handleRemove, this)}/>
         </div>);
    };
}

module.exports = Tag;