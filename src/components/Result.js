import React, { Component } from 'react'

class Result extends Component {
    render(){
        return(
            <div style={{width: '300px', height: '70px',padding: '0 15px 0 15px' }}>
            <p>{this.props.data}</p>
            </div>
        );
    };
}

export default Result;