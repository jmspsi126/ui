import init from './index';
import _ from 'underscore'; 
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

class Test extends React.Component{
    
    static get defaultProps(){return {

    }};

    constructor(props){
        super(props);
    }

    render(){
        return <div>
            
        Test

        </div>
    };
}

export default Test;

init(Test);
