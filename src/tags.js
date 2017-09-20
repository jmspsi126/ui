var _ = require('underscore');
var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');
var classNames = require('classnames');
var binding = require('./binding');
var utils = require('react-backbone-binding/utils');
var color = require('color');
var lunr = require('lunr');

var Component = require('./component');
var Icon = require('./icon');
var Tag = require('./tag');

/**
 * Creates a new Tags component.
 * @class Tags  
 * @extends Component
 * @param {object} props
 * @param {string} props.label The label
 * @param {string} props.placeholder The placholder
 */

class Tags extends Component {

    static stringToTag(string){
        return {label:string, value:string};
    };

    static isTag(tag){
        return (typeof tag.label !== 'undefined' && typeof tag.value !== 'undefined');
    };

    static get defaultProps(){
        return {
            allowSpaces:false,
            list:[],
            tags:[],
            restrictToList:false,
            stopWordFilter:true
        }
    };

    constructor(props){
        super(props);
        this.backspaceRemoveTag = false;
        this.node = null;
        this.listElement = null;
        this.listItem = null;
        this.listItemTag = null;
        this.state = {
            tags:[],
            listIndex:0,
            lastListInteration:'key',
            focused:false,
            matchedList:null,
            showList:false, 
            dirty: (_.isUndefined(this.props.dirty))?false:this.props.dirty
        }
        this.initIndex(utils.resolveProps(this.props));
    };

    initIndex(props){
        if(typeof props.list != 'undefined' && props.list.length){
            
            this.index = lunr(function () {
                if(props.stopWordFilter == false || (props.restrictToList == true && _.isFunction(props.stopWordFilter) == false)){ 
                    this.pipeline.remove(_.findWhere(this.pipeline._stack, {label:"stopWordFilter"}));
                }else if(_.isFunction(props.stopWordFilter)){
                    this.pipeline.add(props.stopWordFilter);
                }
                this.field('label')
            });

            _.each(props.list, function(listTag){

                if(Tags.isTag(listTag) == false){
                    listTag = Tags.stringToTag(listTag);
                }

                this.index.add({
                    id:listTag.value,
                    label:listTag.label
                });

            },this);

        }else{
            this.index = null;
        }
    };

    componentWillReceiveProps(newProps){
        newProps = utils.resolveProps(newProps);
        this.initIndex(newProps);
    };


    componentDidMount() {
        this.boundUpdateListPosition = _.bind(this.updateListPosition,this);
        window.addEventListener('scroll', this.boundUpdateListPosition );
        window.addEventListener('resize', this.boundUpdateListPosition );
    };

    updateListPosition(){

        if(typeof this.node === 'undefined' || this.node === null){
            return false;
        }

        var posRect = this.node.getBoundingClientRect();
        var listRect = this.listElement.getBoundingClientRect();

        //show on bottom
        if(listRect.height + posRect.top + posRect.height < window.outerHeight){
            this.listElement.style.top = (posRect.top + posRect.height)+'px';
            this.listElement.style.width = (posRect.width)+'px';
        
        //show on top
        }else{
           // this.listElement.style.top = (posRect.top - listRect.height)+'px';
        }

        this.listElement.style.width = (posRect.width)+'px';
    };

    updateListScroll(){
        if(this.listItem != null){
            var scrollTop = this.listElement.scrollTop;
            if(this.listItem.offsetTop < scrollTop){
                this.listElement.scrollTop = this.listItem.offsetTop;
            }else if(this.listItem.offsetTop + this.listItem.offsetHeight > scrollTop + this.listElement.offsetHeight){
                this.listElement.scrollTop = (this.listItem.offsetTop + this.listItem.offsetHeight) - this.listElement.offsetHeight;
            }
        }
    };

    handleFocus(event){
        this.listItem = null;
        this.listItemTag = null;
        this.setState({
            focused:true,
            listIndex:0,
            lastListInteration:'key',
            matchedList:null,
            showList:true
        });
        if(this.index){
            this.searchIndex();
        }
    };

    handleBlur(event){
        this.handleTagAdd(event.target.value.trim());
        this.setState({
            dirty:true,
            focused:false,
            matchedList:null,
            listIndex:0,
            lastListInteration:'key',
        });

    };

    handleKeyUp(event){

        var keyCode = event.nativeEvent.which || event.nativeEvent.keyCode;
        if(keyCode == 32 && this.props.allowSpaces == false){ // space, add tag
            event.stopPropagation();
            event.preventDefault();
            this.input.value = "";
        }

        if(event.target.value == ""){
            this.backspaceRemoveTag = true;
        }else{
            this.backspaceRemoveTag = false;
        }

        if(this.state.dirty == false){
            this.setState({dirty:true});
        }

        if(this.index){
            this.searchIndex();
        }

    };

    handleKeyDown(event){

        var keyCode = event.nativeEvent.which || event.nativeEvent.keyCode;

        this.setState({
            showList: !(keyCode == 27)
        });

        if(keyCode == 13){ // enter
            if(this.state.lastListInteration == 'key' && this.listItemTag != null){
                this.handleTagAdd(this.listItemTag);
            }else{
                this.handleTagAdd(event.target.value.trim());
            }

        }else if(keyCode == 32 && this.props.allowSpaces == false){ // space
            
            console.log('space')
            if(this.state.lastListInteration == 'key' && this.listItemTag != null){
                this.handleTagAdd(this.listItemTag);
            }else{
                event.preventDefault();
                this.handleTagAdd(event.target.value.trim());
            }

        }else if(keyCode == 8 && event.target.value == "" && this.backspaceRemoveTag == true){// backspace, remove last tag
           
            var newTags = _.uniq(this.getTags());
            newTags.pop();
            this.backspaceRemoveTag = false;
            //this.setState({tags:newTags});
            var tags = this.getTags();
            this.handleTagRemove(tags[tags.length - 1]);
            this.setProp("tags", newTags);

        // down
        }else if(keyCode === 40 && typeof this.getProp('list') != 'undefined' && this.getProp('list') != null && this.getList().length){ 

            var list = this.getList();
            if(this.state.listIndex == null){
                this.state.listIndex = -1;
            }
            var nextIndex = this.state.listIndex + 1;
            if(nextIndex >= list.length){
                nextIndex = list.length - 1;
            }
            this.setState({
                listIndex:nextIndex,
                lastListInteration:'key'
            });
            event.preventDefault();

        // up
        }else if(keyCode === 38 && this.state.listIndex != null && typeof this.getProp('list') != 'undefined' && this.getProp('list') != null && this.getList().length){ 
           
            var nextIndex = this.state.listIndex - 1;
            if(nextIndex < 0){
                nextIndex = 0;
            }

            this.setState({
                listIndex:nextIndex,
                lastListInteration:'key'
            });
            event.preventDefault();

        }else{
            this.setState({
                listIndex:0,
                lastListInteration:'key'
            });
        }

        if(this.state.dirty == false){
            this.setState({dirty:true});
        }

        if(this.index){
            this.searchIndex();
        }

    };

    searchIndex(){

        var tags = this.getTags();
        var matchedList = [];
        _.each(this.index.search(this.input.value), function(item){
            if(typeof item !== 'undefined' && typeof _.findWhere(tags, {value:item.ref}) == 'undefined'){
                matchedList.push(item);
            }
        },this);
        //if(matchedList.length == 0 || this.input.value == ""){
        if(this.input.value == ""){
            matchedList = null;
        }




        this.setState({matchedList:matchedList})

        if(matchedList != null && matchedList.length && this.state.listIndex == null){
            this.setState({
                listIndex:0,
                lastListInteration:'key'
            });
        }else if(matchedList != null && matchedList.length == 0){
            this.listItemTag = null;
            this.setState({
                listIndex:null,
                lastListInteration:'key'
            });
        }else if(matchedList == null){
            this.setState({
                lastListInteration:'key'
            });
        }
    };

    handleTagAdd(tag){

        if(Tags.isTag(tag) == false){
            tag = Tags.stringToTag(tag);
        }
        if(tag.value.trim() == ""){
            return false;
        }

        if(this.props.restrictToList == true){
            if(typeof _.findWhere(this.props.list, tag) === 'undefined'){
                return false;
            }
            if(this.state.matchedList !== null && this.state.matchedList.length == 0){
                return false;
            }
        }


        var currentTagMatches = _.filter(this.getTags(), function(v) { 
            if(v.value.toString().toLowerCase() === tag.value.toLowerCase().trim()){
                return v;
            }
        });
        
        if(currentTagMatches.length){
            return false;
        }

        this.input.value = "";

        var newTags = _.uniq(this.getTags().concat(tag));
        this.setState({
            listIndex:0,
            lastListInteration:'key',
            showList:true,
            //tags:newTags
        });
        this.listItemTag = null;
        if(this.props.handleAdd){
            this.props.handleAdd(tag);
        }
        this.setProp("tags", newTags);

    };

    handleTagRemove(tag){
        this.setState({
            listIndex:0,
            lastListInteration:'key',
            showList:true,
           // tags:_.without(this.getTags(), tag.props.label)
        });
        if(this.props.handleRemove){
            this.props.handleRemove(tag);
        }
        this.setProp("tags", _.without(this.getTags(), tag));
    };

    handleInputClick(){
        this.setState({
            showList:true,
        });
    };

    /**
     * render
     * @return {ReactElement} markup
     */
    render() {

        var input = <input 
            ref={(el)=>{this.input = el;}}
            placeholder={this.props.placeholder}
            onKeyUp={this.handleKeyUp.bind(this)}
            onClick={this.handleInputClick.bind(this)}
            onKeyDown={this.handleKeyDown.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            onFocus={this.handleFocus.bind(this)}
            onBlur={this.handleBlur.bind(this)}
        />;

        var iconLeft = null;
        if(this.props.iconLeft){
            iconLeft = <Icon className="ui-icon left" name={this.props.iconLeft}/>
        }

        var iconRight = null;
        if(this.props.iconRight){
            iconRight = <Icon className="ui-icon right" name={this.props.iconRight}/>
        }

        var error = false;
        var errorMessage = null;
        if(this.getProp('error') && this.state.dirty){
            error = true;
            if(this.getProp('error')){
                errorMessage = <div className="ui3-error-message">{this.getProp('error')}</div>
            }
        }

        var label = null;
        if(typeof this.props.label != 'undefined'){
            label = <div className="label">{this.props.label}</div>
        }

        var tags = [];
        _.each(this.getTags(), function(tag,index){
            tags.push(<Tag key={index} label={tag.label} onRemove={()=>{this.handleTagRemove(tag);}}/>);
        },this);

        var list = [];
        var listItems = this.getList();
        
        _.each(listItems, function(listTag,index){
            if(Tags.isTag(listTag) == false){
                listTag = Tags.stringToTag(listTag);
            }

            if(listTag.selectable == false){
                list.push(<li className={classNames('unselectable')} key={listTag.value} onMouseDown={_.bind(function(event){

                },this)} dangerouslySetInnerHTML={{__html:listTag.label}}></li>);
            }else{
                list.push(<li className={classNames({'active':(this.state.listIndex === index)})} key={listTag.value} onMouseOver={(event)=>{
                    this.listItem = null;
                    this.listItemTag = null;
                    this.setState({
                        listIndex:index,
                        lastListInteration:'mouse'
                    });
                }} onMouseDown={(event)=>{
                    event.stopPropagation();
                    event.preventDefault();
                    this.handleTagAdd(listTag);
                }} ref={(el)=>{
                    if(this.state.listIndex === index){
                        this.listItem = el; 
                        this.listItemTag = listTag;
                    }
                }} dangerouslySetInnerHTML={{__html:listTag.label}}></li>);
            }

        },this);

        var showList = ((this.state.showList && this.state.focused) && (this.props.restrictToList || listItems.length));
        if(listItems.length == 0){
            showList = false;
        }
        var listContainer = <ul className="ui3-tags-list" style={{display:(showList)?'block':'none'}} ref={_.bind(function(el){this.listElement = el;},this)}>{list}</ul>

        return (<div id={this.props.id} className={classNames('ui3 tags', {'ui3-error':error}, {'ui3-focus':this.state.focused}, this.props.className)}>
            <label className="ui3-inside">
                {label}
                <div className="ui3-tags-inside" ref={(el)=>{this.node = el;}}>
                    {tags}
                    {input}
                </div>
                {listContainer}
            </label>
            {errorMessage}
         </div>);
    };

    getList(){
        var list = [];
        var tags = this.getTags();
        var inputValue = '';
        if(this.input){
            inputValue = this.input.value;
        }else{
            return [];
        }

        if(this.state.matchedList != null){
            _.each(this.state.matchedList, function(result){
                var tag = _.findWhere(this.props.list, {value:result.ref});
                if(typeof tag !== 'undefined' && typeof _.findWhere(tags, tag) === 'undefined'){
                    list.push(tag);
                }
            },this);

            var currentTagMatches = _.filter(tags, function(v) {
                if(v.value.toString().toLowerCase() === inputValue.toLowerCase().trim()){
                    return v;
                }
            });
            if(this.state.matchedList.length == 0 && typeof currentTagMatches.length >= 1){
                list.push({label:`No matches for <strong><em>${inputValue}</em></strong>`, value:null, selectable:false});
            }
        }else{
            list = [];   
            _.each(this.getProp("list"), function(tag){
                if(typeof _.findWhere(tags, tag) === 'undefined'){
                    list.push(tag);
                }
            },this);
        }
        return list;
    };

    getTags(){
        return _.map(this.getProp('tags'), function(tag){
            if(Tags.isTag(tag) == true){
                return tag;
            }else {
                return Tags.stringToTag(tag);
            }
        });
    };



    componentDidUpdate(){
        this.updateListPosition();
        if(this.state.lastListInteration == 'key'){
            this.updateListScroll();
        }
        
    };

    componentWillUnmount() {
        super.componentWillUnmount();
        window.removeEventListener('scroll', this.boundUpdateListPosition );
        window.removeEventListener('resize', this.boundUpdateListPosition );
    };



}

module.exports = Tags;