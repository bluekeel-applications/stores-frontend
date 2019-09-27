import React, { Component } from "react";
import Input from './Input';

import './NoZip.css';

class NoZip extends Component {
    render() {
        return (
           <div className='nozip-container'>
                <Input className='nozip-input' {...this.props}/>
                <h3 className='nozip-header'>Enter Zipcode to Start</h3>
           </div>
        );
    }
}

export default NoZip;
