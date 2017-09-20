import init from './index'
import _ from 'underscore' 
import React from 'react'
import classNames from 'classnames'

import VertialGuides from '../vertical-guides'
import Checkbox from 'ui/checkbox'
import Button from 'ui/button'
import TextField from 'ui/text-field'
import SelectField from 'ui/select-field'
import Container from 'ui/container'
import Slider from 'ui/slider'
//import {Row,Cell} from 'uml-react-grid' 

const Row = props => (<div style={{paddingRight:'1em', paddingBottom:'1em', minWidth:'200px', flexGrow:'1', ...props.style}}>{props.children}</div>)
const Col = props => (<div style={{paddingRight:'1em', paddingBottom:'1em', minWidth:'200px', flexGrow:'1', ...props.style}}>{props.children}</div>)

class Test extends React.Component{
    
    static get defaultProps(){return {

    }}

    constructor(props){
        super(props)
        this.state = {
            check1: false,
            check2: true,
            check3: false,
            check4: true,
        }

    }

    renderElements(){
        return <div>
            <Slider label={"Slider"}/>
            <Checkbox checked={this.state.check1} onChange={checked=>this.setState({check1:checked})} label={"Checkbox"}/>
            <Button>Button</Button>
            <TextField mask={'999-999'} maskChar={null} placeholder={'Text Field'}/>
            <TextField placeholder={'Text Field'} dirty label={'Label'}/>
            <SelectField options={[{label:'Select Field', value:'Select Field'}]}/>
            <br/>
            <br/>
            <div style={{display:'flex', alignItems:'baseline', flexWrap:'wrap'}}>
                <Col>
                    <Checkbox block checked={this.state.check1} onChange={checked=>this.setState({check1:checked})} label={"Checkbox"}/>
                </Col>
                <Col>
                    <Button block primary>Button</Button>
                </Col>
                <Col>
                    <Button block>Button</Button>
                </Col>
                <Col style={{flex:'1'}}>
                    <TextField label={"Label"} block placeholder={'Text Field'} prefix='$'/>
                </Col>
                <Col style={{flex:'1'}}>
                    <TextField dirty error={'Error Message'} label={"Label"} block placeholder={'Text Field'} prefix='$'/>
                </Col>
                <Col style={{flex:'1'}}>
                    <TextField dirty error={'Error Message'} block placeholder={'Text Field'} prefix='$'/>
                </Col>
                <Col>
                    <SelectField block label={"Label"} options={[{label:'Select Field', value:'Select Field'}]}/>
                </Col>
                <Col>
                    <SelectField block label={"Label"} dirty required error={'Error Message'} options={[{label:'Select Field', value:'Select Field'}]}/>
                </Col>
            </div>

            <br/>
            <br/>

            <div style={{display:'flex', alignItems:'baseline', flexWrap:'wrap'}}>
                <Col>
                    <Checkbox block checked={this.state.check1} onChange={checked=>this.setState({check1:checked})} label={"Checkbox"}/>
                </Col>
                <Col>
                    <Button block primary>Button</Button>
                </Col>
                <Col>
                    <Button block>Button</Button>
                </Col>
                <Col style={{flex:'1'}}>
                    <TextField label={"Label"} block placeholder={'Text Field'} prefix='$'/>
                </Col>
                <Col style={{flex:'1'}}>
                    <TextField dirty error={'Error Message'} label={"Label"} block placeholder={'Text Field'} prefix='$'/>
                </Col>
                <Col style={{flex:'1'}}>
                    <TextField dirty error={'Error Message'} block placeholder={'Text Field'} prefix='$'/>
                </Col>
                <Col style={{flex:'1'}}>
                    <p>Lorem ipsum Officia pariatur tempor laboris amet sit irure proident deserunt sit reprehenderit in amet ut veniam Excepteur commodo ex ullamco ex tempor ut reprehenderit in commodo nostrud elit eiusmod laborum incididunt consectetur nostrud eiusmod velit.</p>
                </Col>
            </div>
        </div>
    }

    render(){
        return <div style={{padding:'2em'}}>
            
                {this.renderElements()}

        </div>
    }
}

init(Test)
