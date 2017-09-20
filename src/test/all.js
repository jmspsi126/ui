import init from './index';
import _ from 'underscore'; 
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import SelectField from 'ui/select-field';
import TextField from 'ui/text-field';
import RadioGroup from 'ui/radio-group';
import Checkbox from 'ui/checkbox';
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
            select1:'1',
            select2:'',
            set1:[
                {value:"1", label:"Option 1"},
                {value:"2", label:"Option 2"},
                {value:"3", label:"Option 3"},
                {value:"4", label:"Option 4"},
            ],
        }

    }

    render(){

        var elements = <div>

            <h2>Label</h2>
            <Row>
                <Col medium={12}>
                    <Container>
                        <Label text={"Label"}/>
                    </Container>
                </Col>
            </Row>

            <h2>Checkbox</h2>
            <Row>
                <Col>
                    <Container>
                        <Checkbox label={"Checkbox Label"}/>
                    </Container>
                </Col>
            </Row>

            <h2>Select Field</h2>
            <Row>
                <Col medium={6}>
                    <Container>
                        <SelectField label={"Select Field"} block value={this.state.select1} options={[{value:'', label:"Choose..."}].concat(this.state.set1)} onChange={(value)=>{this.setState({select1:value})}}/>
                    </Container>
                </Col>
                <Col medium={6}>
                    <Container>
                        <SelectField label={"Select Field Error"} block value={this.state.select1} options={[{value:'', label:"Choose..."}].concat(this.state.set1)} onChange={(value)=>{this.setState({select1:value})}} error={"Error Message"} dirty/>
                    </Container>
                </Col>
            </Row>

            <h2>Text Field</h2>
            <Row>
                <Col medium={6}>
                    <Container>
                        <TextField label={"Text Field"} block value={this.state.select1} onChange={(value)=>{this.setState({select1:value})}}/>
                    </Container>
                </Col>
                <Col medium={6}>
                    <Container>
                        <TextField label={"Text Field With Prefix"} block value={this.state.select1} onChange={(value)=>{this.setState({select1:value})}} prefix={"$"}/>
                    </Container>
                </Col>
                <Col medium={6}>
                    <Container>
                        <TextField label={"Text Field Error"} block value={this.state.select1} onChange={(value)=>{this.setState({select1:value})}} error={"Error Message"} dirty/>
                    </Container>
                </Col>

            </Row>

            <h2>Radio Group</h2>
            <Row>
                <Col medium={6}>
                    <Container>
                        <RadioGroup label={"Radio Group"} block value={this.state.select1} options={this.state.set1} onChange={(value)=>{this.setState({select1:value})}}/>
                    </Container>
                </Col>
                <Col medium={6}>
                    <Container>
                        <RadioGroup label={"Radio Group Error"} block value={this.state.select1} options={this.state.set1} onChange={(value)=>{this.setState({select1:value})}} error={"Error Message"} dirty/>
                    </Container>
                </Col>
            </Row>

            <h2>Segmented Control</h2>
            <Row>
                <Col xlarge={6}>
                    <Container>
                        <SegmentedControl block value={this.state.select1} options={this.state.set1} onChange={(value)=>{this.setState({select1:value})}}/>
                    </Container>
                </Col>
                <Col xlarge={6}>
                    <Container>
                        <div style={{fontSize:'.75em'}}>
                        <SegmentedControl value={this.state.select1} options={this.state.set1} onChange={(value)=>{this.setState({select1:value})}} error={"Error Message"} dirty/>
                        </div>
                    </Container>
                </Col>
            </Row>

            <h2>Button</h2>
            <Row>
                <Col medium={12}>
                    <Button>Default</Button>
                    {' '}
                    <Button primary>Primary</Button>
                </Col>
                <Col medium={12}>
                    <Button outline>Outline</Button>
                    {' '}
                    <Button primary outline>Outline Primary</Button> <TextField value={this.state.select1} onChange={(value)=>{this.setState({select1:value})}}/>
                </Col>
            </Row>
        </div>

        return <div>
            <Row collapse>
                <Col medium={12} large={6}><div style={{padding:'2em'}}>
                    {elements}
                </div></Col>
                <Col medium={12} large={6}><div style={{
                    '--ui-color-primary':'#0095ff',
                    '--ui-padding':'.2em',
                    background:'#232323', color:"#c2c2c2", padding:'2em'}}>
                    {elements}
                </div></Col>
            </Row>
        </div>
    };
}

export default Test;

init(Test);
