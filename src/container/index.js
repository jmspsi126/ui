import _ from 'underscore';
import React from 'react';
import classes from 'classnames';

import './container.less';

/**
 * Creates a new Label.
 * @class Label  
 * @extends Component
 * @param {object} props
 */
 export default class Container extends React.Component {

    static get defaultProps(){return {

    }};

    constructor(props){
        super(props);
    };

    /**
     * render
     * @return {ReactElement} markup
     */
    render() {

        return <div className={classes(
                'ui__container', 
                (this.props.disabled)?'disabled':false, 
/*                (this.props.block)?'block':false,*/
                'block',
                this.props.className)}>
            {this.props.children}
         </div>
    };
}