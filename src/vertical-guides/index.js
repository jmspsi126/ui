import _ from 'underscore' 
import React from 'react'
import classNames from 'classnames'

function Guide(props){
    return <div style={{position:'relative',paddingTop:'0.5em',paddingBottom:'0.5em'}}>
        <div style={{display:'inline-block'}}>{' '}</div>
        <div style={{display:'inline-block', verticalAlign:'baseline'}}>
            {' '}
            <div style={{position:'absolute', width:'100%', borderBottom:'1px solid red'}}></div>
        </div>
    </div>
}

export default function VerticalGuides(props){
    return <div style={{position:'relative'}}>
        <div style={{position:'absolute', top:0, left:0, width:'100%', height:'100%', overflow:'hidden', pointerEvents:'none', zIndex:9999}}>
            {_.map(_.range(200), index=>(<Guide key={index}/>))}
        </div>
        <div style={{position:'relative'}}>
            {props.children}
        </div>
    </div>
}