import init from './index';
import _ from 'underscore'; 
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import SelectField from 'ui/select-field';
import TextField from 'ui/text-field';
import RadioGroup from 'ui/radio-group';
import Button from 'ui/button';
import Container from 'ui/container';
import SegmentedControl from 'ui/segmented-control'; 
import Label from 'ui/label';

const Row = props => (<div style={{paddingRight:'1em', paddingBottom:'1em', minWidth:'200px', flexGrow:'1', ...props.style}}>{props.children}</div>)
const Col = props => (<div style={{paddingRight:'1em', paddingBottom:'1em', minWidth:'200px', flexGrow:'1', ...props.style}}>{props.children}</div>)



class Test extends React.Component{
    
    static get defaultProps(){return {

    }};

    constructor(props){
        super(props);
        this.state = {
            select1:'',
            select2:'',
        }
    }

    render(){
        return <div>

            <Row>
                <Col medium={6}>
                    <SelectField block value={this.state.select1} options={[
                        {value:'', label:"Choose..."},
                        {value:"1", label:"Option 1"},
                        {value:"2", label:"Option 2"},
                        {value:"3", label:"Option 3"},
                        {value:"4", label:"Option 4"},
                    ]} onChange={(value)=>{this.setState({select1:value})}}/>
                </Col>
                <Col medium={6}>
                    <TextField block value={this.state.select1} onChange={(value)=>{this.setState({select1:value})}}/>
                </Col>
            </Row>
            <div style={{
                background:'#434343',
                color:"#c2c2c2",
                padding:'30px'
            }}>
                <Row>
                    <Col medium={6}>
                        <SelectField block value={this.state.select1} options={[
                            {value:'', label:"Choose..."},
                            {value:"1", label:"Option 1"},
                            {value:"2", label:"Option 2"},
                            {value:"3", label:"Option 3"},
                            {value:"4", label:"Option 4"},
                        ]} onChange={(value)=>{this.setState({select1:value})}}/>
                    </Col>
                    <Col medium={6}>
                        <TextField block value={this.state.select1} onChange={(value)=>{this.setState({select1:value})}}/>
                    </Col>
                </Row>
            </div>
            

            

        </div>
    };
}

export default Test;

init(Test);
