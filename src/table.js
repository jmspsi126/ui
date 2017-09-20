var _ = require('underscore');
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactTransitionGroup = require('react/lib/ReactTransitionGroup');
var Backbone = require('backbone');
var Binding = require('./binding');
var TweenMax = require('gsap');
var classNames = require('classnames');

var Component = require('./component');
var Icon = require('./icon');

/**
 * Creates a Table component.
 * @class
 * @extends Component
 * @param {object} props
 * @param {Backbone.Model} props.collection A Backbone collection to bind to.
 * @param {ColumnHead[]} props.columns An array of ColumnHead objects describing what columns to display.
 * @param {SortMethod} props.sort The default sorting method.
 */
class Table extends Component {

    static get defaultProps(){
        return {
            baseClass:'ui-table',
            rowKey:null,
            sort:{
                order:'asc'
            }
        }
    };

    constructor(props){
        super(props);
        this.state.sort = null;

    };

    // componentWillReceiveProps(newProps){
    //     if(newProps.sort){
    //         this.state.sort = _.extend({
    //             order:'asc'
    //         },newProps.sort);
    //     }
    // };


    // componentDidMount() {
    //     this.boundUpdateListPosition = _.bind(this.updateListPosition,this);
    //     window.addEventListener('scroll', this.boundUpdateListPosition );
    //     window.addEventListener('resize', this.boundUpdateListPosition );
    // };

    sort(){  
        if(this.state.sort != null && this.props.sort !== false){
            var sorted = _(this.getProp('rows')).sortBy(function(item) {
                if(item instanceof Backbone.Model){
                    item = item.toJSON();
                }
                return item[this.state.sort.attribute];
            }, this);

            if(this.state.sort.order == "dec"){
                return sorted.reverse();
            }else{
                return sorted;
            }

        }else{
            return this.getProp('rows');
        }
    };

    /**
     * handle clicks on column heads
     * @param {SytheticEvent} e
     */
    handleColumnClick(attribute){

        return function(event){
            
            if(this.props.sort === false){
                return false;
            }
            var newSort = {
                attribute:attribute
            }

            if(this.state.sort && this.state.sort.attribute === newSort.attribute){
                if(this.state.sort.order == 'asc'){
                    newSort.order = "dec";
                }else{
                    newSort.order = "asc";
                }
            }else{
                newSort.order = "asc"
            }

            this.setState({
                sort:newSort
            });
        }

    }; 

    /**
     * render
     * @return {ReactElement} markup
     */
    render() {

        var columns = null; 
        if(this.props.columns){
            var columnCells = _.map(this.props.columns, function(col){
                var classes = "";
                var icon = "fa fa-chevron-up";
                if(this.state.sort && this.state.sort.attribute == col.attribute){
                    classes += " sort";
                    if(this.state.sort.order == 'dec'){
                        icon = "fa fa-chevron-down";
                    }
                }
                return <th className={classes} key={col.name} data-attr={col.attribute} onClick={_.bind(this.handleColumnClick(col.attribute), this)}>
                    { (this.props.sort)?(<div className="sort-icon"><Icon name={icon} /></div>):null }
                    {col.name}
                </th>
            },this);
            columns = <thead key="thead"><tr>
                {columnCells}
            </tr></thead>
        }


        var rows = null;
        rows = _.map(this.sort(), function(item, index){
            var key = null;
            if(item instanceof Backbone.Model){
                key = item.cid;
                item = item.toJSON();
            }else if(item.key || item.id || item.Id){
                key = item.key || item.id || item.Id;
            }else{
                key = index;
            }
            var cells = [];
            _.each(this.props.columns, function(col, index){
                cells.push(<td key={index} data-label={col.name}><div className="td-wrapper" style={{overflow:"hidden"}}><div>
                    {item[col.attribute]}
                </div></div></td>);
            },this);
            return <TR key={key}>
                {cells}
            </TR>

        },this);

        return (<table className={classNames("ui3-table", this.props.className)}>
            {columns}
            <ReactTransitionGroup component="tbody">
                {rows}
            </ReactTransitionGroup>
         </table>);
    };

}

class TR extends React.Component {

    componentWillEnter(done){
        var node = ReactDOM.findDOMNode(this);
        var nodes = $(node).find('.td-wrapper');
        TweenMax.allFrom(nodes, .5, {height:0, ease:"Expo.easeOut"}, 0, function(){
            $(node).find('.td-wrapper').css('height', 'auto');
            done();
        });  
    };

    componentWillLeave(done){
        var node = ReactDOM.findDOMNode(this);
        var nodes = $(node).find('.td-wrapper');
        TweenMax.allTo(nodes, .25, {height:0}, 0, function(){
            done();
        }); 
    };
    render(){
        return (<tr>
            {this.props.children}
        </tr>)
    };

}

module.exports = Table;
