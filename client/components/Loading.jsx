import React, { Component } from 'react';
import styled from 'styled-components';
import '../styles/stylesLoading.css'
import App from '../components/App'
class Loading extends Component {


    render () {
        
        return (
            <div id='body' >
            <div className="drop pos" />
            <div className="wave pos" />
            <div className="pos loading"/><h4>Loading...</h4></div>
            );
        }
    }
    
    export default Loading;
    