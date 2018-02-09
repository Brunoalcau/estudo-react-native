import React, { Component } from 'react';

function withSubscription (WrappedComponent) {
    return class extends Component {
        constructor(props) {
            debugger;
            super(props);
            // this.handleChange = this.handleChange.bind(this)
        }
        render() {
            return(
                <WrappedComponent 
                    {...this.props}    
                />
            )
        }
    }
}