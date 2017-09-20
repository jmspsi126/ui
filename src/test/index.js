import _ from 'underscore'; 
import React from 'react';
import ReactDOM from 'react-dom';

export default function init(Class){
    // create a new div element 
    // and give it some content 
    var rootDiv = document.createElement("div"); 
    rootDiv.setAttribute('id', 'root');
    document.body.appendChild(rootDiv); //add the text node to the newly created div. 

    ReactDOM.render(<Class/>, document.getElementById('root'));
}
