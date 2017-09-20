import init from './index'
import _ from 'underscore' 
import React from 'react'
import classNames from 'classnames'
import moment from 'moment'

import VertialGuides from '../vertical-guides'
import Checkbox from 'ui/checkbox'
import Button from 'ui/button'
import TextField from 'ui/text-field'
import SelectField from 'ui/select-field'
import Container from 'ui/container'

import DatePicker from '../date-picker'
import Calendar from '../calendar'
import SegmentedControl from '../segmented-control'

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

            <SegmentedControl
                value={'1'}
                options={[
                    {label:"Option A", value:'0'},
                    {label:"Option B", value:'1'},
                    {label:"Option C That has way too much text", value:'2'},
                    {label:"Option D", value:'3'},
                ]}
            />

            <SegmentedControl
                value={'1'}
                connected
                options={[
                    {label:"Option A", value:'0'},
                    {label:"Option B", value:'1'},
                    {label:"Option C That has way too much text", value:'2'},
                    {label:"Option D", value:'3'},
                ]}
            />

            <br/>
            <br/>
            <TextField/>
            <div style={{display:'flex', alignItems:'baseline', flexWrap:'wrap'}}>
                <Col>
                    <DatePicker block label={"Date Picker"} format={'dddd, MMMM Do YYYY'} placeholder={moment().format('dddd, MMMM Do YYYY')} prefix={<i className="fa fa-calendar" aria-hidden="true"></i>}/>
                </Col>
                <Col>
                    <SegmentedControl
                        label={"Choose a Time"}
                        block
                        value={'1'}
                        options={[
                            {label:"Option A", value:'0'},
                            {label:"Option B", value:'1'},
                            {label:"Option C That has way too much text", value:'2'},
                            {label:"Option D", value:'3'},
                        ]}
                    />
                </Col>
                <Col>
                    <SegmentedControl
                        label={"Choose a Time"}
                        block
                        value={'1'}
                        vAlign={'center'}
                        hAlign={'center'}
                        options={[
                            {label:"Option A", value:'0'},
                            {label:"Option B", value:'1'},
                            {label:"Option C That has way too much text", value:'2'},
                            {label:"Option D", value:'3'},
                        ]}
                    />
                </Col>
                <Col>
                    <SegmentedControl
                        label={"Choose a Time"}
                        block
                        value={'1'}
                        hAlign={'left'}
                        vAlign={'top'}
                        options={[
                            {label:"Option A", value:'0'},
                            {label:"Option B", value:'1'},
                            {label:"Option C That has way too much text", value:'2'},
                            {label:"Option D", value:'3'},
                        ]}
                    />
                </Col>
                <Col>
                    <SegmentedControl
                        label={"Choose a Time"}
                        block
                        value={'1'}
                        hAlign={'left'}
                        vAlign={'top'}
                        options={[
                            {label:"Option A", value:'0'},
                            {label:"Option B", value:'1'},
                            {label:"Option C That has way too much text", value:'2'},
                            {label:"Option D", value:'3'},
                        ]}
                    />
                </Col>
            </div>

            <div style={{maxWidth:'200px'}}>
                <SegmentedControl
                    label={"Choose a Time"}
                    block
                    value={'1'}
                    hAlign={'left'}
                    vAlign={'top'}
                    layout={'column'}
                    options={[
                        {label:"Option A", value:'0'},
                        {label:"Option B", value:'1'},
                        {label:"Option C That has way too much text", value:'2'},
                        {label:"Option D", value:'3', disabled:true},
                    ]}
                />
            </div>

            <div style={{width:'300px'}}>
                <Calendar
                    enabledDates={[
                        "2017-03-08T19:14:27.618Z",
                        "2017-03-12T19:00:00.000Z",
                        "2017-03-13T19:00:00.000Z",
                    ]}
                />
            </div>
            <div style={{display:'flex', alignItems:'baseline', flexWrap:'wrap'}}>
                <Col>
                    <DatePicker 
                        block 
                        enabledDates={[
                            "2017-03-08T19:14:27.618Z",
                            "2017-03-12T19:00:00.000Z",
                            "2017-03-13T19:00:00.000Z",
                        ]}
                        label={"Date Picker"} 
                        placeholder={moment().format('MM/DD/YYYY')} 
                        prefix={<i className="fa fa-calendar" aria-hidden="true"></i>}/>
                </Col>
                <Col>
                    <DatePicker block label={"Date Picker"} format={'dddd, MMMM Do YYYY'} placeholder={moment().format('dddd, MMMM Do YYYY')} prefix={<i className="fa fa-calendar" aria-hidden="true"></i>}/>
                </Col>
            </div>
            <div style={{display:'flex', alignItems:'baseline', flexWrap:'wrap'}}>
                <Col>
                    <DatePicker block label={"Date Picker"} placeholder={moment().format('MM / DD / YYYY')} prefix={<i className="fa fa-calendar" aria-hidden="true"></i>}/>
                </Col>
                <Col>
                    <DatePicker block label={"Date Picker"} placeholder={moment().format('MM/DD/YYYY')} prefix={<i className="fa fa-calendar" aria-hidden="true"></i>}/>
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
