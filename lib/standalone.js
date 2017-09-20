'use strict';

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
window.moment = moment;

$(document).ready(function () {
    render();

    // window.test = new ui.Component(ui.Textfield, {placeholder:"Wrapped Test"});
});

var model = new ui.Model({
    "random": [],
    "checked": true,
    "checked2": true,
    cities: ["Boston", "Chelmsford", "Westford", "Lowell"],
    headings: ["North", "South", "East", "West"],
    "selectedCity": "Chelmsford",
    "selectedHeading": null,
    "email": "",
    "tags0": [{ label: 'A', value: 0 }, { label: 'B', value: 1 }, { label: 'C', value: 2 }],
    "tags1": [{ label: 'lime', value: 'lime' }, { label: 'lemon', value: 'lemon' }],
    "tags2": []
}, {
    validation: {
        "email": {
            required: true,
            pattern: "email"
        },
        "selectedCity": {
            required: true
        },
        "selectedHeading": {
            required: true
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

function render() {
    ReactDOM.render(React.createElement(
        'div',
        { className: 'row ui-collapse' },
        React.createElement(
            'div',
            { className: 'columns medium-4' },
            React.createElement(ModelDisplay, { model: model })
        ),
        React.createElement(
            'div',
            { className: 'columns medium-8' },
            React.createElement(
                Markdown,
                { container: 'div' },
                React.createElement(Table, { sort: false, columns: [{ name: 'A', 'attribute': 'a' }, { name: 'B', 'attribute': 'b' }], rows: ui.binding(model, 'random') }),
                '## Buttons',
                React.createElement(
                    'div',
                    null,
                    React.createElement(ui.Button, { className: 'smalle small red', label: 'red' }),
                    React.createElement(ui.Button, { className: 'smalle small pink', label: 'pink' }),
                    React.createElement(ui.Button, { className: 'smalle small purple', label: 'purple' }),
                    React.createElement(ui.Button, { className: 'smalle small deep-purple', label: 'deep-purple' }),
                    React.createElement(ui.Button, { className: 'smalle small indigo', label: 'indigo' }),
                    React.createElement(ui.Button, { className: 'smalle small blue', label: 'blue' }),
                    React.createElement(ui.Button, { className: 'smalle small light-blue', label: 'light-blue' }),
                    React.createElement(ui.Button, { className: 'smalle small cyan', label: 'cyan' }),
                    React.createElement(ui.Button, { className: 'smalle small teal', label: 'teal' }),
                    React.createElement(ui.Button, { className: 'smalle small green', label: 'green' }),
                    React.createElement(ui.Button, { className: 'smalle small light-green', label: 'light-green' }),
                    React.createElement(ui.Button, { className: 'smalle small lime', label: 'lime' }),
                    React.createElement(ui.Button, { className: 'smalle small yellow', label: 'yellow' }),
                    React.createElement(ui.Button, { className: 'smalle small amber', label: 'amber' }),
                    React.createElement(ui.Button, { className: 'smalle small orange', label: 'orange' }),
                    React.createElement(ui.Button, { className: 'smalle small deep-orange', label: 'deep-orange' }),
                    React.createElement(ui.Button, { className: 'smalle small brown', label: 'brown' }),
                    React.createElement(ui.Button, { className: 'smalle small grey', label: 'grey' }),
                    React.createElement(ui.Button, { className: 'smalle small blue-grey', label: 'blue-grey' })
                ),
                React.createElement(ui.Button, { className: 'small', label: 'small' }),
                React.createElement(ui.Button, { className: '', label: 'normal' }),
                React.createElement(ui.Button, { className: 'large', label: 'large' }),
                React.createElement(ui.Button, { className: 'xlarge', label: 'xlarge' }),
                React.createElement(
                    'div',
                    null,
                    React.createElement(ui.Button, { icon: 'fa fa-chevron-left' }),
                    React.createElement(ui.Button, { label: 'Button iconLeft', iconLeft: 'fa fa-chevron-left' }),
                    React.createElement(ui.Button, { label: 'Button iconRight', iconRight: 'fa fa-chevron-right' })
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(ui.Button, { className: 'outline', label: 'Outline' }),
                    React.createElement(ui.Button, { className: 'chromeless green', icon: 'fa fa-check' }),
                    React.createElement(ui.Button, { className: 'chromeless purple', label: 'Chromeless', iconLeft: 'fa fa-chevron-left' }),
                    React.createElement(ui.Button, { className: 'chromeless pink', label: 'Chromeless', iconRight: 'fa fa-chevron-right' }),
                    React.createElement(ui.Button, { className: 'success', label: 'Success' }),
                    React.createElement(ui.Button, { className: 'error', label: 'Error' })
                ),
                React.createElement(
                    ui.Button,
                    { className: 'display-block purple' },
                    React.createElement(ui.Icon, { name: 'fa fa-rocket' }),
                    ' Block'
                ),
                React.createElement(ui.Button, { href: 'http://www.uml.edu', label: 'href test' }),
                React.createElement(
                    'div',
                    { style: {
                            color: 'green'
                        } },
                    React.createElement(ui.Button, { className: 'chromeless inherit', label: 'Inherit' }),
                    React.createElement(ui.Button, { className: 'outline inherit', label: 'Inherit' })
                ),
                '## Textfields',
                React.createElement(ui.Textfield, { label: 'Label', placeholder: 'Placeholder', iconLeft: 'fa fa-rocket' }),
                '## Tags',
                React.createElement(ui.Tags, {
                    className: 'display-block',
                    placeholder: 'Add any tag...',
                    allowSpaces: false,
                    tags: model.get('tags0'),
                    handleAdd: _.bind(function (tag) {
                        model.set('tags0', model.get('tags0').concat(tag));
                    }, this),
                    handleRemove: _.bind(function (tag) {
                        model.set('tags0', _.without(model.get('tags0'), tag));
                    }, this),
                    list: [{ label: "Test", value: "5" }, { label: "Test 2", value: "6" }]
                }),
                React.createElement(ui.Tags, {
                    className: 'display-block',
                    label: 'With autocomplete, spaces allowed',
                    placeholder: 'Add fruits...',
                    list: require('./data/fruits'),
                    allowSpaces: true,
                    tags: model.get('tags1'),
                    handleAdd: _.bind(function (tag) {
                        model.set('tags1', model.get('tags1').concat(tag));
                    }, this),
                    handleRemove: _.bind(function (tag) {
                        model.set('tags1', _.without(model.get('tags1'), tag));
                    }, this)
                }),
                React.createElement(ui.Tags, {
                    className: 'display-block',
                    label: 'Autocomplete and list-restricted, spaces allowed',
                    placeholder: 'Add states...',
                    list: require('./data/states'),
                    restrictToList: true,
                    allowSpaces: true,
                    stopWordFilter: false,
                    tags: model.get('tags2'),
                    handleAdd: _.bind(function (tag) {
                        model.set('tags2', model.get('tags2').concat(tag));
                    }, this),
                    handleRemove: _.bind(function (tag) {
                        model.set('tags2', _.without(model.get('tags2'), tag));
                    }, this)
                }),
                '## Selects',
                React.createElement(ui.Select, { items: require('./data/cities-ma'), label: 'Label', placeholder: 'Choose a city...', value: binding(model, "selectedCity") }),
                '## Toggles',
                React.createElement(ui.Toggle, { className: 'left-side', type: 'switch', label: 'Switch', checked: binding(model, 'checked') }),
                React.createElement(ui.Toggle, { type: 'checkbox', label: 'Checkbox', checked: false }),
                React.createElement(ui.Toggle, { type: 'radio', label: 'Radio', checked: binding(model, 'checked') }),
                React.createElement(
                    'div',
                    null,
                    React.createElement(ui.Toggle, { type: 'radio', label: 'Checkbox A', checked: binding(model, 'checked2'), onValue: 'a' }),
                    React.createElement(ui.Toggle, { type: 'radio', label: 'Checkbox B', checked: binding(model, 'checked2'), onValue: 'b' }),
                    React.createElement(ui.Toggle, { type: 'radio', label: 'Checkbox C', checked: binding(model, 'checked2'), onValue: 'c' })
                ),
                React.createElement(ui.RadioGroup, { label: 'Radio Group', items: binding(model, "cities"), value: binding(model, "selectedCity") }),
                '## Validation Errors',
                React.createElement(ui.Textfield, {
                    className: '-display-block',
                    label: 'Textfield',
                    value: "email",
                    placeholder: 'Placeholder',
                    iconLeft: 'fa fa-envelope-o',
                    error: 'Please enter a valid email address.'
                }),
                React.createElement(ui.Select, {
                    className: '-display-block',
                    items: binding(model, "cities"),
                    placeholder: 'Choose a city...',
                    iconLeft: 'fa fa-envelope-o',
                    error: 'Please choose a city.',
                    label: 'City'
                }),
                React.createElement(ui.Button, { className: '', label: 'normal' }),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'columns large-6' },
                        React.createElement(
                            'h3',
                            null,
                            'Bound'
                        ),
                        React.createElement(ui.Textfield, {
                            className: 'display-block',
                            label: 'Textfield',
                            value: ui.binding(model, "email"),
                            iconLeft: 'fa fa-envelope-o',
                            error: ui.errorBinding(model, "email")
                        }),
                        React.createElement(ui.Select, {
                            className: 'display-block',
                            items: binding(model, "cities"),
                            placeholder: 'Choose a city...',
                            label: 'City',
                            value: binding(model, "selectedCity"),
                            error: ui.errorBinding(model, "selectedCity")
                        }),
                        React.createElement(ui.RadioGroup, {
                            label: 'Heading',
                            items: binding(model, "headings"),
                            value: binding(model, "selectedHeading"),
                            error: ui.errorBinding(model, "selectedHeading")
                        }),
                        React.createElement(ui.Button, { label: 'Validate', onClick: function onClick() {
                                model.validate({ force: true });
                            } })
                    ),
                    React.createElement(
                        'div',
                        { className: 'columns large-6' },
                        React.createElement(
                            'h3',
                            null,
                            'Static'
                        ),
                        React.createElement(ui.Textfield, {
                            className: 'display-block',
                            label: 'Textfield',
                            value: "email",
                            placeholder: 'Placeholder',
                            iconLeft: 'fa fa-envelope-o',
                            error: 'Please enter a valid email address.'
                        }),
                        React.createElement(ui.Select, {
                            className: 'display-block',
                            items: binding(model, "cities"),
                            placeholder: 'Choose a city...',
                            iconLeft: 'fa fa-envelope-o',
                            error: 'Please choose a city.'
                        }),
                        React.createElement(ui.RadioGroup, {
                            label: 'Radio Group',
                            items: binding(model, "cities"),
                            error: 'Please choose a city.'
                        })
                    )
                )
            )
        )
    ), document.getElementById('app'));
}
window.render = render;