import _ from 'underscore'
import React from 'react'
import classes from 'classnames'

import './styles.less'

/**
 * Creates a new Error Message.
 */
export default function ErrorMessage(props = {}){
    return <div className={'ui__error-message'}>
        <div className={'ui__error-message__icon'}>
            <span>&#x21;</span>
        </div>
        <div className={'ui__error-message__text'}>
            {props.children}
        </div>
    </div>
}