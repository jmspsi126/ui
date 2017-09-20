import init from './index'
import _ from 'underscore' 
import React from 'react'
import classNames from 'classnames'

import Checkbox from 'ui/checkbox'
import Button from 'ui/button'
import Container from 'ui/container'


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

            <h3>Inline</h3>
            <Checkbox checked={this.state.check1} onChange={checked=>this.setState({check1:checked})} label={"Checkbox Label"}/>
            <Checkbox checked={this.state.check2} onChange={checked=>this.setState({check2:checked})}>
                Checkbox Label<br/>
                that is a bit long
            </Checkbox>

            <br/>

            <h3>Block</h3>
            <div>
                <Checkbox block checked={this.state.check3} onChange={checked=>this.setState({check3:checked})} label={"Checkbox Label"}/>
                <Checkbox block checked={this.state.check4} onChange={checked=>this.setState({check4:checked})}>
                    Checkbox Label that is a bit long
                </Checkbox>
            </div>

        </div>
    }

    render(){
        return <div style={{padding:'2em'}}>
            <h3>Checkbox</h3>
            {this.renderElements()}
        </div>
    }
}

init(Test)
