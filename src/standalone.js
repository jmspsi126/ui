var $ = require('jquery');
var Backbone = require('backbone');
require('backbone-super');
var _ = require('underscore');
var moment = require('moment');
var React = require('react');
var ReactDOM = require('react-dom');
var Markdown = require('react-remarkable');
var moment = require('moment');
var binding = require('./binding');
var Table = require('./table');
var ui = require('./ui');
window.ui = ui;

//color overrides

var ModelDisplay = require('./model-display');

window.$ = $;
window._ = require('underscore');
window.Backbone = Backbone;
window.moment = moment;
window.React = React; 
window.ReactDOM = ReactDOM;
window.moment =  moment;

$(document).ready(function(){
    render();

    // window.test = new ui.Component(ui.Textfield, {placeholder:"Wrapped Test"});

});

var model = new ui.Model({
    "random":[],
    "checked":true,
    "checked2":true,
    cities:[
        "Boston",
        "Chelmsford",
        "Westford",
        "Lowell",
    ],
    headings:[
        "North",
        "South",
        "East",
        "West",
    ],
    "selectedCity":"Chelmsford",
    "selectedHeading":null,
    "email":"",
    "tags0":[
        {label:'A', value:0},
        {label:'B', value:1},
        {label:'C', value:2},
    ],
    "tags1":[
        {label:'lime', value:'lime'},
        {label:'lemon', value:'lemon'},
    ],
    "tags2":[]
},{
    validation:{
        "email":{
            required:true,
            pattern:"email"
        },
        "selectedCity":{
            required:true,
        },
        "selectedHeading":{
            required:true,
        }
    }
});
window.model = model;
model.on('change', render);

// var randomRows = model.get('random');
// for(var i = 0; i <5; i++){
//     randomRows.push({id:Date.now()+i, a:Math.ceil(Math.random()*20), b:Math.ceil(Math.random()*20)+20});
// }
// model.set('random', randomRows);
// setInterval(function(){

//     var arr = _.without(model.get('random'), Math.floor(model.get('random').length*Math.random()));
//         arr = _.without(arr, Math.floor(arr.length*Math.random()));

//     var obj1 = {id:Date.now()+'_1', a:Math.ceil(Math.random()*20), b:Math.ceil(Math.random()*20)+20};
//     var obj2 = {id:Date.now()+'_2', a:Math.ceil(Math.random()*20), b:Math.ceil(Math.random()*20)+20};


//     model.set('random', arr.concat([obj1, obj2]) );
// },1000);

function render(){
    ReactDOM.render(
        <div className="row ui-collapse">
            <div className="columns medium-4">
                <ModelDisplay model={model}/>
            </div>
            <div className="columns medium-8"> 
                <Markdown container="div">

                    <Table sort={false} columns={[
                        {name:'A', 'attribute':'a'},
                        {name:'B', 'attribute':'b'},
                    ]} rows={ui.binding(model, 'random')}/>

                    ## Buttons
                    <div>
                        <ui.Button className="smalle small red" label="red"/>
                        <ui.Button className="smalle small pink" label="pink"/>
                        <ui.Button className="smalle small purple" label="purple"/>
                        <ui.Button className="smalle small deep-purple" label="deep-purple"/>
                        <ui.Button className="smalle small indigo" label="indigo"/>
                        <ui.Button className="smalle small blue" label="blue"/>
                        <ui.Button className="smalle small light-blue" label="light-blue"/>
                        <ui.Button className="smalle small cyan" label="cyan"/>
                        <ui.Button className="smalle small teal" label="teal"/>
                        <ui.Button className="smalle small green" label="green"/>
                        <ui.Button className="smalle small light-green" label="light-green"/>
                        <ui.Button className="smalle small lime" label="lime"/>
                        <ui.Button className="smalle small yellow" label="yellow"/>
                        <ui.Button className="smalle small amber" label="amber"/>
                        <ui.Button className="smalle small orange" label="orange"/>
                        <ui.Button className="smalle small deep-orange" label="deep-orange"/>
                        <ui.Button className="smalle small brown" label="brown"/>
                        <ui.Button className="smalle small grey" label="grey"/>
                        <ui.Button className="smalle small blue-grey" label="blue-grey"/>
                    </div>
                    <ui.Button className="small" label="small"/>
                    <ui.Button className="" label="normal"/>
                    <ui.Button className="large" label="large"/>
                    <ui.Button className="xlarge" label="xlarge"/>
                    <div>
                        <ui.Button icon="fa fa-chevron-left"/>
                        <ui.Button label="Button iconLeft" iconLeft="fa fa-chevron-left"/>
                        <ui.Button label="Button iconRight" iconRight="fa fa-chevron-right"/>
                    </div>
                    <div>
                        <ui.Button className="outline" label="Outline"/>
                        <ui.Button className="chromeless green" icon="fa fa-check"/>
                        <ui.Button className="chromeless purple" label="Chromeless" iconLeft="fa fa-chevron-left"/>
                        <ui.Button className="chromeless pink" label="Chromeless" iconRight="fa fa-chevron-right"/>
                        <ui.Button className="success" label="Success"/>
                        <ui.Button className="error" label="Error"/>
                    </div>

                    <ui.Button className="display-block purple">
                        <ui.Icon name="fa fa-rocket"/> Block
                    </ui.Button>

                    <ui.Button href="http://www.uml.edu" label="href test"/>

                    <div style={{
                        color:'green'
                    }}>
                        <ui.Button className="chromeless inherit" label="Inherit"/>
                        <ui.Button className="outline inherit" label="Inherit"/>
                    </div>

                    ## Textfields
                    <ui.Textfield label="Label" placeholder="Placeholder" iconLeft="fa fa-rocket"/>

                    ## Tags

                    <ui.Tags 
                        className="display-block" 
                        placeholder="Add any tag..." 
                        allowSpaces={false}
                        tags={model.get('tags0')}
                        handleAdd={_.bind(function(tag){
                            model.set('tags0', model.get('tags0').concat(tag));
                        },this)} 
                        handleRemove={_.bind(function(tag){
                            model.set('tags0', _.without(model.get('tags0'), tag))
                        },this)}
                        list={[
                            {label:"Test", value:"5"},
                            {label:"Test 2", value:"6"},
                        ]}
                    /> 

                    <ui.Tags 
                        className="display-block" 
                        label="With autocomplete, spaces allowed" 
                        placeholder="Add fruits..." 
                        list={require('./data/fruits')}
                        allowSpaces={true}
                        tags={model.get('tags1')}
                        handleAdd={_.bind(function(tag){
                            model.set('tags1', model.get('tags1').concat(tag));
                        },this)} 
                        handleRemove={_.bind(function(tag){
                            model.set('tags1', _.without(model.get('tags1'), tag))
                        },this)}
                    /> 

                    <ui.Tags 
                        className="display-block" 
                        label="Autocomplete and list-restricted, spaces allowed" 
                        placeholder="Add states..." 
                        list={require('./data/states')} 
                        restrictToList={true}
                        allowSpaces={true}
                        stopWordFilter={false}
                        tags={model.get('tags2')}
                        handleAdd={_.bind(function(tag){
                            model.set('tags2', model.get('tags2').concat(tag));
                        },this)} 
                        handleRemove={_.bind(function(tag){
                            model.set('tags2', _.without(model.get('tags2'), tag))
                        },this)}
                    />

                    ## Selects
                    <ui.Select items={require('./data/cities-ma')} label="Label" placeholder="Choose a city..." value={binding(model, "selectedCity")} />

                    ## Toggles 
                    <ui.Toggle className="left-side" type="switch" label="Switch" checked={binding(model, 'checked')}/>
                    <ui.Toggle type="checkbox" label="Checkbox" checked={false}/>
                    <ui.Toggle type="radio" label="Radio" checked={binding(model, 'checked')}/>



                    <div>
                    <ui.Toggle type="radio" label="Checkbox A" checked={binding(model, 'checked2')} onValue="a"/>
                    <ui.Toggle type="radio" label="Checkbox B" checked={binding(model, 'checked2')} onValue="b"/>
                    <ui.Toggle type="radio" label="Checkbox C" checked={binding(model, 'checked2')} onValue="c"/>
                    </div>

                    
                    <ui.RadioGroup label="Radio Group" items={binding(model,"cities")} value={binding(model,"selectedCity")}/>

                    ## Validation Errors
                    <ui.Textfield 
                        className="-display-block"
                        label="Textfield" 
                        value={"email"} 
                        placeholder="Placeholder" 
                        iconLeft="fa fa-envelope-o"
                        error="Please enter a valid email address."
                    />
                    <ui.Select 
                        className="-display-block"
                        items={binding(model, "cities")}
                        placeholder="Choose a city..." 
                        iconLeft="fa fa-envelope-o"
                        error="Please choose a city."
                        label="City"
                    />
                    <ui.Button className="" label="normal"/>
                    
                    <div className="row">
                        <div className="columns large-6">
                            <h3>Bound</h3>
                            <ui.Textfield 
                                className="display-block"
                                label="Textfield" 
                                value={ui.binding(model, "email")} 
                                iconLeft="fa fa-envelope-o"
                                error={ui.errorBinding(model, "email")} 
                            />
                            <ui.Select 
                                className="display-block"
                                items={binding(model,"cities")}
                                placeholder="Choose a city..." 
                                label="City"
                                value={binding(model, "selectedCity")}
                                error={ui.errorBinding(model, "selectedCity")} 
                            />
                            <ui.RadioGroup 
                                label="Heading"
                                items={binding(model, "headings")}
                                value={binding(model, "selectedHeading")} 
                                error={ui.errorBinding(model, "selectedHeading")} 
                            />
                            <ui.Button label="Validate" onClick={function(){
                                model.validate({force:true});
                            }}/>
                        </div>
                        <div className="columns large-6">
                            <h3>Static</h3>
                            <ui.Textfield 
                                className="display-block"
                                label="Textfield" 
                                value={"email"} 
                                placeholder="Placeholder" 
                                iconLeft="fa fa-envelope-o"
                                error="Please enter a valid email address."
                            />
                            <ui.Select 
                                className="display-block"
                                items={binding(model, "cities")}
                                placeholder="Choose a city..." 
                                iconLeft="fa fa-envelope-o"
                                error="Please choose a city."
                            />
                            <ui.RadioGroup 
                                label="Radio Group"
                                items={binding(model, "cities")}
                                error="Please choose a city."
                            />
                        </div>
                    </div>
                    
                </Markdown>
            </div>
        </div>
        ,
        document.getElementById('app')
    );
}
window.render = render;
